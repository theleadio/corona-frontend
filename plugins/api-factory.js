import apiFactory from "~/api"

// https://github.com/nuxt-community/axios-module/pull/102

/*
 ** Executed by ~/.nuxt/index.js with context given
 ** This method can be asynchronous
 */

export default ({ $axios }, inject) => {
  // Inject `api` key
  // -> app.$api
  // -> this.$api in vue components
  // -> this.$api in store actions/mutations

  $axios.setHeader("Content-Type", "application/json")
  const api = apiFactory($axios)
  inject("api", api)
}
