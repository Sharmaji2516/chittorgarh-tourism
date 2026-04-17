import React, { createContext, useState, useContext, useEffect } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingData, setBookingData] = useState(() => {
        const saved = localStorage.getItem('ctt_booking_draft');
        return saved ? JSON.parse(saved) : {
            pillarId: '',
            pillarTitle: '',
            date: '',
            travelers: 1,
            transport: 'Not Selected',
            hotel: 'Not Selected',
            guide: 'Not Selected',
            name: '',
            phone: '',
            status: 'draft' // draft, submitted
        };
    });

    useEffect(() => {
        localStorage.setItem('ctt_booking_draft', JSON.stringify(bookingData));
    }, [bookingData]);

    const updateBooking = (updates) => {
        setBookingData(prev => ({ ...prev, ...updates }));
    };

    const resetBooking = () => {
        const reset = {
            pillarId: '',
            pillarTitle: '',
            date: '',
            travelers: 1,
            transport: 'Not Selected',
            hotel: 'Not Selected',
            guide: 'Not Selected',
            name: '',
            phone: '',
            status: 'draft'
        };
        setBookingData(reset);
        localStorage.removeItem('ctt_booking_draft');
    };

    return (
        <BookingContext.Provider value={{ bookingData, updateBooking, resetBooking }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);
