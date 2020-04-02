<template>
  <div class="max-w-full rounded border border-gray-400 bg-white p-3 h-full relative">

    <Share :url="shareUrl + '?referrer=today'" class="mr-3 mt-3"></Share>

    <p class="text-xl font-bold pl-2">
      <Flag :country-code="country.code"></Flag>
      {{country.name}} {{ $t('overview') }}
      </p>
    <div class="flex flex-row lg:flex-row pt-3 justify-around sm:justify-around md:justify-around lg:justify-around">
      <div class="px-2 text-center">
        <p class="text-2xl font-bold text-red-600">{{ info.confirmed | formatNumber }}</p>
        <p class="text-l font-bold text-gray-600">{{ $t('confirmed') }}</p>
        <p class="text-xs font-bold text-red-600">{{ $t('increase_new_cases', { number: $options.filters.formatNumber(info.diffConfirmed) }) }}</p>
      </div>

      <div class="px-2 text-center">
        <p class="text-2xl font-bold text-green-600">{{ info.recovered | formatNumber }}</p>
        <p class="text-l font-bold text-gray-600">{{ $t('recovered') }}</p>
        <!-- <p class="text-xs font-bold text-green-600">{{ $t('increase_since_yesterday', { number: $options.filters.formatNumber(info.diffRecovered) }) }}</p> -->
      </div>

      <div class="px-2 text-center">
        <p class="text-2xl font-bold text-gray-600">{{ info.deaths | formatNumber }}</p>
        <p class="text-l font-bold text-gray-600">{{ $t('deaths') }}</p>
        <p class="text-xs font-bold text-gray-600">{{ $t('increase_new_deaths', { number: $options.filters.formatNumber(info.diffDeaths) }) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Flag from "~/components/Flag"
import Share from '~/components/Share';

export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
    country: {
      type: Object,
      required: true
    }
  },
  computed: {
    shareUrl() {
      return process.browser ? window.location.href : 'https://www.coronatracker.com';
    }
  },
  components: {
    Flag,
    Share
  }
}
</script>

<style scoped>
</style>
