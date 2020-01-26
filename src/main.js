import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Sticky from 'vue-sticky-directive';
import VueGtm from 'vue-gtm';
import { GTM_ID } from './config';

Vue.config.productionTip = false

Vue.use(require('vue-moment'));
Vue.use(Sticky);
Vue.use(VueGtm, {
  id: GTM_ID, // Your GTM single container ID or array of container ids ['GTM-xxxxxxx', 'GTM-yyyyyyy']
  queryParams: { // Add url query string when load gtm.js with GTM ID (optional)
    // gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
    // gtm_preview:'env-4',
    // gtm_cookies_win:'x'
  },
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  ignoredViews: [] // If router, you can exclude some routes name (case insensitive) (optional)
});

import "./assets/css/main.css";

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
