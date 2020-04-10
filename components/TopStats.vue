<template>
  <div>
    <Card v-if="showTitle" :title="$t('countries_affected')"></Card>
    <div v-if="showSource" class="my-2 font-bold text-xs text-gray-500 leading-tight">
      {{ $t('sources') }}: {{ $t('WHO') }}, CDC, ECDC, NHC of the PRC, JHU CSSE, DXY, QQ, {{ $t('international_media') }}
    </div>
    <HintClickCountry v-if="showHint" />
    <table class="table-auto w-full">
      <thead class="text-xs leading-tight border-b-2">
      <tr>
        <th class="border px-2 py-2">{{ $t('country') }}</th>
        <th class="border px-1 py-2 pointer" @click="headerClick('confirmed')">
          {{ $t('confirmed') }}<span v-if="sortField === 'confirmed'" v-bind:class="{'up-arrow': !sortInDescendingOrder, 'down-arrow': sortInDescendingOrder }" class="sorter-header"></span>
        </th>
        <th class="border px-1 py-2 pointer" @click="headerClick('recovered')">
          {{ $t('recovered') }}<span v-if="sortField === 'recovered'" v-bind:class="{'up-arrow': !sortInDescendingOrder, 'down-arrow': sortInDescendingOrder }" class="sorter-header"></span>
        </th>
        <th class="border px-1 py-2 pointer" @click="headerClick('deaths')">
          {{ $t('deaths') }}<span v-if="sortField === 'deaths'" v-bind:class="{'up-arrow': !sortInDescendingOrder, 'down-arrow': sortInDescendingOrder }" class="sorter-header"></span>
      </th>
      </tr>
      </thead>
      <tbody class="font-bold">
      <template v-if="isLoading">
        <tr>
          <td colspan="4" class="text-center py-12 text-gray-500 border">
            <i class="fas fa-spinner fa-spin fa-2x"></i>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="item in countryStats" :key="item.countryCode">
          <td class="bg-gray-200 text-xs border hover:bg-primary hover:text-white px-2 py-2 ">
            <template v-if="item.countryCode === 'OT'">
              <div :style="usedInSharePage ? 'margin-left: 35%;' : ''">{{item.country}}<a href="#notes-on-others">*</a></div>
            </template>
            <template v-else-if="item.countryCode">
              <nuxt-link
                :to="localePath(`/country/${item.countryCode.toLowerCase()}`)"
                style="display: block;"
                :style="usedInSharePage ? 'margin-left: 35%' : ''"
              >
                <Flag :country-code="item.countryCode"></Flag>
                {{item.country}}
              </nuxt-link>
            </template>
          </td>
          <td class="text-center border px-1 py-2">{{item.totalConfirmed | formatNumber}}</td>
          <td class="text-center border px-1 py-2">{{item.totalRecovered | formatNumber}}</td>
          <td class="text-center border px-1 py-2">{{item.totalDeaths | formatNumber}}</td>
        </tr>
      </template>
      </tbody>
    </table>
    <div v-if="showFooter" class="my-2 font-bold text-xs text-gray-600 leading-tight">
      * {{ $t('cruise_ship_notice') }}
      <a name="notes-on-others" class="anchor"></a>
    </div>
  </div>
</template>

<script>
  import Card from '~/components/Card';
  import Flag from '~/components/Flag';
  import HintClickCountry from '~/components/HintClickCountry';

  export default {
    name: "TopStats",
    components: {
      Card,
      Flag,
      HintClickCountry,
    },
    props: {
      isLoading: {
        type: Boolean,
        default: false,
      },
      countryStats: {
        type: Array,
        default: () => []
      },
      showTitle: {
        type: Boolean,
        default: true,
      },
      showHint: {
        type: Boolean,
        default: true
      },
      showSource: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      // Apply custom styling specific for share page
      usedInSharePage: {
        type: Boolean,
        default: false,
      },
      sortField: {
        type: String,
        default: "confirmed"
      },
      sortInDescendingOrder: {
        type: Boolean,
        default: true
      },
      headerClick: {
        type: Function
      }
    },
    data() {
      return {
        items: [],
      }
    },
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
