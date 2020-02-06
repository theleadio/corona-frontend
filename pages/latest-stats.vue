<template>
  <div class="container">
    <table class="table-auto">
      <thead>
      <tr>
        <th class="px-4 py-2">Country</th>
        <th class="px-4 py-2">State</th>
        <th class="px-4 py-2">Confirmed</th>
        <th class="px-4 py-2">Recovered</th>
        <th class="px-4 py-2">Deaths</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(stats, index) in latestStats" :key="stats.nid" :class="index % 2 === 1 ? 'bg-gray-100' : ''">
        <td class="border px-4 py-2">{{ stats.country }}</td>
        <td class="border px-4 py-2">{{ stats.state }}</td>
        <td class="border px-4 py-2">{{ stats.confirmed }}</td>
        <td class="border px-4 py-2">{{ stats.recovered }}</td>
        <td class="border px-4 py-2">{{ stats.deaths }}</td>
      </tr>
      </tbody>
    </table>


  </div>
</template>
<script>
  export default {
    metaInfo: {
      title: 'LatestStats',
    },
    components: {

    },
    mounted() {
      this.loadData();
    },
    methods: {
      async loadData() {
        const result = await this.$api.stats.getLatestStats();
        this.latestStats = result;
      }
    },
    data: function() {
      return {
        latestStats: [],
      }
    },
  };
</script>