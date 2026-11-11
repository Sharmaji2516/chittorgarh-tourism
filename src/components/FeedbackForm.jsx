import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const FeedbackForm = () => {
    const { t } = useLanguage();
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://formspree.io/f/myklerrl', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mt-8 mb-12 p-8 rounded-2xl bg-royal-gold/5 border border-royal-gold/10 backdrop-blur-sm relative overflow-hidden group"
        >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-royal-gold/10 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-royal-gold/5 blur-3xl rounded-full -ml-16 -mb-16 group-hover:bg-royal-gold/10 transition-colors"></div>

            <h3 className="text-royal-gold font-serif text-2xl mb-8 flex items-center justify-center gap-3">
                <span className="text-royal-gold/40 text-base">✦</span>
                {t.footer.feedback.title}
                <span className="text-royal-gold/40 text-base">✦</span>
            </h3>

            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-10"
                    >
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-royal-gold/90 font-medium text-lg mb-2">{t.footer.feedback.success}</p>
                        <p className="text-royal-white/40 text-sm mb-8">We value your input in our journey of Mewar.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="text-xs uppercase tracking-[0.2em] text-royal-gold/60 hover:text-royal-gold underline decoration-royal-gold/30 hover:decoration-royal-gold transition-all"
                        >
                            Send another response
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6 relative z-10"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-royal-gold/60 ml-2 font-bold">
                                    {t.footer.feedback.name}
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Maharana Pratap"
                                    className="w-full bg-royal-black/40 border border-royal-gold/20 rounded-xl px-5 py-3 text-sm text-royal-white focus:outline-none focus:border-royal-gold/50 focus:bg-royal-black/60 transition-all placeholder:text-royal-white/10"
                                />
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-royal-gold/60 ml-2 font-bold">
                                    {t.footer.feedback.email}
                                </label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                    className="w-full bg-royal-black/40 border border-royal-gold/20 rounded-xl px-5 py-3 text-sm text-royal-white focus:outline-none focus:border-royal-gold/50 focus:bg-royal-black/60 transition-all placeholder:text-royal-white/10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-royal-gold/60 ml-2 font-bold">
                                {t.footer.feedback.message}
                            </label>
                            <textarea
                                required
                                rows="4"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Share your thoughts or suggestions..."
                                className="w-full bg-royal-black/40 border border-royal-gold/20 rounded-xl px-5 py-3 text-sm text-royal-white focus:outline-none focus:border-royal-gold/50 focus:bg-royal-black/60 transition-all placeholder:text-royal-white/10 resize-none"
                            />
                        </div>

                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-400 text-xs flex items-center justify-center gap-2 bg-red-400/5 py-2 rounded-lg"
                            >
                                <AlertCircle className="w-4 h-4" />
                                {t.footer.feedback.error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-gradient-to-r from-royal-gold/80 to-royal-gold hover:from-royal-gold hover:to-orange-500 text-royal-black font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group/btn shadow-lg shadow-royal-gold/10"
                        >
                            {status === 'loading' ? (
                                <div className="w-5 h-5 border-2 border-royal-black/30 border-t-royal-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="uppercase tracking-[0.3em] text-xs font-black">{t.footer.feedback.submit}</span>
                                    <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FeedbackForm;
