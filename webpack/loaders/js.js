const {
    argv,
    modulesToTranspile,
} = require(`${process.cwd()}/config`);

module.exports = () => {
    let js = {
        test: /\.js$/,
        exclude: new RegExp(`node_modules[\\/\\\\](?!(${modulesToTranspile.join('|')})[\\/\\\\])`),
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-private-methods',
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-proposal-optional-chaining'
                    ]
                }
            },
        ]
    };

    if (argv.lintJs || argv.lint) {
        js.use.unshift({
            loader: 'eslint-loader',
            options: {
                fix: argv.fixJs
            }
        });
    }

    return js;
};
