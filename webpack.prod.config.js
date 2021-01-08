const env = process.env.NODE_ENV;
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const {
    paths,
} = require('./config');
const slash = require('./utils/slash');

const DuplicatePackageCheckerPlugin = require('./webpack/plugins/DuplicatePackageCheckerPlugin');
const HashedModuleIdsPlugin = require('./webpack/plugins/HashedModuleIdsPlugin');
const ImageminPlugin = require('./webpack/plugins/ImageminPlugin');
const MiniCssExtractPlugin = require('./webpack/plugins/MiniCssExtractPlugin');
const PostCompilePlugin = require('./webpack/plugins/PostCompilePlugin');
const TerserPlugin = require('./webpack/plugins/TerserPlugin');

module.exports = merge(baseWebpackConfig, {
    mode: env,
    output: {
        filename: slash(path.relative(paths.build.base, `${paths.build.js}/[name].[chunkhash].js`)),
    },
    plugins: [
        DuplicatePackageCheckerPlugin(),
        HashedModuleIdsPlugin(),
        ImageminPlugin(),
        MiniCssExtractPlugin(),
        PostCompilePlugin(),
    ],
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
            TerserPlugin(),
        ]
    },
    devtool: false,
});
