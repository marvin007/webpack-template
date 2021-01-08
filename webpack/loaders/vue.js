module.exports = () => {
    return {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
    };
};
