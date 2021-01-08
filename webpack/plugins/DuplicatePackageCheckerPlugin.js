const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = () => {
    return new DuplicatePackageCheckerPlugin();
};
