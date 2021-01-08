const path = require('path');
const globby = require('globby');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    paths,
} = require(`${process.cwd()}/config`);

module.exports = () => {
    return globby.sync(`${paths.src.pages}/**.pug`).map(page => new HtmlWebpackPlugin({
        template: page,
        filename: `${path.basename(page).replace(/\.pug/, '.html')}`
    }));
};
