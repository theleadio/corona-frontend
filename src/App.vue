<template>
  <div id="app">
     <div class="container">
      <Logo />
    </div>
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Logo from "./components/Logo"
import Nav from "./components/Nav"

export default {
  name: 'app',
  components:{
    Nav,
    Logo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
