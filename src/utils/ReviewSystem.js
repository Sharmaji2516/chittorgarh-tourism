import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const REVIEWS_COLLECTION = 'reviews';
const REVIEWER_ID_KEY = 'ctt_reviewer_id';

/**
 * Generate or retrieve a persistent ID for the user's browser
 */
export const getReviewerId = () => {
    let id = localStorage.getItem(REVIEWER_ID_KEY);
    if (!id) {
        id = 'rev_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
        localStorage.setItem(REVIEWER_ID_KEY, id);
    }
    return id;
};

/**
 * Get all reviews for a specific item (e.g. "hotel-1")
 */
export const getReviews = async (id) => {
    try {
        const q = query(
            collection(db, REVIEWS_COLLECTION),
            where("entityId", "==", id)
        );
        const querySnapshot = await getDocs(q);
        const comments = [];
        const ratings = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            comments.push({ id: doc.id, ...data });
            ratings.push(data.rating);
        });

        return { ratings, comments };
    } catch (e) {
        console.error('Error fetching reviews:', e);
        return { ratings: [], comments: [] };
    }
};

/**
 * Add a new review with ownership
 */
export const addReview = async (id, rating, comment, userName = 'Guest') => {
    try {
        const newReview = {
            entityId: id,
            reviewerId: getReviewerId(),
            rating: Number(rating),
            comment,
            userName,
            date: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), newReview);
        return { id: docRef.id, ...newReview };
    } catch (e) {
        console.error('Error adding review:', e);
        throw e;
    }
};

/**
 * Update an existing review
 */
export const updateReview = async (reviewId, rating, comment) => {
    try {
        const reviewRef = doc(db, REVIEWS_COLLECTION, reviewId);
        await updateDoc(reviewRef, {
            rating: Number(rating),
            comment,
            lastEdited: new Date().toISOString()
        });
    } catch (e) {
        console.error('Error updating review:', e);
        throw e;
    }
};

/**
 * Delete a review
 */
export const deleteReview = async (reviewId) => {
    try {
        const reviewRef = doc(db, REVIEWS_COLLECTION, reviewId);
        await deleteDoc(reviewRef);
    } catch (e) {
        console.error('Error deleting review:', e);
        throw e;
    }
};

/**
 * Calculate RAW average rating (starts at 0)
 */
export const getAverageRating = async (id) => {
    const { ratings } = await getReviews(id);
    if (ratings.length === 0) return 0;

    const sum = ratings.reduce((a, b) => a + Number(b), 0);
    return (sum / ratings.length).toFixed(1);
};

/**
 * Get total review count
 */
export const getReviewCount = async (id) => {
    const { ratings } = await getReviews(id);
    return ratings.length;
};
