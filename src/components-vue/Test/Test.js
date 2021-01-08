import lazyload from '@/scripts/directives/lazyload';
import img from './images/img.jpg';
import { breakpoints, mqDown } from '@/scripts/utils/media-queries';

export default {
    components: {},
    directives: {
        lazyload
    },
    filters: {},
    mixins: [],
    props: [],
    data() {
        return {
            title: 'Тестовый компонент',
            breakpoints: breakpoints,
            mobileMql: mqDown('sm', true),
            isMobile: false,
            img,
            errors: [],
        }
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.checkMq();
    },
    beforeUpdate() {},
    updated() {},
    activated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {
        checkMq() {
            window.addEventListener('resize', () => {
                this.isMobile = this.mobileMql.matches;
            });
        }
    }
}
