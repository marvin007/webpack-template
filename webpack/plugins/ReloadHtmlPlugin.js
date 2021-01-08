// alternative variant
// https://github.com/webpack/webpack-dev-server/issues/1271#issuecomment-523439485

// devServer: {
// 	before(app, server) {
// 		server._watch(`${paths.src.templates}/*/**.pug`);
// 	}
// }

module.exports = () => {
    class ReloadHtmlPlugin {
        constructor(options = {}) {
            this.options = options;
        }

        apply(compiler) {
            const plugin = {name: 'ReloadHtmlPlugin'};
            const cache = {};

            compiler.hooks.compilation.tap(plugin, compilation => {
                compilation.hooks.htmlWebpackPluginAfterEmit.tap(plugin, data => {
                    const orig = cache[data.outputName];
                    const html = data.html.source();

                    if (orig && orig !== html) {
                        global.devServer.sockWrite(global.devServer.sockets, 'content-changed')
                    }

                    cache[data.outputName] = html;
                });
            });
        }
    }

    return new ReloadHtmlPlugin();
};
