import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from '../components/Section';
import VendorCard from '../components/VendorCard';

const LocalVocalPage = ({ t, filteredLocalVocal, searchQuery }) => {
    return (
        <Section id="local-vocal" title={t.localVocal.title} className="bg-transparent text-center min-h-[60vh] flex flex-col justify-center">
            {!searchQuery && (
                <>
                    <p className="max-w-2xl mx-auto text-gray-400 mb-4 font-light italic">
                        "{t.localVocal.subtitle}"
                    </p>
                    <div className="mb-12">
                        <NavLink
                            to="/gallery"
                            className="inline-flex items-center gap-2 text-royal-gold/60 hover:text-royal-gold transition-colors text-xs uppercase tracking-widest border-b border-royal-gold/20 hover:border-royal-gold"
                        >
                            View Craftsmanship Gallery
                            <ArrowRight className="w-4 h-4" />
                        </NavLink>
                    </div>
                </>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredLocalVocal.map(item => (
                    <VendorCard key={`local-vocal-${item.id}`} vendor={item} />
                ))}
            </div>
            {filteredLocalVocal.length > 0 && (
                <p className="text-royal-gold/30 text-[10px] uppercase tracking-[0.3em] font-serif mt-16 italic">
                    * {t.common.disclaimer}
                </p>
            )}
        </Section>
    );
};

export default LocalVocalPage;
