const env = process.env.NODE_ENV;
const path = require('path');
const {
    paths,
} = require('./config');

// parts
const alias = require('./webpack/alias');

// loaders
const js = require('./webpack/loaders/js');
const vue = require('./webpack/loaders/vue');
const styles = require('./webpack/loaders/styles');
const pug = require('./webpack/loaders/pug');
const img = require('./webpack/loaders/files/images');
const fonts = require('./webpack/loaders/files/fonts');
const media = require('./webpack/loaders/files/media');
const svg = require('./webpack/loaders/files/svg');
const staticFiles = require('./webpack/loaders/files/static');

// plugins
const CleanWebpackPlugin = require('./webpack/plugins/CleanWebpackPlugin');
const ProvidePlugin = require('./webpack/plugins/ProvidePlugin');
const VueLoaderPlugin = require('./webpack/plugins/VueLoaderPlugin');
const HtmlWebpackPlugin = require('./webpack/plugins/HtmlWebpackPlugin');
const SVGSpritemapPlugin = require('./webpack/plugins/SVGSpritemapPlugin');
const CopyWebpackPlugin = require('./webpack/plugins/CopyWebpackPlugin');

module.exports = {
    mode: env,
    entry: {
        main: [
            `${paths.src.scripts}/main.js`,
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(process.cwd(), paths.build.base),
    },
    resolve: {
        alias: alias()
    },
    module: {
        rules: [
            js(),
            vue(),
            styles(),
            pug(),
            img(),
            fonts(),
            media(),
            svg(),
            staticFiles(),
        ],
    },
    plugins: [
        CleanWebpackPlugin(),
        ProvidePlugin(),
        VueLoaderPlugin(),
        ...HtmlWebpackPlugin(),
        SVGSpritemapPlugin(),
        CopyWebpackPlugin(),
    ],
};
