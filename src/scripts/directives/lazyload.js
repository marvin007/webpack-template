import lazyload from '../utils/lazyload';

export default {
    bind: (el, binding) => {
        lazyload(el, {
            showAfterLoading: binding.modifiers.after
        });
    }
}
