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
          :min-zoom="1"
          :max-bounds="[
            [-130, -220],
            [130, 220]
          ]"
          @update:bounds="updateBounds"
          @update:zoom="updateZoom"
          @update:center="updateCenter"
        >
          <l-tile-layer :url="mapUrl" :no-wrap="true" />

          <l-circle-marker
            v-for="(loc, idx) in countriesForMapDisplay"
            :key="idx"
            :lat-lng="[+loc.lat, +loc.lng]"
            :stroke="false"
            :radius="loc.radius"
            fill-color="#e53e3e"
            color="red"
          >
            <l-popup>
              <p class="text-xs">
                <span class="font-bold">{{ $t("country") }}:</span>
                {{ loc.country }}
              </p>

              <p class="text-xs">
                <span class="font-bold">{{ $t("total_confirmed") }}:</span>
                {{ loc.totalConfirmed | formatNumber }}
              </p>

              <p class="text-xs">
                <span class="font-bold">{{ $t("total_recovered") }}:</span>
                {{ loc.totalRecovered | formatNumber }}
              </p>

              <p class="text-xs">
                <span class="font-bold">{{ $t("total_deaths") }}:</span>
                {{ loc.totalDeaths | formatNumber }}
              </p>
            </l-popup>
          </l-circle-marker>
        </l-map>
      </client-only>
    </div>

    <div
      class="mt-3 hidden lg:block"
      style="max-height: 36.3rem; overflow: auto;"
    >
      <HintClickCountry />
      <table class="table-auto w-full">
        <thead class="text-xs leading-tight border-b-2">
          <tr>
            <th class="border px-2 py-2">
              {{ $t("country") }}
            </th>
            <th class="border px-1 py-2">
              {{ $t("total_confirmed") }}
            </th>
            <th class="border px-1 py-2">
              {{ $t("total_recovered") }}
            </th>
            <th class="border px-1 py-2">
              {{ $t("total_deaths") }}
            </th>
          </tr>
        </thead>
        <tbody class="font-bold">
          <tr v-for="loc in data" :key="loc.country">
            <td
              class="bg-gray-200 text-xs border px-2 py-2 hover:bg-primary hover:text-white"
            >
              <template v-if="loc.countryCode === 'OT'">
                <span>{{ loc.country }}</span>
                <a href="#notes-on-others">*</a>
              </template>
              <template v-else-if="loc.countryCode">
                <nuxt-link
                  :to="localePath(`/country/${loc.countryCode.toLowerCase()}`)"
                  style="display: block;"
                >
                  <Flag :country-code="loc.countryCode" />
                  {{ loc.country }}
                </nuxt-link>
              </template>
            </td>
            <td class="text-center border px-1 py-2">
              {{ loc.totalConfirmed | formatNumber }}
            </td>
            <td class="text-center border px-1 py-2">
              {{ loc.totalRecovered | formatNumber }}
            </td>
            <td class="text-center border px-1 py-2">
              {{ loc.totalDeaths | formatNumber }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="my-2 font-bold text-xs text-gray-600 leading-tight">
        * {{ $t("cruise_ship_notice") }}
        <a name="notes-on-others" class="anchor" />
      </div>
    </div>
  </div>
</template>

<script>
import Flag from "~/components/Flag"
import HintClickCountry from "~/components/HintClickCountry"

export default {
  components: {
    Flag,
    HintClickCountry
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },

  data() {
    return {
      mapUrl: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", // for other map: http://leaflet-extras.github.io/leaflet-providers/preview/index.html
      bounds: null,
      center: [0, 0],
      zoom: 1
    }
  },

  computed: {
    countriesForMapDisplay() {
      return this.data
        .filter(i => i.totalConfirmed && i.lat && i.lng)
        .map(item => ({
          ...item,
          radius: this.scale(item.totalConfirmed)
        }))
    }
  },

  methods: {
    scale(d) {
      const min = 1
      const factor = 5

      return Math.floor(Math.log(d) * factor) + min
    },

    updateBounds(bounds) {
      this.bounds = bounds
    },

    updateZoom(zoom) {
      this.zoom = zoom
    },

    updateCenter(center) {
      this.center = center
    }
  }
}
</script>

<style scoped>
.leaflet-popup-content p {
  margin: 0 !important;
}
</style>
