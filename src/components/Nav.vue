<template>
  <nav class="flex items-center justify-between flex-wrap bg-primary">
    <div class="container flex flex-col md:flex-row font-bold text-white text-lg">
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <router-link class="mr-4 hover:text-green-200" :to="{name: 'page.home'}">Home</router-link>
      <router-link class="mr-4 hover:text-green-200" :to="{ name: 'page.causes' }">Causes</router-link>
      <router-link class="mr-4 hover:text-green-200" :to="{ name: 'page.prevention' }">Prevention</router-link>
      <router-link class="mr-4 hover:text-green-200" :to="{ name: 'page.sources' }">Sources</router-link>
      <router-link class="mr-4 hover:text-green-200" :to="{ name: 'page.countries' }">Countries</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style scoped>
</style>
