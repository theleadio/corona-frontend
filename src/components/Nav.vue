<template>
  <nav class="flex items-center justify-between flex-wrap bg-primary">
    <div class="container flex flex-col md:flex-row font-bold text-white text-lg">
      <div class="block lg:hidden">
        <button id="hamburger" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        @click="showlinks = !showlinks">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div v-for="link in links" v-bind:key="link.name">
          <router-link v-if="showlinks" class="mr-4 hover:text-green-200" :to="{name: link.name}">{{link.display}}</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data: function(){
      return {
          links: [{name: "page.home",display:"Home"},
          {name: "page.causes",display:"Causes"},
          {name: "page.prevention",display:"Prevention"},
          {name: "page.sources",display:"Sources"},
          {name: "page.countries",display:"Countries"}],
          showlinks: true
      }
  }
};
</script>

<style scoped>
</style>
