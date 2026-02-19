import React from 'react';

const Section = ({ id, title, children, className = "" }) => {
    return (
        <section id={id} className={`py-20 relative overflow-hidden ${className}`}>
            {/* Container */}
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Section Title with Decorative Elements */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="block h-px w-20 bg-gradient-to-r from-transparent via-royal-gold to-transparent opacity-50"></span>
                        <div className="w-2 h-2 rotate-45 bg-royal-gold"></div>
                        <span className="block h-px w-20 bg-gradient-to-r from-transparent via-royal-gold to-transparent opacity-50"></span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif text-royal-gold font-bold tracking-wide uppercase drop-shadow-md">
                        {title}
                    </h2>

                    <div className="flex items-center justify-center gap-4 mt-4">
                        <span className="block w-24 h-1 bg-royal-gold/20 rounded-full"></span>
                    </div>
                </div>

                {/* Content */}
                <div className="relative">
                    {/* Corner Ornaments for Content Area (Optional, nice touch) */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-royal-gold/30"></div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-royal-gold/30"></div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-royal-gold/30"></div>
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-royal-gold/30"></div>

                    {children}
                </div>
            </div>
        </section>
    );
};

export default Section;
