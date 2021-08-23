export default function(el, options = {}) {
    options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
        showAfterLoading: true,
        onLoad: null,
        ...options
    };

    const src = el.dataset.src;
    const srcset = el.dataset.srcset;

    function loadImage() {
        if (options.showAfterLoading) {
            let img = new Image();

            img.addEventListener('load', () => {
                setAttrs(el);

                window.requestAnimationFrame(() => {
                    removeAttrs(el);
                    el.classList.add('lazyload--loaded');
                    img = null;
                    if (typeof options.onLoad === 'function') options.onLoad(el);
                });
            });

            setImgAttrs(img);
        } else {
            setAttrs(el);
            removeAttrs(el);
        }
    }

    function setAttrs(el) {
        if (el.tagName.toLowerCase() === 'img') {
            setImgAttrs(el);
        } else {
            setElAttrs(el);
        }
    }

    function setImgAttrs(el) {
        if (src) el.src = src;
        if (srcset) el.srcset = srcset;
    }

    function setElAttrs(el) {
        if (src) el.style.backgroundImage = `url('${src}')`;
    }

    function removeAttrs(el) {
        el.removeAttribute('data-src');
        el.removeAttribute('data-srcset');
    }

    function observerCallback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage();
                observer.unobserve(el);
            }
        });
    }

    function createIntersectionObserver() {
        const config = {
            root: options.root,
            rootMargin: options.rootMargin,
            threshold: options.threshold
        };

        const observer = new IntersectionObserver(observerCallback, config);
        observer.observe(el);
    }

    if (!window['IntersectionObserver']) {
        loadImage();
    } else {
        createIntersectionObserver();
    }
}
