const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'data', 'content.js');
let content = fs.readFileSync(filePath, 'utf8');

// List of "old" images to remove IF a corresponding "new" one is present in the same attraction
// We iterate through attractions and clean up their images array
const cleanupMap = [
    { target: "vijay-stambh-new.jpg", remove: "Vjay.jpg" },
    { target: "chittorgarh-fort-new.jpg", remove: "Chittorgarh Fort.webp" },
    { target: "kumbha-shyam-new.jpg", remove: "Kumbha SHyam.jpg" },
    { target: "padmini-palace-new.jpg", remove: "Padmini Palace.jpg" },
    { target: "fateh-prakash-new.jpg", remove: "Fateh.jpg" },
    { target: "kalika-mata-new.jpg", remove: "Kalika.jpg" },
    { target: "ratan-singh-new.jpg", remove: "Ratan SIngh.jpg" },
    { target: "kumbha-palace-new.jpg", remove: "Rana kumbha.jpg" },
    { target: "menal-waterfall-new.jpg", remove: "Menal.jpg" },
    { target: "sanwariya-temple-new.jpg", remove: "Sanvliya-ji-Temple.jpg" }
];

const itemRegex = /{\s*id:\s*(\d+),[\s\S]*?}/g;

let updatedContent = content.replace(itemRegex, (match) => {
    let currentMatch = match;
    cleanupMap.forEach(pair => {
        if (currentMatch.includes(pair.target) && currentMatch.includes(pair.remove)) {
            // Remove the 'remove' image from the images array or image property
            // We need to be careful with commas and brackets
            // Case 1: images: [ ..., "remove.jpg", ... ]
            const regexArr = new RegExp(`['"]\\/assets\\/images\\/${pair.remove.replace('.', '\\.')}['"]\\s*,?`, 'g');
            currentMatch = currentMatch.replace(regexArr, '');
        }
    });

    // Clean up trailing commas in arrays if any
    currentMatch = currentMatch.replace(/,\s*\]/g, '\n                    ]');
    currentMatch = currentMatch.replace(/\[\s*,/g, '[');

    return currentMatch;
});

fs.writeFileSync(filePath, updatedContent);
console.log('Successfully removed redundant duplicates from content.js');
