const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => {
    return new TerserPlugin({
        terserOptions: {
            compress: {
                drop_console: true,
            },
            output: {
                comments: false,
            },
            extractComments: 'all',
        },
        cache: true,
        parallel: true,
        sourceMap: true,
    });
};
