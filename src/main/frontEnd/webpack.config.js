var path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: '../resources/static/built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
};