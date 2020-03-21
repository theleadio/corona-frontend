<template>
  <div class="absolute">
    <button class="bg-gray-200 text-left font-bold text-gray-700 py-1 px-2 rounded w-full flex"
            @click="toggleOptions" v-on-clickaway="closeOptions">
      <span class="ml-2">{{ selectedChartType.name }} Chart</span>

      <div class="self-center ml-auto">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </button>

    <ul class="shadow text-gray-700 mt-1 z-50 w-full" v-if="optionsShowed">
      <li v-for="(chartName, chartType, index) in chartTypes" :key="chartType">
        <a class="cursor-pointer bg-gray-200 hover:bg-gray-400 py-1 px-2 block whitespace-no-wrap"
            @click="changeChartConfig(chartName, chartType)">
          <span class="ml-2">{{ chartName }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
export default {
  directives: {
    onClickaway: onClickaway,
  },
  props: {
    defaultChartType: {
      type: Object,
      default: { name: "Bar", type: "bar" }
    }
  },
  data() {
    const chartTypes = {
      bar: "Bar",
      area: "Area",
      line: "Line"
    }
    return {
      chartTypes: chartTypes,
      optionsShowed: false,
      selectedChartType: this.defaultChartType,
    }
  },
  methods: {
    changeChartConfig(chartName, chartType) {
      this.selectedChartType.name = chartName
      this.selectedChartType.type = chartType
    },
    showOptions() {
      this.optionsShowed = true;
    },
    closeOptions() {
      this.optionsShowed = false;
    },
    toggleOptions() {
      this.optionsShowed = !this.optionsShowed;
    },
  }
}
</script>

<style scoped>
</style>
