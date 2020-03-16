<template>
  <div class="flex-1 relative overflow-hidden mb-8">
    <div class="border border-gray-400 p-4 rounded relative ">
      <div class="z-10 relative">
        <div class="text-gray-900 font-bold text-xl mb-2">{{ title }}</div>
        <div class="text-gray-900 font-bold text-4xl mb-2">{{ number }}</div>
        <p class="text-gray-700 text-base">
          <span class="text-red-600">{{ subtitleRed }}</span>
          <span class="text-blue-600">{{ subtitleBlue }}</span>
          {{ subtitle }}
        </p>
      </div>
      <div class="z-0 chart-wrapper -mb-4">
        <apexcharts
          :options="chartOptions"
          :series="series"
          :height="height"
        ></apexcharts>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Home"
  },
  components: {},
  mounted() {},
  props: {
    height: {
      type: Number,
      default: 180
    },
    data: {
      type: Array,
      default: [0, 41, 35, 51, 49, 62, 69, 91, 148]
    },
    title: {
      type: String,
      default: "Serious Cases"
    },
    number: {
      type: String,
      default: "148"
    },
    subtitleRed: {
      type: String,
      default: ""
    },
    subtitleBlue: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: "in ICU"
    }
  },
  data: function() {
    return {
      series: [
        {
          data: this.data
        }
      ],
      chartOptions: {
        chart: {
          type: "area",
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          parentHeightOffset: 0
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        tooltip: {
          enabled: false
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        },
        yaxis: {
          show: false
        },
        xaxis: {
          labels: { show: false },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          }
        }
      }
    };
  }
};
</script>

<style scoped>
.chart-wrapper {
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 80%;
  opacity: 0.4;
  overflow: hidden;
}
</style>