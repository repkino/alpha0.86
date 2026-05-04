const fs = require('fs');
const glob = require('glob');

const files = glob.sync('d:/git/alpha0.86/eventSheets/**/*.json');
let results = [];

function traverse(obj, path, file) {
    if (Array.isArray(obj)) {
        obj.forEach((item, i) => traverse(item, `${path}[${i}]`, file));
    } else if (obj !== null && typeof obj === 'object') {
        const isClick = obj.id === 'on-any-click' || obj.id === 'on-click' || obj.id === 'on-any-touch-start';
        const isPointClick = obj.id === 'on-object-clicked' || (obj.id === 'on-click' || obj.id === 'on-any-click' || obj.id === 'on-any-touch-start') && JSON.stringify(obj.conditions || []).includes('"point"');
        const isFunctionCall = obj.id === 'callFunction' || obj.id === 'callselffunction0';

        if (isPointClick) {
            results.push({ file, type: 'click', path, obj });
        }
        for (let key in obj) {
            traverse(obj[key], `${path}.${key}`, file);
        }
    }
}

files.forEach(file => {
    try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        traverse(data, 'root', file);
    } catch (e) { }
});

fs.writeFileSync('d:/git/alpha0.86/search_point_click.json', JSON.stringify(results, null, 2));
console.log(`Found ${results.length} point click events`);
