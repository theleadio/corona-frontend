<template>
  <div class="flex-1 relative overflow-hidden">
    <div class="border border-gray-400 p-4 rounded relative barchart-box">
      <div class="relative">
        <div class="text-gray-900 font-bold text-xl">{{ title }}</div>
        <div class="text-gray-900 font-bold text-xs mb-2">({{ startDate }} - {{ endDate }})</div>
        
      </div>
      <div class="z-0 chart-wrapper">
        <client-only placeholder="Loading...">
          <apexcharts
            :options="chartOptions"
            :series="trendData"
            :height="height"
          ></apexcharts>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {},
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
      default: "Past 30 Days Chart"
    },
  },
  data: function() {
    return {
      startDate: this.trendDates[0].slice(0,10),
      endDate: this.trendDates[this.trendDates.length-1].slice(0,10),
      chartOptions: {
        chart: {
          type: "bar",
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
          show: true
        },
        legend: {
          position: 'bottom',
          offsetX: 0,
          offsetY: -5
        },
        tooltip: {
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
      }
    };
  }
};
</script>

<style scoped>
.chart-wrapper {
  position: absolute;
  bottom: 0;
  padding: 10;
  width: 100%;
  opacity: 0.7;
  overflow: hidden;
}
.barchart-box {
  height: 360px;
}
</style>
