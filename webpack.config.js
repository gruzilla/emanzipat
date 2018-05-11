var path = require('path');

module.exports = {
    entry: './public/main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.bundle.js'
    }
};