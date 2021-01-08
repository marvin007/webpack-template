const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    paths,
} = require(`${process.cwd()}/config`);
const slash = require(`${process.cwd()}/utils/slash`);

module.exports = () => {
    return new MiniCssExtractPlugin({
        filename: slash(path.relative(paths.build.base, `${paths.build.css}/[name].[contenthash].css`)),
    });
};
