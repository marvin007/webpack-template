const env = process.env.NODE_ENV;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    paths,
} = require(`${process.cwd()}/config`);

module.exports = () => {
    return {
        test: /\.(sass|scss|css)$/,
        use: [
            env !== 'production' ?
                'vue-style-loader' :
                MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    sourceMap: true
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'resolve-url-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    prependData: (loaderContext) => {
                        const {resourcePath} = loaderContext;
                        const ext = path.extname(resourcePath);
                        const fileImport = `@import "${paths.src.styles}/utils"`;

                        if (ext === '.sass') {
                            return fileImport;
                        } else if (ext === '.scss') {
                            return `${fileImport};`;
                        }

                        return '';
                    },
                    sourceMap: true
                }
            }
        ]
    };
};
