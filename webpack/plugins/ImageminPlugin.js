const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminGifsicle = require('imagemin-gifsicle');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminSvgo = require('imagemin-svgo');

module.exports = () => {
    return new ImageminPlugin({
        plugins: [
            imageminGifsicle({
                interlaced: true,
            }),
            imageminPngquant({
                quality: [0.85, 0.9],
                strip: true,
            }),
            imageminMozjpeg({
                quality: 85,
                progressive: true
            }),
            imageminSvgo({
                plugins: [
                    {
                        removeViewBox: false,
                    }
                ]
            }),
        ]
    });
};
