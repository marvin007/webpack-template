const path = require('path');
const {
    paths,
} = require(`${process.cwd()}/config`);
const slash = require(`${process.cwd()}/utils/slash`);

module.exports = () => {
    return {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
        exclude: path.resolve(process.cwd(), paths.src.resources),
        options: {
            name: slash(path.relative(paths.build.base, `${paths.build.img}/[name].[hash:7].[ext]`))
        }
    };
};
