<template>
  <div>
    <Card title="COUNTRIES AFFECTED"></Card>
    <div class="my-2 font-bold text-xs text-gray-500 leading-tight">
      Source: National Health Commission of People's Republic of China and various international
      medias
    </div>
    <table class="table-auto w-full">
      <thead class="text-xs leading-tight border-b-2">
      <tr>
        <th class="border px-2 py-2">Country</th>
        <th class="border px-1 py-2">Confirmed</th>
        <th class="border px-1 py-2">Recovered</th>
        <th class="border px-1 py-2">Deaths</th>
      </tr>
      </thead>
      <tbody class="font-bold">
      <tr v-for="item in items" :key="item.country">
        <td class="bg-gray-200 text-xs border px-2 py-2">
          <Flag :country-name="item.country"></Flag>
          {{item.country}}
        </td>
        <td class="text-center border px-1 py-2">{{item.num_confirm | formatNumber}}</td>
        <td class="text-center border px-1 py-2">{{item.num_heal | formatNumber}}</td>
        <td class="text-center border px-1 py-2">{{item.num_dead | formatNumber}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Card from '~/components/Card';
  import Flag from '~/components/Flag';

  export default {
    name: "TopStats",
    components: {
      Card,
      Flag,
    },
    data() {
      return {
        limit: 15,
        items: [],
      }
    },
    async created() {
      const data = await this.$api.stats.getTopStats(this.limit)
      this.items = data
        .filter(a => a.country !== 'Others')
        .map(a => {
          if (a.country === 'Mainland China') {
            a.country = 'China';
          }

          return a;
        });
    }
  }
</script>

<style scoped>

</style>
