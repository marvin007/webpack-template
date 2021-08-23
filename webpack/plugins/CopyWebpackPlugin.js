const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
    paths,
} = require(`${process.cwd()}/config`);
const slash = require(`${process.cwd()}/utils/slash`);

module.exports = () => {
    return new CopyWebpackPlugin([
        {
            from: paths.src.resources,
            ignore: [
                '.*',
                `${slash(path.relative(paths.src.resources, paths.src.sprites))}/**`
            ]
        },
    ]);
};
