import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there's a hash (e.g., /#history), scroll to that section smoothly
        if (hash) {
            const element = document.getElementById(hash.slice(1));
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 50);
                return;
            }
        }

        // On any route change (e.g., /gallery, /flavors), snap to top instantly
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
