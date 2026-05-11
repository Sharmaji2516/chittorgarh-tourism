import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

const FeedbackPage = () => {
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get('id');
    const providerId = searchParams.get('provider');
    const serviceType = searchParams.get('type') || 'service';

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await addDoc(collection(db, "feedback"), {
                bookingId,
                providerId,
                serviceType,
                rating,
                comment,
                createdAt: serverTimestamp()
            });
            setIsSubmitted(true);
        } catch (err) {
            console.error("Error submitting feedback:", err);
            setError('Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center text-white p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] max-w-md w-full text-center shadow-2xl"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-serif font-black mb-4">Thank You!</h1>
                    <p className="text-white/60 text-sm leading-relaxed">Your feedback has been recorded. It helps us improve our services for future travelers.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl relative z-10"
            >
                <header className="text-center mb-10">
                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-royal-gold/20">
                        <Star className="w-8 h-8 text-royal-gold" />
                    </div>
                    <h1 className="text-2xl font-serif font-black mb-2">Share Your Experience</h1>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-black">Help us improve</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Rating Stars */}
                    <div className="space-y-2">
                        <label className="text-[10px] text-white/40 font-black uppercase tracking-widest block text-center">Your Rating</label>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                >
                                    <Star 
                                        className={cn(
                                            "w-10 h-10 transition-all duration-300",
                                            (hoverRating || rating) >= star 
                                                ? "text-royal-gold fill-royal-gold" 
                                                : "text-white/20 fill-transparent"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <label className="text-[10px] text-white/40 font-black uppercase tracking-widest block">Your Review</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/20" />
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell us what you liked or what we can improve..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-royal-gold transition-all min-h-[120px] resize-none"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs text-center font-black uppercase tracking-widest">{error}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-royal-gold text-slate-900 font-black uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-royal-gold/20"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                                Submitting...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                Submit Feedback
                            </span>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default FeedbackPage;
