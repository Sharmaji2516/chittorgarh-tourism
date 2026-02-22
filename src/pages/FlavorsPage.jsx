import React from 'react';
import Section from '../components/Section';
import VendorCard from '../components/VendorCard';

const FlavorsPage = ({ t, filteredVendors, filteredCafes, searchQuery }) => {
    return (
        <div className="space-y-0">
            <Section id="vendors" title={t.vendors.title} className="bg-transparent text-center">
                {!searchQuery && (
                    <p className="max-w-2xl mx-auto text-gray-400 mb-12 font-light italic">
                        "Discover the culinary heritage of Chittorgarh. From the spicy Dal Baati to the sweet Gulab Jamun, every bite is a royal treat."
                    </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredVendors.map(item => (
                        <VendorCard key={`vendor-${item.id}`} vendor={item} />
                    ))}
                </div>
            </Section>

            {/* Cafes Section Moved from Stays */}
            {filteredCafes.length > 0 && (
                <Section id="cafes" title={t.cafes.title} className="bg-black/20 backdrop-blur-sm border-t border-royal-gold/10 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredCafes.map(item => (
                            <VendorCard key={`cafe-${item.id}`} vendor={item} />
                        ))}
                    </div>
                </Section>
            )}

            {(filteredVendors.length > 0 || filteredCafes.length > 0) && (
                <div className="pb-16 text-center">
                    <p className="text-royal-gold/30 text-[10px] uppercase tracking-[0.3em] font-serif italic">
                        * {t.common.disclaimer}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FlavorsPage;
