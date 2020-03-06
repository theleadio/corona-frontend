<template>
  <div class="app">
    <div class="container py-1"></div>
    <Nav/>
    <nuxt/>
  </div>
</template>
<script>
  import Nav from '~/components/Nav';
  import { addBackToTop } from 'vanilla-back-to-top';

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
      Nav
    },
    mounted() {
      addBackToTop({
        backgroundColor: 'rgba(16, 136, 133, .8)',
        cornerOffset: 16, // px
        diameter: 56, // px
        // ease: inOutSine, // any one from https://www.npmjs.com/package/ease-component will do
        id: 'back-to-top',
        innerHTML: '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>',
        onClickScrollTo: 0, // px
        scrollContainer: document.body, // or a DOM element, e.g., document.getElementById('content')
        scrollDuration: 100, // ms
        showWhenScrollTopIs: 1, // px
        // size: diameter, // alias for diameter
        textColor: '#fff',
        zIndex: 1
      });

      if (document && document.referrer && document.referrer.indexOf("trackcorona.net") !== -1) {
        window.location = "https://www.youtube.com/watch?v=ZwyPhcqdmPU";
      }
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
