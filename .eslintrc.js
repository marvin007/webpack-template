module.exports = {
    env: {
        browser: true,
    },
    parser: 'babel-eslint',
    extends: [
        'airbnb-base',
    ],
    rules: {
        'import/prefer-default-export': 0,
        'indent': ['error', 4],
    },
};
