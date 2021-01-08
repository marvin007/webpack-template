const {execSync} = require('child_process');

module.exports = () => {
    class PostCompilePlugin {
        constructor(options = {}) {
            this.options = options;
        }

        apply(compiler) {
            const plugin = {name: 'PostCompilePlugin'};

            compiler.hooks.done.tap(plugin, () => {
                execSync('npm run beautify');
            });
        }
    }

    return new PostCompilePlugin();
};
