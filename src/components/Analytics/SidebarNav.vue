<template>
  <div class="w-full h-56 lg:h-full lg:w-1/5 bg-white shadow-md">
    <div class="relative h-full min-h-screen pl-6">
      <div class="xl:py-2">
        <p class="text-2xl font-bold">2019-nCoV Reports</p>

        <div v-for="link in links" :key="link.name" class="hidden lg:block pt-3">
          <router-link :to="{ name: link.name }">
            <i :class="'fa fa-' + link.icon" class="mr-2"></i>
            {{ link.display }}
          </router-link>
        </div>

        <div v-for="link in links" :key="'mob-'+link.name" class="lg:hidden pt-3">
          <router-link :to="{ name: link.name }">
            <i :class="'fa fa-' + link.icon" class="mr-2"></i>
            {{ link.display }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentPage: function () {
      return this.$route.name.replace('page.', '')
    }
  },

  data () {
    return {
      links: [
        { name: 'page.analytics', display: 'Overview', icon: 'columns' },
        { name: 'page.analytics.virus_comparison', display: 'Virus Comparison', icon: 'search' },
        { name: 'page.analytics.advanced_analysis', display: 'Advanced Analysis', icon: 'chart-line' },
        { name: 'page.analytics.predictive', display: 'Predictive', icon: 'expand-alt' },
        { name: 'page.analytics.travel_path', display: 'Travel Path', icon: 'route' },
      ],

      showLinksMobile: false,
    }
  }
}
</script>
