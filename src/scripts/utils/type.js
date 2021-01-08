export default function type(value) {
    return Object.prototype.toString.call(value).match(/^\[object (\S+?)]$/)[1] || 'undefined';
}
