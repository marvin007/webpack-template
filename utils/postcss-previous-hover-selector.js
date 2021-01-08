const postcss = require('postcss');

module.exports = postcss.plugin('postcss-previous-hover-selector', (options = {}) => {
    if (!options.selector) return;

    return css => {
        css.walkRules(rule => {
            if (rule.selector.includes(':hover')) {
                let selectors = rule.selector.replace(/\r?\n|\r/g, ' ');
                selectors = selectors.split(',');
                let previousSelector = options.selector.trim();

                selectors = selectors.map(selector => {
                    if (selector.includes(':hover')) {
                        selector = `${previousSelector} ${selector.trim()}`;
                    }

                    return selector;
                });

                rule.selector = selectors.join(',');
            }
        });
    };
});
