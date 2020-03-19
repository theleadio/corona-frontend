<template>
  <div>
    <div style="height: 25rem;">
      <client-only placeholder="Loading...">
        <l-map
          ref="map"
          class="z-0 w-full"
          style="height: 25rem;"
          :center="center"
          :zoom="zoom"
          :minZoom="1"
          :maxBounds="[[-130, -220], [130, 220]]"
          @update:bounds="updateBounds"
          @update:zoom="updateZoom"
          @update:center="updateCenter">
          <l-tile-layer :url="mapUrl" :noWrap="true"></l-tile-layer>

          <l-circle-marker
            v-for="(loc, idx) in countriesForMapDisplay"
            :key="idx"
            :lat-lng="[+loc.lat, +loc.lng]"
            :stroke="false"
            :radius="loc.radius"
            fillColor="#e53e3e"
            color="red">
            <l-popup>
              <p class="text-xs">
                <span class="font-bold">{{ $t('Country') }}:</span> {{ loc.countryName }}
              </p>

              <p class="text-xs">
                <span class="font-bold">{{ $t('Total Confirmed') }}:</span> {{ loc.confirmed | formatNumber }}
              </p>

              <p class="text-xs">
                <span class="font-bold">{{ $t('Total Recovered') }}:</span> {{ loc.recovered | formatNumber }}
              </p>

              <p class="text-xs">
                <span class="font-bold">{{ $t('Total Deaths') }}:</span> {{ loc.deaths | formatNumber }}
              </p>
            </l-popup>
          </l-circle-marker>
        </l-map>
      </client-only>
    </div>

    <div class="mt-3" style="max-height: 36.3rem; overflow: auto;">
      <!--<table class="table-fixed w-full border">
        <thead class="text-xs text-center font-bold leading-tight">
          <tr>
            <td class="border">Country</td>
            <td class="border">Total Confirmed</td>
            <td class="border">Total Recovered</td>
            <td class="border">Total Deaths</td>
          </tr>
        </thead>

        <tbody class="text-xs text-center leading-tight">
          <tr v-for="loc in countries" :key="loc.country">
            <td class="border px-1 py-2">{{ loc.country }}</td>
            <td class="border px-1 py-2">{{ parseInt(loc.total_confirmed).toLocaleString() }}</td>
            <td class="border px-1 py-2">{{ parseInt(loc.total_recovered).toLocaleString() }}</td>
            <td class="border px-1 py-2">{{ parseInt(loc.total_dead).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>-->

      <table class="table-auto w-full">
        <thead class="text-xs leading-tight border-b-2">
        <tr>
          <th class="border px-2 py-2">{{ $t('Country') }}</th>
          <th class="border px-1 py-2">{{ $t('Total Confirmed') }}</th>
          <th class="border px-1 py-2">{{ $t('Total Recovered') }}</th>
          <th class="border px-1 py-2">{{ $t('Total Deaths') }}</th>
        </tr>
        </thead>
        <tbody class="font-bold">
        <tr v-for="loc in countries" :key="loc.countryName">
          <td class="bg-gray-200 text-xs border px-2 py-2 hover:bg-primary hover:text-white">
            <span v-if="loc.countryName === 'Others'">{{loc.countryName}}</span>
            <nuxt-link :to="`/country/${loc.countryCode.toLowerCase()}`" style="display:block" v-else>
              <Flag :country-code="loc.countryCode"></Flag>
              {{loc.countryName}}
            </nuxt-link>
            <a v-if="loc.countryName === 'Others'" href="#notes-on-others">*</a>
          </td>
          <td class="text-center border px-1 py-2">{{ loc.confirmed | formatNumber }}</td>
          <td class="text-center border px-1 py-2">{{ loc.recovered | formatNumber }}</td>
          <td class="text-center border px-1 py-2">{{ loc.deaths | formatNumber }}</td>
        </tr>
        </tbody>
      </table>
      <div class="my-2 font-bold text-xs text-gray-600 leading-tight">
        * {{ $t('Cases identified on a cruise ship currently in Japanese territorial waters.') }}
        <a name="notes-on-others" class="anchor"></a>
      </div>
    </div>
  </div>
</template>

<script>
import Flag from '~/components/Flag';

export default {
  props: {
    data: {
      type: Array,
      default: null,
    }
  },

  components: {
    Flag,
  },

  data () {
    return {
      mapUrl: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', // for other map: http://leaflet-extras.github.io/leaflet-providers/preview/index.html
      bounds: null,
      center: [0, 0],
      zoom: 1,
    }
  },

  computed: {
    countries () {
      return this.data.filter(i => i.confirmed)
    },
    countriesForMapDisplay() {
      return this.data.filter(i => i.confirmed && i.lat && i.lng).map(item => ({
        ...item,
        radius: this.scale(item.confirmed)
      }))
    },
  },

  methods: {
    scale (d) {
      const min = 1
      const factor = 5

      return Math.floor(Math.log(d) * factor) + min
    },

    updateBounds (bounds) {
      this.bounds = bounds
    },

    updateZoom (zoom) {
      this.zoom = zoom
    },

    updateCenter (center) {
      this.center = center
    },
  }
}
</script>

<style scoped>
.leaflet-popup-content p {
  margin: 0 !important;
}
</style>
