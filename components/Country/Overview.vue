<template>
  <div class="max-w-full rounded border border-gray-400 bg-white p-3">
    <p class="text-xl font-bold pl-2">{{ $t('Overview') }}</p>
    <div class="flex flex-col lg:flex-row">
      <div class="px-5 text-center">
        <p class="text-4xl font-bold text-red-600">{{ info.confirmed | formatNumber }}</p>
        <p class="text-xl font-bold text-gray-600">{{ $t('Confirmed') }}</p>
        <p class="text-xs font-bold text-red-600">{{ $t('+{number} since yesterday', { number: info.diffConfirmed | formatNumber }) }}</p>
      </div>

      <div class="px-5 text-center">
        <p class="text-4xl font-bold text-green-600">{{ info.recovered | formatNumber }}</p>
        <p class="text-xl font-bold text-gray-600">{{ $t('Recovered') }}</p>
        <p class="text-xs font-bold text-green-600">{{ $t('+{number} since yesterday', { number: info.diffRecovered | formatNumber }) }}</p>
      </div>

      <div class="px-5 text-center">
        <p class="text-4xl font-bold text-gray-600">{{ info.deaths | formatNumber }}</p>
        <p class="text-xl font-bold text-gray-600">{{ $t('Deaths') }}</p>
        <p class="text-xs font-bold text-gray-600">{{ $t('+{number} since yesterday', { number: info.diffDeaths | formatNumber }) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
</style>
