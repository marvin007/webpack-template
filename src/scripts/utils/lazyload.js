export default function(el, options = {}) {
    options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
        onLoad: null,
        ...options
    };

    let src = el.dataset.src;
    let srcset = el.dataset.srcset;

    function loadImage() {
        let img = new Image();

        img.addEventListener('load', () => {
            setAttrs(el);

            window.requestAnimationFrame(() => {
                el.removeAttribute('data-src');
                el.removeAttribute('data-srcset');
                el.classList.add('lazyload--loaded');
                img = null;
                if (typeof options.onLoad === 'function') onLoad(el);
            });
        });

        setImgAttrs(img);
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
        el.style.backgroundImage = `url('${src || srcset}')`;
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
        let config = {
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
