<template>
  <nav v-sticky class="flex items-center flex-wrap bg-white text-primary">
    <div class="container flex flex-col flex-wrap items-center font-bold text-lg">
      <div class="w-full flex items-center justify-between">
        <logo class="lg:flex"/>
        <div class="flex">
          <div v-for="link in links" v-bind:key="link.name" class="hidden lg:block">
            <nuxt-link class="mx-1 px-3 py-4 nav-link"
                       :to="{ name: link.name }">
              {{ link.display }}
            </nuxt-link>
          </div>
        </div>
        <!--div class="capitalize">{{ currentPageName }}</div-->
        <button
          id="hamburger"
          class="lg:hidden flex self-center items-center px-3 py-2 border rounded text-primary border-primary 
          hover:text-red-600 hover:border-red-600 self-end"
          @click="showMobileLinks = !showMobileLinks">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>

      <div v-for="link in links" v-bind:key="'mob-'+link.name" class="lg:hidden">
        <nuxt-link
          v-if="showMobileLinks"
          class="py-2 block hover:text-red-600"
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
  import Logo from '../components/Logo';

  export default {
    name: "Nav",
    components: {
      Logo
    },
    computed: {
      currentPageName: function() {
        const currentLink = this.links.find(link => link.name === this.$route.name);
        return currentLink && currentLink.display || '';
      }
    },
    data: function() {
      return {
        links: [
          { name: "index", display: "Home" },
          { name: "causes", display: "What is 2019-nCov" },
          { name: "prevention", display: "Prevention" },
          { name: "sources", display: "Sources" },
          { name: "analytics", display: "Analytics" },
          { name: "about", display: "About" }
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

  .nav-link {
    position: relative;
    transition: all ease-in-out .2s;
  }

  .nav-link:hover {
    text-shadow: 0 0 1px #108885;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #108885;
    transform: scale(0);
    transform-origin: 50% 50%;
    transition: all ease-in-out .2s;
  }

  .nuxt-link-exact-active::after,
  .nav-link:hover::after {
    transform: scale(1);
  }
</style>
