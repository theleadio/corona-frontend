import Vue from "vue"
import VueLazyload from "vue-lazyload"
import LazyLoadSpinner from "~/assets/image/lazy-load-spinner.gif"
import LazyLoadError from "~/assets/image/lazy-load-error.png"

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: LazyLoadError,
  loading: LazyLoadSpinner,
  attempt: 1,
  lazyComponent: true
})
