import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Sticky from 'vue-sticky-directive';
import VueGtag from "vue-gtag";
import VueMeta from 'vue-meta'
import VueLazyload from 'vue-lazyload';
import { GTM_ID } from './config';
import LazyLoadSpinner from '../public/lazy-load-spinner.gif';

Vue.config.productionTip = false

Vue.use(require('vue-moment'));
Vue.use(Sticky);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});
Vue.use(VueGtag, {
  config: { id: GTM_ID }
}, router);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: LazyLoadSpinner,
  loading: LazyLoadSpinner,
  attempt: 1
})

import "./assets/css/main.css";

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
