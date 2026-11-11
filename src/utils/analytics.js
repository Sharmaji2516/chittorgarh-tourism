/**
 * Analytics, UTM Attribution & Conversion Tracking Module
 * Ready for GA4, Google Tag Manager & Google Ads conversion tags.
 * Captures campaign parameters and tracks WhatsApp, Phone, and Inquiry events.
 */

// Retrieve UTM parameters from current URL or stored session
export const getUtmParams = () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
        const currentUtms = {};
        let hasUtm = false;

        utmKeys.forEach(key => {
            const val = urlParams.get(key);
            if (val) {
                currentUtms[key] = val;
                hasUtm = true;
            }
        });

        if (hasUtm) {
            sessionStorage.setItem('ctt_utm_params', JSON.stringify(currentUtms));
            return currentUtms;
        }

        const stored = sessionStorage.getItem('ctt_utm_params');
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

/**
 * Track custom events in GA4 / gtag if loaded
 * Gracefully silent when gtag is not active yet (placeholder mode)
 */
export const trackEvent = (eventName, params = {}) => {
    try {
        const utms = getUtmParams();
        const payload = {
            ...params,
            ...utms,
            timestamp: new Date().toISOString(),
            page_path: window.location.pathname
        };

        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', eventName, payload);
            console.log(`[Analytics Event] ${eventName}:`, payload);
        } else {
            console.log(`[Analytics Event - Dev Placeholder] ${eventName}:`, payload);
        }
    } catch (e) {
        console.warn('Analytics event dispatch error:', e);
    }
};

/**
 * High-priority conversion handlers
 */
export const trackWhatsAppClick = (source = 'generic', label = '') => {
    trackEvent('whatsapp_inquiry_click', {
        event_category: 'Conversion',
        event_label: label || source,
        source
    });
};

export const trackPhoneCallClick = (source = 'generic') => {
    trackEvent('phone_call_click', {
        event_category: 'Conversion',
        event_label: source,
        source
    });
};

export const trackInquiryFormSubmit = (serviceName, travelers = 1) => {
    trackEvent('trip_inquiry_submit', {
        event_category: 'Lead',
        service_name: serviceName,
        travelers_count: travelers
    });
};

export const trackPackageView = (packageName) => {
    trackEvent('view_package_details', {
        event_category: 'Engagement',
        package_name: packageName
    });
};
