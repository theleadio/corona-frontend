<template>
  <div id="app">
     <div class="container">
      <Logo />
    </div>
    <Nav />
    <router-view />
    <back-to-top bottom="16px" right="16px">
      <button type="button" class="btn btn-info btn-to-top">
        <svg width="24" height="24" viewBox="0 -256 1792 1792">
          <g transform="matrix(1,0,0,-1,68.338983,1217.0847)">
            <path d="m 1611,320 q 0,-53 -37,-90 l -75,-75 q -38,-38 -91,-38 -54,0 -90,38 L 832,640 346,155 q -36,-38 -90,-38 -54,0 -90,38 l -75,75 q -38,36 -38,90 0,53 38,91 l 651,651 q 37,37 90,37 52,0 91,-37 l 650,-651 q 38,-38 38,-91 z" style="fill:#fff" />
          </g>
        </svg>
      </button>
    </back-to-top>
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop';
import Logo from "./components/Logo"
import Nav from "./components/Nav"

export default {
  name: 'app',
  components:{
    BackToTop,
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

.btn-to-top {
  background-color: rgba(16, 136, 133, .8);
  width: 48px;
  height: 48px;
  padding: 12px 12px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
}
</style>
