<template>
  <div>
    <Card v-if="showTitle" :title="$t('Countries Affected')"></Card>
    <div  v-if="showSource" class="my-2 font-bold text-xs text-gray-500 leading-tight">
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
          <template v-if="item.countryCode === 'OT'">
            <span>{{item.country}}</span>
            <a href="#notes-on-others">*</a>
          </template>
          <template v-else-if="item.countryCode">
            <nuxt-link :to="`/country/${item.countryCode.toLowerCase()}`" style="display: block;">
              <Flag :country-code="item.countryCode"></Flag>
              {{item.country}}
            </nuxt-link>
          </template>
        </td>
        <td class="text-center border px-1 py-2">{{item.totalConfirmed | formatNumber}}</td>
        <td class="text-center border px-1 py-2">{{item.totalRecovered | formatNumber}}</td>
        <td class="text-center border px-1 py-2">{{item.totalDeaths | formatNumber}}</td>
      </tr>
      </tbody>
    </table>
    <div v-if="showFooter" class="my-2 font-bold text-xs text-gray-600 leading-tight">
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
      },
      showSource: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        items: [],
      }
    },
    async created() {
      try {
        const items = await this.$api.stats.getTopNCountryStats(this.limit)
        this.items = items.filter(a => a.countryCode);
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
