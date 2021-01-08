const element = document.documentElement;
const detectedClass = 'mousedetected';

document.addEventListener('mousemove', function() {
    element.classList.add(detectedClass);
}, true);

document.addEventListener('touchstart', function() {
    element.classList.remove(detectedClass);
}, true);
