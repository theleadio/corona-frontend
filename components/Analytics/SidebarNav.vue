<template>
  <div class="w-full lg:w-1/6 bg-white relative lg:min-h-screen px-5 py-3">
    <div class="xl:py-2">
      <p class="text-xl font-bold">2019-nCoV {{ $t('Reports') }}</p>

      <div v-for="link in links" :key="link.name" class="hidden lg:block pt-3">
        <nuxt-link :to="{ name: link.name }">
          <i :class="'fa fa-' + link.icon" class="mr-2"></i>
          {{ $t(link.display) }}
        </nuxt-link>
      </div>

      <div v-for="link in links" :key="'mob-'+link.name" class="lg:hidden pt-3">
        <nuxt-link :to="{ name: link.name }">
          <i :class="'fa fa-' + link.icon" class="mr-2"></i>
          {{ $t(link.display) }}
        </nuxt-link>
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
        { name: 'analytics', display: 'Overview', icon: 'columns' },
        // { name: 'analytics-virus-comparison', display: 'Virus Comparison', icon: 'search' },
        // { name: 'analytics-advanced-analysis', display: 'Advanced Analysis', icon: 'chart-line' },
        // { name: 'analytics-predictive-analysis', display: 'Predictive', icon: 'expand-alt' },
        // { name: 'analytics-travel-path', display: 'Travel Path', icon: 'route' },
      ],

      showLinksMobile: false,
    }
  }
}
</script>
