import React from 'react';
import ItinerarySection from '../components/ItinerarySection';

const ItinerariesPage = ({ t }) => {
    return (
        <div className="pt-20">
            <ItinerarySection content={t} />
        </div>
    );
};

export default ItinerariesPage;
