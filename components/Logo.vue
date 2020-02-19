<template>
  <div class="flex items-center cursor-pointer" @click="goHome">
    <img :src="logo" class="h-12 w-auto mr-3" alt="logo"/>
    <div class="text-2xl font-bold text-black">Corona<span class="text-red-600">Tracker</span></div>
  </div>
</template>

<script>
  import logo from '~/assets/image/logo.png';

  export default {
    name: 'Logo',
    data() {
      return {
        logo
      };
    },
    methods: {
      goHome: function() {
        if (this.$route.name !== 'index') {
          this.$router.push(this.localePath('index'));
        }
      }
    }
  }
</script>

<style scoped>
</style>
