<template>
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/5 bg-white shadow-md">
      <div class="relative h-full min-h-screen pl-6">
        <div class="xl:py-2">
          <p class="text-2xl font-bold">2019-nCoV Reports</p>
        </div>
      </div>
    </div>

    <div class="w-full md:w-4/5 px-5 pt-2 bg-gray-200">
      <div class="pl-2">
        <p class="text-2xl font-bold">2019-nCoV Overview</p>
      </div>

      <div class="flex flex-wrap">
        <div class="w-1/2 px-2">
          <div class="max-w-full rounded shadow-md bg-white p-4">
            <div class="flex flex-row">
              <div class="px-4">
                <p class="text-sm font-bold text-red-700">Total Confirmed Cases</p>
                <p class="text-5xl font-bold text-red-700">{{ totalConfirmed.toLocaleString() }}</p>
              </div>

              <div class="px-4">
                <p class="text-sm font-bold text-green-600">Total Mortality</p>
                <p class="text-5xl font-bold text-green-600">{{ totalMortality.toLocaleString() }}</p>
              </div>

              <div class="px-4">
                <p class="text-sm font-bold text-green-600">Total Recovered</p>
                <p class="text-5xl font-bold text-green-600">{{ totalRecovered.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="w-1/2 px-2">
          Hello world
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStats } from '@/api/stats'

export default {
  mounted () {
    this.loadStats()
  },

  data () {
    return {
      totalConfirmed: 0,
      totalMortality: 0,
      totalRecovered: 0,
    }
  },

  metaInfo: {
    title: 'Analytics',
  },

  methods: {
    loadStats () {
      getStats('')
        .then(data => {
          this.totalConfirmed = data.num_confirm
          this.totalMortality = data.num_dead
          this.totalRecovered = data.num_heal
        })
    }
  }
}
</script>
