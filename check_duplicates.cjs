const { content } = require('./src/data/content');

const allImages = [];
Object.entries(content).forEach(([lang, langContent]) => {
    if (langContent.attractions && langContent.attractions.items) {
        langContent.attractions.items.forEach(attraction => {
            const imgs = attraction.images || (attraction.image ? [attraction.image] : []);
            imgs.forEach(img => {
                allImages.push({
                    lang,
                    attractionId: attraction.id,
                    attractionName: attraction.name,
                    path: img
                });
            });
        });
    }
});

const counts = {};
allImages.forEach(item => {
    const norm = item.path.trim().toLowerCase();
    const finalNorm = norm.startsWith('/') ? norm : '/' + norm;
    if (!counts[finalNorm]) {
        counts[finalNorm] = [];
    }
    counts[finalNorm].push(item);
});

console.log('--- Duplicate Candidates (based on normalized path) ---');
Object.entries(counts).forEach(([path, items]) => {
    if (items.length > 1) {
        // If they are from the same ID, it's definitely a duplicate in aggregation.
        // If they are from different IDs but same path, it's also a duplicate in aggregation.
        // Let's see if there are paths that are ALMOST the same but didn't match.
    }
});

// Let's just print all unique normalized paths and their counts
console.log('Total unique normalized paths:', Object.keys(counts).length);
console.log('Total raw image entries:', allImages.length);

// Print paths that appear more than once in the RAW list (meaning they are shared across languages or attractions)
const shared = Object.entries(counts).filter(([p, items]) => items.length > 1);
shared.sort((a, b) => b[1].length - a[1].length);

console.log('\nTop Shared/Duplicate paths:');
shared.slice(0, 20).forEach(([path, items]) => {
    console.log(`${path} (${items.length} occurrences)`);
});
