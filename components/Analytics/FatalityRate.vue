<template>
  <div class="bg-white rounded border border-gray-400 p-1 w-full sm: w-1/2" >
    <div class="flex flex-wrap">  
      <div class="w-full sm:w-1/3">
      <apexcharts ref="chart" type="donut" width="100%" height="150px" :options="options" :series="series"></apexcharts>
      </div>  
      <div class="w-full sm:w-2/3 flex flex-col py-2 pl-2 justify-center">
        <strong class="mb-2">Fatality Rate</strong>
        <small class="mb-2">Time taken from confirmation to discharge</small>
        <strong>10.0 days</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>

export default {
  name: "PositiveRate",
  components: {
  },
  data: function() {
    return {
      
      series: [46.1,53.9],
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
        dataLabels:{
          enabled: false,
        },
        plotOptions: {
          pie: {
            customScale: 0.9,
            donut: {
              size: '85%',
              labels: {
                show: true,
                name: {
                  offsetY : 20,
                  color: "#828282",
                },
                value:{
                  offsetY: -15,
                  fontSize: '25px',
                  color: "#000000",
                },
                total: {
                  show: true,
                  
                  label: 'OFF TOTAL CASES',
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
  methods: {
    
    showOptions(){
      this.optionsShowed = true;
    },
    
  },
  created() {
    
  },
};
</script>
