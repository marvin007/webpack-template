import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './vendor/ua-parser';
import '@/styles';

import Vue from 'vue';
import store from '@/scripts/store';
import Test from '@/components-vue/Test/Test.vue';

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
      el: '#app',
      store,
      render: h => h(Test)
    });
});
