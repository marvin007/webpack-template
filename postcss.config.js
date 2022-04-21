const env = process.env.NODE_ENV;
let postcssConfig = {
    plugins: []
};

if (env === 'production') {
    postcssConfig.plugins.push(
        require('cssnano')({
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
            }],
        })
    );
}

postcssConfig.plugins.push(
    require('autoprefixer'),
    require('./utils/postcss-previous-hover-selector')({
        selector: '.mousedetected'
    })
);

module.exports = postcssConfig;
