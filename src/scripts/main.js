import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './vendor/ua-parser';
import '@/styles';

import Vue from 'vue';
import store from '@/scripts/store';
import App from '@/components-vue/App/App.vue';

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
      el: '#app',
      store,
      render: h => h(App)
    });
});
