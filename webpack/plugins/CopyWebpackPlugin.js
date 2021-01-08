const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
    paths,
} = require(`${process.cwd()}/config`);

module.exports = () => {
    return new CopyWebpackPlugin([
        {
            from: paths.src.resources,
            ignore: [
                '.*',
                `${path.relative(paths.src.resources, paths.src.sprites)}/**`
            ]
        },
    ]);
};
