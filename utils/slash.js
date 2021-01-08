'use strict';
const path = require('path');

module.exports = pathParam => {
    const isExtendedLengthPath = /^\\\\\?\\/.test(pathParam);
    const hasNonAscii = /[^\u0000-\u0080]+/.test(pathParam); // eslint-disable-line no-control-regex

    if (isExtendedLengthPath || hasNonAscii || path.sep !== '\\') {
        return pathParam;
    }

    return pathParam.replace(/\\/g, '/');
};
