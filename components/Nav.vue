<template>
  <nav v-sticky class="flex items-center justify-between flex-wrap bg-primary">
    <div class="container flex flex-col lg:flex-row font-bold text-white text-lg">
      <div class="flex justify-between lg:hidden">
        <div class="capitalize">{{ currentPageName }}</div>
        <div>
          <button
              id="hamburger"
              class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white self-end"
              @click="showMobileLinks = !showMobileLinks">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
      </div>
      <div v-for="link in links" v-bind:key="link.name" class="hidden lg:block">
        <nuxt-link class="mr-4 hover:text-green-200" :to="{ name: link.name }">
          {{ link.display }}
        </nuxt-link>
      </div>
      <div v-for="link in links" v-bind:key="'mob-'+link.name" class="lg:hidden">
        <nuxt-link
            v-if="showMobileLinks"
            class="mr-4 hover:text-green-200"
            :to="{ name: link.name }"
            @click.native="showMobileLinks = false"
        >
          {{ link.display }}
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Nav",
    computed: {
      currentPageName: function() {
        const currentLink = this.links.find(link => link.name === this.$route.name);
        return currentLink && currentLink.display || '';
      }
    },
    data: function() {
      return {
        links: [
          {name: "index", display: "Home"},
          {name: "causes", display: "What is 2019-nCov"},
          {name: "prevention", display: "Prevention"},
          {name: "sources", display: "Sources"},
          {name: "analytics", display: "Analytics"},
          {name: "about", display: "About"}
        ],
        showMobileLinks: false,
      }
    }
  };
</script>

<style>
  .top-sticky {
    box-shadow: 0 -4px 6px 6px #5a5a5a;
  }
</style>
