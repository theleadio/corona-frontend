import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Sticky from 'vue-sticky-directive';
import VueGtag from "vue-gtag";
import VueMeta from 'vue-meta'
import { GTM_ID } from './config';

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

import "./assets/css/main.css";
import "flag-icon-css/css/flag-icon.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
