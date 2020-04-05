<template>
  <div class="flex-1 relative overflow-hidden">
    <div class="border border-gray-400 p-4 rounded relative past-days-chart-wrapper">
      <div v-if="showHeader" class="relative">
        <div class="text-gray-900 font-bold text-xl">{{ title }}</div>
        <div class="text-gray-900 font-bold text-xs mb-2">({{ startDate }} - {{ endDate }})</div>
      </div>
      <div class="z-0 apex-chart-wrapper">
        <client-only placeholder="Loading...">
          <apexcharts
            :type="selectedChartType.type"
            :options="chartOptions"
            :series="trendData"
            :height="height"
          ></apexcharts>
        </client-only>
      </div>

      <PastDaysChartSelector v-if="showSelector" :defaultChartType="selectedChartType" :chartOptions="chartOptions"/>

      <!-- will enable when dynamic meta routing updated -->
      <!-- <Share v-if="showHeader"
             :url="'https://www.coronatracker.com/country/' + country.code.toLowerCase() + '?referrer=recent'"
             class="mr-20 mt-3"></Share> -->
    </div>
  </div>
</template>

<script>
import PastDaysChartSelector from '~/components/Country/PastDaysChartSelector.vue';
import Share from '~/components/Share';

export default {
  name: 'PastDaysChart',
  components: {
    PastDaysChartSelector,
    Share
  },
  props: {
    height: {
      type: Number,
      default: 360
    },
    trendData: {
      type: Array,
      default: []
    },
    trendDates: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showSelector: {
      type: Boolean,
      default: true,
    },
    enableAnimation: {
      type: Boolean,
      default: true,
    },
    enableTooltip: {
      type: Boolean,
      default: true,
    },
    country: {
      type: Object,
      default: () => ({ code: '' })
    }
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      selectedChartType: {
        name: 'Bar',
        type: 'bar',
        stacked: true
      },
      chartOptions: {
        chart: {
          animations: {
            enabled: this.enableAnimation,
          },
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          stacked: true,
        },
        grid: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        yaxis: {
          show: true,
          opposite: true
        },
        xaxis: {
          type: 'datetime',
          categories: this.trendDates,
          show: true,
          labels: {
            format: 'dd MMM'
          }
        },
        legend: {
          position: 'bottom',
          offsetX: 0,
          offsetY: -5
        },
        tooltip: {
          enabled: this.enableTooltip,
          shared: true,
          y: [{
            formatter: function (y) {
              return y;
            }
          }, {
            formatter: function (y) {
              return y;
            }
          }, {
            formatter: function (y) {
              return y;
            }
          }]
        },
      },
    };
  },
  methods: {},
  mounted() {
    this.startDate = this.trendDates[0]
    this.endDate = this.trendDates[this.trendDates.length-1]
  },
};
</script>

<style scoped>
.apex-chart-wrapper {
  position: absolute;
  bottom: 0;
  padding: 10px;
  width: 100%;
  opacity: 0.7;
  overflow: hidden;
}
.past-days-chart-wrapper {
  height: 360px;
}
</style>
