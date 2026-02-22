import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, MessageSquare, User, Send, List, ChevronLeft, Trash2, Edit2, AlertCircle } from 'lucide-react';
import { addReview, getReviews, getReviewerId, updateReview, deleteReview } from '../utils/ReviewSystem';

const ReviewModal = ({ isOpen, onClose, entityId, entityName, onSystemUpdate }) => {
    const [view, setView] = useState('list'); // 'form' or 'list'
    const [editingReview, setEditingReview] = useState(null); // Review being edited
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reviewsData, setReviewsData] = useState({ ratings: [], comments: [] });

    const reviewerId = getReviewerId();

    const fetchReviews = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getReviews(entityId);
            setReviewsData(data);
        } catch (err) {
            console.error("Fetch failed:", err);
            setError("Failed to load reviews. Check your internet or Firebase rules.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchReviews();
        }
    }, [isOpen, entityId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || loading) return;

        console.log("Starting review operation for ID:", entityId);
        setLoading(true);
        setError(null);
        try {
            if (editingReview) {
                console.log("Updating existing review:", editingReview.id);
                await updateReview(editingReview.id, rating, comment);
            } else {
                console.log("Adding new review for:", entityName);
                const result = await addReview(entityId, rating, comment, name || 'Guest');
                console.log("Review saved successfully! Document ID:", result.id);
            }

            setSubmitted(true);
            await fetchReviews();
            if (onSystemUpdate) onSystemUpdate();

            setTimeout(() => {
                setSubmitted(false);
                setRating(0);
                setComment('');
                setName('');
                setEditingReview(null);
                setView('list');
            }, 1500);
        } catch (err) {
            console.error("Firestore operation error:", err);
            setError(`Error: ${err.message || "Failed to save. Check your Firebase Rules."}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (rev) => {
        setEditingReview(rev);
        setRating(rev.rating);
        setComment(rev.comment);
        setName(rev.userName);
        setView('form');
    };

    const handleDelete = async (revId) => {
        if (!window.confirm("Delete this review forever?")) return;

        console.log("Deleting review:", revId);
        setLoading(true);
        try {
            await deleteReview(revId);
            await fetchReviews();
            if (onSystemUpdate) onSystemUpdate();
        } catch (err) {
            console.error("Delete error:", err);
            setError("Could not delete review.");
        } finally {
            setLoading(false);
        }
    };

    const sortedComments = [...reviewsData.comments].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-heritage-charcoal border border-heritage-gold/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-heritage-gold/10 flex justify-between items-center bg-heritage-charcoal-light shrink-0">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-heritage-gold">
                                    {submitted ? 'Thank You!' : editingReview ? 'Edit Your Review' : view === 'form' ? 'Share Your Experience' : 'Visitor Reviews'}
                                </h3>
                                <p className="text-xs text-heritage-stone/60 uppercase tracking-widest">{entityName}</p>
                            </div>
                            <div className="flex gap-2">
                                {view === 'form' ? (
                                    <button
                                        onClick={() => {
                                            setView('list');
                                            setEditingReview(null);
                                            setRating(0);
                                            setComment('');
                                            setName('');
                                        }}
                                        className="p-2 hover:bg-heritage-gold/10 rounded-full text-heritage-gold transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-tighter"
                                    >
                                        <ChevronLeft size={18} />
                                        Back to Reviews
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setView('form')}
                                        className="px-4 py-2 bg-heritage-gold/10 hover:bg-heritage-gold/20 rounded-xl text-heritage-gold transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-heritage-gold/20"
                                    >
                                        <MessageSquare size={14} />
                                        Write Review
                                    </button>
                                )}
                                <button onClick={onClose} className="p-2 hover:bg-heritage-gold/10 rounded-full text-heritage-stone/40 hover:text-heritage-gold transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Body - Scrollable */}
                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-heritage-gold/10 flex items-center justify-center mx-auto mb-6 border border-heritage-gold/30">
                                        <Star size={40} className="text-heritage-gold fill-heritage-gold" />
                                    </div>
                                    <h4 className="text-2xl font-serif text-heritage-gold mb-2">
                                        {editingReview ? 'Review Updated' : 'Review Submitted'}
                                    </h4>
                                    <p className="text-heritage-stone/60">Thank you for your valuable feedback!</p>
                                </motion.div>
                            ) : view === 'form' ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="flex flex-col items-center gap-4 mb-4">
                                        <span className="text-sm text-heritage-stone/40 uppercase tracking-widest font-bold">Your Rating</span>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    onMouseEnter={() => setHover(star)}
                                                    onMouseLeave={() => setHover(0)}
                                                    className="p-1 transition-transform active:scale-95"
                                                    disabled={loading}
                                                >
                                                    <Star
                                                        size={36}
                                                        className={`${(hover || rating) >= star ? 'text-heritage-gold fill-heritage-gold' : 'text-heritage-stone/20'} transition-colors duration-200`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-heritage-gold/40 group-focus-within:text-heritage-gold transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your Name (Optional)"
                                            disabled={loading || editingReview} // Don't change name on edit
                                            className="w-full bg-black/40 border border-heritage-gold/10 rounded-2xl py-4 pl-12 pr-4 text-heritage-parchment placeholder:text-heritage-stone/20 focus:outline-none focus:border-heritage-gold/40 transition-all font-light disabled:opacity-50"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute left-4 top-4 text-heritage-gold/40 group-focus-within:text-heritage-gold transition-colors">
                                            <MessageSquare size={18} />
                                        </div>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Write your review here..."
                                            rows={4}
                                            required
                                            disabled={loading}
                                            className="w-full bg-black/40 border border-heritage-gold/10 rounded-2xl py-4 pl-12 pr-4 text-heritage-parchment placeholder:text-heritage-stone/20 focus:outline-none focus:border-heritage-gold/40 transition-all font-light resize-none disabled:opacity-50"
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center flex items-center justify-center gap-2">
                                            <AlertCircle size={14} />
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={rating === 0 || loading}
                                        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest transition-all ${rating > 0 && !loading
                                            ? 'bg-heritage-gold text-heritage-charcoal hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transform hover:-translate-y-1'
                                            : 'bg-heritage-gold/10 text-heritage-stone/20 cursor-not-allowed border border-heritage-gold/5'
                                            }`}
                                    >
                                        <Send size={18} className={loading ? 'animate-pulse' : ''} />
                                        {loading ? 'Processing...' : editingReview ? 'Update Review' : 'Submit Review'}
                                    </button>
                                </form>
                            ) : (
                                <div className="space-y-6">
                                    {loading && reviewsData.comments.length === 0 ? (
                                        <div className="py-20 text-center">
                                            <div className="w-12 h-12 border-2 border-heritage-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                            <p className="text-heritage-stone/40 animate-pulse uppercase tracking-[0.2em] text-xs">Loading Reviews...</p>
                                        </div>
                                    ) : sortedComments.length === 0 ? (
                                        <div className="py-12 text-center">
                                            <div className="w-16 h-16 rounded-full bg-heritage-gold/5 flex items-center justify-center mx-auto mb-4 border border-heritage-gold/10">
                                                <List size={24} className="text-heritage-stone/20" />
                                            </div>
                                            <p className="text-heritage-stone/40 italic">No reviews yet. Be the first to share your experience!</p>
                                            <button
                                                onClick={() => setView('form')}
                                                className="mt-6 text-heritage-gold text-sm font-bold uppercase tracking-widest hover:underline"
                                            >
                                                Leave a Review
                                            </button>
                                        </div>
                                    ) : (
                                        sortedComments.map((rev) => (
                                            <motion.div
                                                key={rev.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="p-4 rounded-2xl bg-black/20 border border-heritage-gold/5 relative group"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-heritage-gold/10 border border-heritage-gold/20 flex items-center justify-center text-heritage-gold font-bold text-xs">
                                                            {rev.userName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h5 className="text-sm font-bold text-heritage-parchment italic">{rev.userName}</h5>
                                                                {rev.reviewerId === reviewerId && (
                                                                    <span className="text-[8px] bg-heritage-gold/10 text-heritage-gold px-1.5 py-0.5 rounded uppercase tracking-tighter border border-heritage-gold/20">You</span>
                                                                )}
                                                            </div>
                                                            <p className="text-[10px] text-heritage-stone/40 uppercase tracking-tighter">
                                                                {new Date(rev.date).toLocaleDateString()}
                                                                {rev.lastEdited && " (Edited)"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <div className="flex gap-0.5">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <Star
                                                                    key={s}
                                                                    size={10}
                                                                    className={`${s <= rev.rating ? 'text-heritage-gold fill-heritage-gold' : 'text-heritage-stone/20'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        {rev.reviewerId === reviewerId && (
                                                            <div className="flex gap-3 transition-all">
                                                                <button
                                                                    onClick={() => handleEdit(rev)}
                                                                    className="text-heritage-gold hover:scale-110 transition-transform p-1 bg-heritage-gold/5 rounded-lg border border-heritage-gold/10"
                                                                    title="Edit"
                                                                >
                                                                    <Edit2 size={12} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(rev.id)}
                                                                    className="text-red-400 hover:scale-110 transition-transform p-1 bg-red-400/5 rounded-lg border border-red-400/10"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 size={12} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-heritage-stone/80 font-light leading-relaxed pl-11">
                                                    "{rev.comment}"
                                                </p>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer Decoration */}
                        <div className="h-2 bg-gradient-to-r from-transparent via-heritage-gold/30 to-transparent shrink-0"></div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ReviewModal;
