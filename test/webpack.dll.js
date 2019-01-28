const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports.default = {
    mode: 'production',
    entry: {
        reactpackage: ['react', 'react-dom']
    },
    output: {
        filename: '[name]_[hash].dll.js',
        path: path.resolve(__dirname, 'dll'),
        library: '[name]_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.resolve(__dirname, 'dll', '[name].manifest.json')
        })
    ]
};

exports.webpackCommonPlugins = [
    new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'dll/reactpackage.manifest.json')
    }),
    new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, 'dll/*.js')
    })
];
