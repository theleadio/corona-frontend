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
            v-for="(loc, idx) in countries"
            :key="idx"
            :lat-lng="[+loc.lat, +loc.lng]"
            :stroke="false"
            :radius="loc.radius"
            fillColor="#e53e3e"
            color="red">
            <l-popup>
              <p class="text-xs">
                <span class="font-bold">Country:</span> {{ loc.country }}
              </p>

              <p class="text-xs">
                <span class="font-bold">Total Confirmed:</span> {{ parseInt(loc.total_confirmed).toLocaleString() }}
              </p>

              <p class="text-xs">
                <span class="font-bold">Total Recovered:</span> {{ parseInt(loc.total_recovered).toLocaleString() }}
              </p>

              <p class="text-xs">
                <span class="font-bold">Total Dead:</span> {{ parseInt(loc.total_dead).toLocaleString() }}
              </p>
            </l-popup>
          </l-circle-marker>
        </l-map>
      </client-only>
    </div>

    <div class="mt-3" style="max-height: 30rem; overflow: scroll;">
      <table class="table-fixed w-full border">
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
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: null,
    }
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
      return this.data.filter(i => i.total_confirmed).map(item => ({
        ...item,
        radius: this.scale(item.total_confirmed)
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
