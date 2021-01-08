const env = process.env.NODE_ENV;
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const {
    argv,
} = require('./config');

const HotModuleReplacementPlugin = require('./webpack/plugins/HotModuleReplacementPlugin');
const ReloadHtmlPlugin = require('./webpack/plugins/ReloadHtmlPlugin');

module.exports = merge(baseWebpackConfig, {
    mode: env,
    devServer: {
        before(app, server) {
            global.devServer = server;
        },
        open: true,
        hot: true,
        port: argv.port,
        compress: true,
        historyApiFallback: true,
        overlay: true,
        stats: {
            colors: true
        }
    },
    plugins: [
        HotModuleReplacementPlugin(),
        ReloadHtmlPlugin(),
    ],
    devtool: 'cheap-module-eval-source-map',
});
