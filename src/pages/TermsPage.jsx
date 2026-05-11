import React from 'react';
import Section from '../components/Section';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Scale, CreditCard, MessageSquare, AlertTriangle, UserX, Brush } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TermsPage = () => {
    const { t } = useLanguage();
    const termsData = t.termsPage;

    const getIcon = (id) => {
        switch (id) {
            case 1: return <FileText className="w-6 h-6" />;
            case 2: return <Scale className="w-6 h-6" />;
            case 3: return <ShieldCheck className="w-6 h-6" />;
            case 4: return <Scale className="w-6 h-6" />;
            case 5: return <CreditCard className="w-6 h-6" />;
            case 6: return <ShieldCheck className="w-6 h-6" />;
            case 7: return <MessageSquare className="w-6 h-6" />;
            case 8: return <AlertTriangle className="w-6 h-6" />;
            case 9: return <UserX className="w-6 h-6" />;
            case 10: return <Brush className="w-6 h-6" />;
            case 11: return <FileText className="w-6 h-6" />;
            case 12: return <Scale className="w-6 h-6" />;
            default: return <FileText className="w-6 h-6" />;
        }
    };

    const renderContent = (content) => {
        const parts = content.split(': ');
        if (parts.length > 1 && parts[0].length < 60) {
            return (
                <span>
                    <strong className="text-royal-gold font-semibold">{parts[0]}:</strong>{' '}
                    {parts.slice(1).join(': ')}
                </span>
            );
        }
        return content;
    };

    return (
        <div className="relative overflow-hidden">
            {/* Background Orbs for Premium Aesthetic */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-royal-gold/5 rounded-full blur-3xl -z-10 opacity-30" />
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-royal-gold/5 rounded-full blur-3xl -z-10 opacity-30" />
            
            <Section id="terms" title={termsData.title} className="bg-transparent py-16">
                <div className="max-w-4xl mx-auto px-4 relative">
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 relative"
                    >
                        {/* Decorative line */}
                        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto mb-6" />
                        
                        <p className="text-royal-gold text-lg md:text-2xl font-serif italic mb-6">
                            "{termsData.welcome}"
                        </p>
                        <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-base md:text-lg">
                            {termsData.govern}
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {termsData.items.map((term, index) => (
                            <motion.div 
                                key={term.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="group bg-gradient-to-br from-heritage-charcoal/90 to-heritage-charcoal/50 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-royal-gold/10 hover:border-royal-gold/30 transition-all duration-500 shadow-xl hover:shadow-royal-gold/5 flex flex-col md:flex-row gap-6 items-start"
                            >
                                <div className="w-12 h-12 bg-royal-gold/5 group-hover:bg-royal-gold/10 rounded-xl flex items-center justify-center text-royal-gold flex-shrink-0 transition-colors duration-500 border border-royal-gold/10 group-hover:border-royal-gold/30">
                                    {getIcon(term.id)}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-serif text-white mb-3 group-hover:text-royal-gold transition-colors duration-500">
                                        {term.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                                        {renderContent(term.content)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 text-center text-gray-500 text-sm font-medium tracking-wide"
                    >
                        {termsData.lastUpdated}
                    </motion.div>
                </div>
            </Section>
        </div>
    );
};

export default TermsPage;
