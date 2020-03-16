<template>
  <div class="max-w-full rounded shadow-md bg-white p-3 mb-5">
    <p class="text-xl font-bold pl-2">Overview</p>
    <div class="flex flex-col lg:flex-row">
      <div class="px-5 text-center">
        <p class="text-4xl font-bold text-red-600">{{ info.confirmed | formatNumber }}</p>
        <p class="text-xl font-bold text-gray-600">{{ $t('Confirmed') }}</p>
        <p class="text-xs font-bold text-red-600">+{{ info.diffConfirmed | formatNumber }} since yesterday</p>
      </div>

      <div class="px-5 text-center">
        <p class="text-4xl font-bold text-green-600">{{ info.recovered | formatNumber }}</p>
        <p class="text-xl font-bold text-gray-600">{{ $t('Recovered') }}</p>
        <p class="text-xs font-bold text-green-600">+{{ info.diffRecovered | formatNumber }} since yesterday</p>
      </div>

      <div class="px-5 text-center">
        <p class="text-4xl font-bold text-gray-600">{{ info.deaths | formatNumber }}</p>
        <p class="text-xl font-bold text-gray-600">{{ $t('Deaths') }}</p>
        <p class="text-xs font-bold text-gray-600">+{{ info.diffDeaths | formatNumber }} since yesterday</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"]
}
</script>

<style scoped>
</style>
