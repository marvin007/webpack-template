const jadeGetData = require('jade-get-data');
const {
    paths,
} = require(`${process.cwd()}/config`);

module.exports = () => {
    return {
        test: /\.pug$/,
        oneOf: [
            {
                resourceQuery: /^\?vue/,
                use: ['pug-plain-loader']
            },
            {
                use: [
                    'raw-loader',
                    {
                        loader: 'pug-plain-loader',
                        options: {
                            data: {
                                getData: jadeGetData(paths.src.data)
                            }
                        }
                    }
                ]
            }
        ]
    };
};
