const path = require('path');
const {
    paths,
} = require(`${process.cwd()}/config`);
const slash = require(`${process.cwd()}/utils/slash`);

module.exports = () => {
    return {
        test: /\.svg$/,
        loader: 'file-loader',
        exclude: path.resolve(process.cwd(), paths.src.resources),
        options: {
            name(file) {
                let fileFolder;

                if (/fonts?/g.test(path.relative(process.cwd(), file))) {
                    fileFolder = paths.build.fonts;
                } else {
                    fileFolder = paths.build.img;
                }

                return slash(path.relative(paths.build.base, `${fileFolder}/[name].[hash:7].[ext]`));
            }
        }
    };
};
