var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
        const isDir = fs.lstatSync(path.join(__dirname, dir)).isDirectory();

        if (isDir && dir !== 'components') {
            entries[dir] = path.join(__dirname, dir, 'app.js');
        }

        return entries;
    }, {}),
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
