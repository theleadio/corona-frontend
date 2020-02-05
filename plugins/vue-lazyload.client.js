import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import LazyLoadSpinner from '~/assets/image/lazy-load-spinner.gif';

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: LazyLoadSpinner,
  loading: LazyLoadSpinner,
  attempt: 1,
  lazyComponent: true
})