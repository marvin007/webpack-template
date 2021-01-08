export default function declensionOfNoun(count, one = '', two = '', five = '') {
    count = Math.abs(count) % 100;

    if (count >= 5 && count <= 20) {
        return five;
    }

    count %= 10;

    if (count === 1) {
        return one;
    }

    if (count >= 2 && count <= 4) {
        return two;
    }

    return five;
}
