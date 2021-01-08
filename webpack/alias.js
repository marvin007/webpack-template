const path = require('path');
const {
    paths,
} = require(`${process.cwd()}/config`);

module.exports = () => {
    return {
        '@': path.resolve(process.cwd(), paths.src.base)
    };
};
