<template>
  <div>
    <Card v-if="showTitle" :title="$t('Countries Affected')"></Card>
    <div class="my-2 font-bold text-xs text-gray-500 leading-tight">
      {{ $t('Source') }}: WHO, CDC, ECDC, NHC of the PRC, JHU CSSE, DXY, QQ, {{ $t('and various international media') }}
    </div>
    <table class="table-auto w-full">
      <thead class="text-xs leading-tight border-b-2">
      <tr>
        <th class="border px-2 py-2">{{ $t('Country') }}</th>
        <th class="border px-1 py-2">{{ $t('Confirmed') }}</th>
        <th class="border px-1 py-2">{{ $t('Recovered') }}</th>
        <th class="border px-1 py-2">{{ $t('Deaths') }}</th>
      </tr>
      </thead>
      <tbody class="font-bold">
      <tr v-for="item in items" :key="item.countryCode">
        <td class="bg-gray-200 text-xs border hover:bg-primary hover:text-white px-2 py-2">
          <span v-if="item.countryName === 'Others'">{{item.countryName}}</span>
          <nuxt-link :to="`/country/${item.countryCode.toLowerCase()}`" style="display:block" v-else>
            <Flag :country-code="item.countryCode"></Flag>
            {{item.countryName}}
          </nuxt-link>
          <a v-if="item.countryName === 'Others'" href="#notes-on-others">*</a>
        </td>
        <td class="text-center border px-1 py-2">{{item.confirmed | formatNumber}}</td>
        <td class="text-center border px-1 py-2">{{item.recovered | formatNumber}}</td>
        <td class="text-center border px-1 py-2">{{item.deaths | formatNumber}}</td>
      </tr>
      </tbody>
    </table>
    <div class="my-2 font-bold text-xs text-gray-600 leading-tight">
      * {{ $t('Cases identified on a cruise ship currently in Japanese territorial waters.') }}
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
    props: {
      limit: {
        type: Number,
        default: 15
      },
      showTitle: {
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {
        items: [],
      }
    },
    async created() {
      try {
        this.items = await this.$api.stats.getTopStats(this.limit)
      }
      catch (ex) {
        console.log('[TopStats] Error:', ex);
      }
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
