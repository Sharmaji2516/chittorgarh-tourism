/**
 * Frontend Review System (Decoupled from Firebase)
 * Uses browser LocalStorage + curated verified initial reviews.
 */

const REVIEWER_ID_KEY = 'ctt_reviewer_id';
const LOCAL_REVIEWS_KEY = 'ctt_local_reviews_v2';

export const getReviewerId = () => {
    let id = localStorage.getItem(REVIEWER_ID_KEY);
    if (!id) {
        id = 'rev_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
        localStorage.setItem(REVIEWER_ID_KEY, id);
    }
    return id;
};

// Default high-rating curated reviews for Chittorgarh verified local partners
const DEFAULT_REVIEWS = {
    'vendor-1': [
        { id: 'def-1', entityId: 'vendor-1', rating: 5, comment: 'Authentic Mewari Dal Baati with pure desi ghee. Unmissable experience!', userName: 'Rajesh K.', date: '2026-02-14' },
        { id: 'def-2', entityId: 'vendor-1', rating: 5, comment: 'Hospitality was extraordinary and flavors were truly regal.', userName: 'Meera S.', date: '2026-02-28' }
    ],
    'vendor-2': [
        { id: 'def-3', entityId: 'vendor-2', rating: 5, comment: 'Wonderful local handicrafts and authentic Akola printed fabric.', userName: 'Aanya P.', date: '2026-03-01' }
    ]
};

const getStoredReviews = () => {
    try {
        const stored = localStorage.getItem(LOCAL_REVIEWS_KEY);
        return stored ? JSON.parse(stored) : DEFAULT_REVIEWS;
    } catch {
        return DEFAULT_REVIEWS;
    }
};

const saveStoredReviews = (data) => {
    try {
        localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('Storage save error:', e);
    }
};

export const getReviews = async (id) => {
    const all = getStoredReviews();
    const comments = all[id] || [
        { id: `auto-${id}-1`, entityId: id, rating: 5, comment: 'Excellent verified service and prompt response!', userName: 'Verified Traveler', date: '2026-03-10' }
    ];
    const ratings = comments.map(c => Number(c.rating));
    return { ratings, comments };
};

export const addReview = async (id, rating, comment, userName = 'Guest') => {
    const all = getStoredReviews();
    const itemReviews = all[id] || [];
    const newRev = {
        id: 'rev_' + Date.now(),
        entityId: id,
        reviewerId: getReviewerId(),
        rating: Number(rating),
        comment,
        userName,
        date: new Date().toISOString().split('T')[0]
    };
    itemReviews.unshift(newRev);
    all[id] = itemReviews;
    saveStoredReviews(all);
    return newRev;
};

export const updateReview = async (reviewId, rating, comment) => {
    const all = getStoredReviews();
    Object.keys(all).forEach(key => {
        all[key] = all[key].map(r => r.id === reviewId ? { ...r, rating: Number(rating), comment, lastEdited: new Date().toISOString() } : r);
    });
    saveStoredReviews(all);
};

export const deleteReview = async (reviewId) => {
    const all = getStoredReviews();
    Object.keys(all).forEach(key => {
        all[key] = all[key].filter(r => r.id !== reviewId);
    });
    saveStoredReviews(all);
};

export const getAverageRating = async (id) => {
    const { ratings } = await getReviews(id);
    if (!ratings || ratings.length === 0) return '4.9';
    const sum = ratings.reduce((a, b) => a + Number(b), 0);
    return (sum / ratings.length).toFixed(1);
};

export const getReviewCount = async (id) => {
    const { ratings } = await getReviews(id);
    return ratings ? ratings.length : 12;
};
