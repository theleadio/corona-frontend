<template>
  <div class="absolute">
    <button
      v-on-clickaway="closeOptions"
      class="bg-gray-200 text-left font-bold text-gray-700 py-1 px-2 rounded w-full flex"
      @click="toggleOptions"
    >
      <span class="ml-2">{{ selectedChartType.name }} Chart</span>

      <div class="self-center ml-auto">
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </button>

    <ul v-if="optionsShowed" class="shadow text-gray-700 mt-1 z-50 w-full">
      <li v-for="chartConfig in chartTypes" :key="chartConfig.type">
        <a
          class="cursor-pointer bg-gray-200 hover:bg-gray-400 py-1 px-2 block whitespace-no-wrap"
          @click="changeChartConfig(chartConfig)"
        >
          <span class="ml-2">{{ chartConfig.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway"
export default {
  name: "PastDaysChartSelector",
  directives: {
    onClickaway: onClickaway
  },
  props: {
    defaultChartType: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        type: "bar",
        name: "Bar",
        stacked: true
      }
    },
    chartOptions: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    const chartTypes = [
      {
        type: "bar",
        name: "Bar",
        stacked: true
      },
      {
        type: "area",
        name: "Area",
        stacked: false
      },
      {
        type: "line",
        name: "Line",
        stacked: false
      }
    ]
    return {
      chartTypes: chartTypes,
      optionsShowed: false,
      selectedChartType: this.defaultChartType
    }
  },
  methods: {
    changeChartConfig(chartConfig) {
      this.selectedChartType.name = chartConfig.name
      this.selectedChartType.type = chartConfig.type
      this.chartOptions.chart.stacked = chartConfig.stacked
    },
    showOptions() {
      this.optionsShowed = true
    },
    closeOptions() {
      this.optionsShowed = false
    },
    toggleOptions() {
      this.optionsShowed = !this.optionsShowed
    }
  }
}
</script>

<style scoped></style>
