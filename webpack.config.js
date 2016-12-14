const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/scripts/app.js'],
    output: {
        path: './dist',
        filename: 'app.bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({template: 'src/index.html'})],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    }
};