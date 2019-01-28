import ExposePlugin from '../src/index';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { webpackCommonPlugins } from './webpack.dll';
import path from 'path';

export default {
    entry: path.join(__dirname, 'index.js'),
    mode: 'production',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: './'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new ExposePlugin({
            React: require.resolve('react'),
            ReactDOM: require.resolve('react-dom')
        }),
        new HtmlWebpackPlugin({
            title: 'webpack expose plugin',
            chunks: ['main', 'vendor'],
            filename: `index.html`,
            template: 'test/layout.html',
            inject: true
        }),
        ...webpackCommonPlugins
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'all'
        }
    }
};
