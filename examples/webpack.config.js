var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: './examples/index.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-runtime', 'transform-class-properties', 'transform-decorators-legacy']
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@cat-react/form': '../../src'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor.bundle')
    ]
};
