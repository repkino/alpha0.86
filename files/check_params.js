const fs = require('fs');
const data = JSON.parse(fs.readFileSync('temp3_2.json', 'utf8'));

function checkNode(node, path) {
    if (node.parameters) {
        for (const [k, v] of Object.entries(node.parameters)) {
            if (typeof v !== 'string') {
                console.log('Found non-string parameter at ' + path + ': ' + k + ' = ' + v + ' (type: ' + typeof v + ')');
            }
        }
    }
    if (node.children) node.children.forEach((c, i) => checkNode(c, path + '.children[' + i + ']'));
    if (node.actions) node.actions.forEach((a, i) => checkNode(a, path + '.actions[' + i + ']'));
    if (node.conditions) node.conditions.forEach((c, i) => checkNode(c, path + '.conditions[' + i + ']'));
}

checkNode(data, 'root');
console.log('Check complete.');
