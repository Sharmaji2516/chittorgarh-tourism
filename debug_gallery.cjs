const { content } = require('./src/data/content');

function getGalleryImages() {
    const seenNormalized = new Set();
    const images = [];

    Object.values(content).forEach(langContent => {
        if (langContent.attractions && langContent.attractions.items) {
            langContent.attractions.items.forEach(attraction => {
                const attractionImages = attraction.images || (attraction.image ? [attraction.image] : []);
                attractionImages.forEach(img => {
                    const trimmed = img.trim();
                    let normalized = trimmed.toLowerCase();
                    if (!normalized.startsWith('/') && !normalized.startsWith('http')) {
                        normalized = '/' + normalized;
                    }
                    if (!seenNormalized.has(normalized)) {
                        seenNormalized.add(normalized);
                        images.push({
                            url: trimmed,
                            id: `${attraction.id}-${normalized}`
                        });
                    }
                });
            });
        }
    });
    return images;
}

const images = getGalleryImages();
console.log('Total aggregated gallery images:', images.length);
images.sort((a, b) => a.url.localeCompare(b.url, undefined, { sensitivity: 'base' })).forEach(img => console.log(img.url));
