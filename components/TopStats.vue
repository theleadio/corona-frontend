<template>
  <div>
    <Card title="COUNTRIES AFFECTED"></Card>
    <div class="my-2 font-bold text-xs text-gray-500 leading-tight">
      Source: WHO, CDC, ECDC, NHC of the PRC, JHU CSSE, DXY, QQ, and various international media
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
      <tr v-for="item in items" :key="item.countryCode">
        <td class="bg-gray-200 text-xs border px-2 py-2">
          <Flag :country-code="item.countryCode"></Flag>
          {{item.countryName}}<a v-if="item.countryName === 'Others'" href="#notes-on-others">*</a>
        </td>
        <td class="text-center border px-1 py-2">{{item.confirmed | formatNumber}}</td>
        <td class="text-center border px-1 py-2">{{item.recovered | formatNumber}}</td>
        <td class="text-center border px-1 py-2">{{item.deaths | formatNumber}}</td>
      </tr>
      </tbody>
    </table>
    <div class="my-2 font-bold text-xs text-gray-600 leading-tight">
      * Cases identified on a cruise ship currently in Japanese territorial waters.
      <a name="notes-on-others" class="anchor"></a>
    </div>
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
      this.items = await this.$api.stats.getTopStats(this.limit)
    }
  }
</script>

<style scoped>
  a.anchor {
    display: block;
    position: relative;
    top: -100px;
    visibility: hidden;
  }
</style>
