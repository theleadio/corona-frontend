<template>
  <div class="flex items-center py-3 cursor-pointer" @click="goHome">
    <img :src="logo" class="h-16 w-auto mr-4" alt="logo"/>
    <div class="text-3xl font-bold">Corona<span class="text-red-600">Tracker</span></div>
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
          this.$router.push({ name: 'index' });
        }
      }
    }
  }
</script>

<style scoped>
</style>
