import React from 'react';
import Section from '../components/Section';
import VendorCard from '../components/VendorCard';
import HotelCard from '../components/HotelCard';

const StaysPage = ({ t, filteredHotels, searchQuery }) => {
    return (
        <div className="space-y-0">
            {/* Hotels Section */}
            {filteredHotels.length > 0 && (
                <Section id="hotels" title={t.hotels.title} className="bg-transparent">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredHotels.map(item => (
                            <HotelCard key={`hotel-${item.id}`} hotel={item} />
                        ))}
                    </div>
                </Section>
            )}

            {filteredHotels.length > 0 && (
                <Section className="bg-transparent py-0 pb-16">
                    <p className="text-royal-gold/30 text-[10px] uppercase tracking-[0.3em] font-serif text-center italic">
                        * {t.common.disclaimer}
                    </p>
                </Section>
            )}
        </div>
    );
};

export default StaysPage;
