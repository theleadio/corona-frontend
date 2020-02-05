<template>
  <div class="app">
    <div class="container py-1">
      <logo class="lg:hidden"/>
    </div>
    <Nav/>
    <nuxt/>
  </div>
</template>
<script>
  import Logo from '~/components/Logo';
  import Nav from '~/components/Nav';

  export default {
    name: 'app',
    metaInfo: {
      title: 'App',
      titleTemplate: '%s | Corona Tracker',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    },
    components: {
      Nav,
      Logo
    }
  }
</script>

<style>
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

<style>
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
</style>
