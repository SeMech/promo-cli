const fs = require('fs');
const path = require('path');

const dirs = fs.readdirSync(path.resolve(__dirname));
const requireModules = [];
dirs.map((dirItem) => {
    if (dirItem !== 'index.js' && dirItem.indexOf('Command') !== -1) {
        requireModules.push(require(`./${dirItem}`))
    }
});

module.exports = requireModules;
