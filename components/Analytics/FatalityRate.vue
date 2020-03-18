<template>
  <div class="bg-white rounded border border-gray-400 p-1 w-full sm: w-1/2" >
    <div class="flex flex-wrap">
      <div class="w-full sm:w-1/2">
        <client-only placeholder="Loading...">
          <apexcharts ref="chart" type="donut" width="100%" height="150px" :options="options" :series="series"></apexcharts>
        </client-only>
      </div>
      <div class="w-full sm:w-1/2 flex flex-col py-2 pl-2 justify-center">
        <strong class="mb-2">{{ $t('Fatality Rate') }}</strong>
        <!-- <small class="mb-2">{{ $t('Time taken from confirmation to discharge') }}</small> -->
        <!-- <strong>{{ $t('{number} days', { number: days }) }}</strong> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>

export default {
  name: "FatalityRate",
  props:{
    days: {
      type: Number,
      default: 0,
    },
    series: {
      type: Array,
      required: true,
    }
  },
  data: function() {
    return {
      options: {
        chart: {
          type: 'donut',

        },
        legend:{
          show: false,
        },
        fill:{
          colors: [ '#CCCCCC', '#FF9AB2']
        },
        tooltip: {
          enabled: false,
        },
        dataLabels:{
          enabled: false,
        },
        states: {
          hover: {
              filter: {
                  type: 'none',
              }
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
                type: 'none',
            }
          },
        },
        plotOptions: {
          pie: {
            customScale: 0.9,
            expandOnClick: false,
            donut: {
              size: '85%',
              labels: {
                show: true,
                name: {
                  offsetY : 20,
                  color: "#828282",
                  formatter: (a, b, all) => {
                    return this.$t('OF TOTAL CASES');
                  },
                },
                value:{
                  offsetY: -15,
                  fontSize: '25px',
                  color: "#000000",
                  formatter: function (a,all) {
                    return all.config.series[1] + "%";
                  }
                },
                total: {
                  show: true,
                  label: this.$t('OF TOTAL CASES'),
                  fontSize: '9px',
                  formatter: function (value) {
                    return value.config.series[1] + "%";
                  }
                },
              },
            },

          }
        },
      },
    };
  },
};
</script>
