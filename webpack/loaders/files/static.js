const path = require('path');
const {
    paths,
} = require(`${process.cwd()}/config`);
const slash = require(`${process.cwd()}/utils/slash`);

module.exports = () => {
    return {
        test: /\.*$/,
        loader: 'file-loader',
        include: path.resolve(process.cwd(), paths.src.resources),
        options: {
            emitFile: false,
            name(file) {
                return slash(path.relative(paths.src.resources, file));
            }
        }
    };
};
