const path = require('path');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const {
    paths,
} = require(`${process.cwd()}/config`);

module.exports = () => {
    return new SVGSpritemapPlugin(`${paths.src.sprites}/**/*.svg`, {
        output: {
            filename: `${path.relative(paths.build.base, paths.build.img)}/sprites.svg`,
            svg: {
                sizes: false
            },
            svgo: true
        },
        sprite: {
            generate: {
                use: true,
                view: '-fragment',
                symbol: true,
                title: false
            },
        },
        styles: {
            format: 'fragment',
            filename: path.resolve(process.cwd(), `${paths.src.styles}/spritemap.scss`),
            variables: {
                sprites: 'spritemap-paths',
                sizes: 'spritemap-sizes',
                variables: 'spritemap-variables',
                mixin: 'spritemap-mixin'
            }
        }
    });
};
