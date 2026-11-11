import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
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
            // Save feedback locally & trigger WhatsApp review relay
            const feedbackEntry = {
                id: 'fb-' + Date.now(),
                bookingId,
                providerId,
                serviceType,
                rating,
                comment,
                createdAt: new Date().toISOString()
            };
            const existing = JSON.parse(localStorage.getItem('ctt_guest_feedback') || '[]');
            existing.unshift(feedbackEntry);
            localStorage.setItem('ctt_guest_feedback', JSON.stringify(existing));

            // Also open WhatsApp if user desires
            const msg = `🌟 *Guest Feedback - Chittorgarh Tourism*\n\n⭐ *Rating:* ${rating}/5 Stars\n💬 *Review:* ${comment || 'N/A'}\n🔖 *Service:* ${serviceType}`;
            const waUrl = `https://wa.me/917597451057?text=${encodeURIComponent(msg)}`;
            window.open(waUrl, '_blank');

            setIsSubmitted(true);
        } catch (err) {
            console.error("Error submitting feedback:", err);
            setError('Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-[#F8F5EF] text-[#25231F] relative overflow-hidden flex flex-col justify-center items-center">
            <SEOHead
                title="Guest Feedback & Review | Visit Chittorgarh"
                description="Share your travel experience, guide feedback, and tour review with Visit Chittorgarh tourism team."
                canonical="/feedback"
            />

            <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#C49A32]/10 border border-[#C49A32]/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#C49A32]">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-[#25231F]">Rate Your Experience</h1>
                    <p className="text-sm text-[#25231F]/70 mt-2">
                        Help us preserve the royal hospitality standards of Chittorgarh.
                    </p>
                </div>

                {isSubmitted ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-[#25231F]">Dhanyawad! 🙏</h2>
                        <p className="text-sm text-[#25231F]/70 mt-2">
                            Your feedback helps us support verified local guides and tour operators.
                        </p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs text-center">
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col items-center">
                            <span className="text-xs uppercase tracking-wider font-bold text-[#C49A32] mb-3">Overall Rating</span>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="p-1 focus:outline-none transition-transform hover:scale-125"
                                    >
                                        <Star
                                            className={cn(
                                                "w-8 h-8 transition-colors",
                                                (hoverRating || rating) >= star
                                                    ? "fill-[#C49A32] text-[#C49A32]"
                                                    : "text-gray-300"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider font-bold text-[#25231F]/70 mb-2">
                                Comments & Experience
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                placeholder="Tell us about the guide, cleanliness, itinerary timing, or suggestions..."
                                className="w-full bg-[#F8F5EF] border border-[#EFE7D9] rounded-2xl p-4 text-sm text-[#25231F] focus:outline-none focus:border-[#C49A32] transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-[#C49A32] text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#b08728] transition-all shadow-lg active:scale-95 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;
