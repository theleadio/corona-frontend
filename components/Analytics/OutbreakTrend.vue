<template>
  <div>
    <client-only placeholder="Loading...">
      <apexcharts ref="chart" type="line" width="100%" height="400px" :options="options" :series="series"></apexcharts>
    </client-only>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    data: {
      type: Array,
      default: null,
    }
  },

  data () {
    return {
      options: {
        title: {
          text: 'Outbreak trend over time',
          align: 'left',
        },

        chart: {
          id: 'outbreak-trend',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },

        legend: {
          position: 'top',
        },

        tooltip: {
          theme: 'light'
        },

        dataLabels: {
          enabled: false,
        },

        stroke: {
          curve: 'straight'
        },

        markers: {
          size: 5,
          strokeColor: '#111',
          strokeWidth: 2,
        },

        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on
            opacity: 0.5,
          },
        },

        colors: ['#b7791f', '#c53030', '#38a169'], // yellow, red, green

        xaxis: {
          categories: [],
        },

        yaxis: [],
      },

      series: [],
    }
  },  

  watch: {
    data (val) {
      const categories = val.map(i => moment(i.date_posted, 'YYYY-MM-DD').format('YYYY-MM-DD'))
      const series = [
        {
          name: 'Total Confirmed Cases',
          data: Array(categories.length).fill(0),
        },
        {
          name: 'Total Mortality',
          data: Array(categories.length).fill(0),
        },
        {
          name: 'Total Recovered',
          data: Array(categories.length).fill(0),
        },
      ]

      this.$refs.chart.updateOptions({
        xaxis: {
          categories
        },
        
        yaxis: [
          {
            seriesName: 'Total Confirmed Cases',
            title: {
              text: 'Confirmed',
            },
          },
          {
            seriesName: 'Total Recovered', // this is actually 'total mortality' mapped to 'total recovered' axis
            opposite: true,
            show: false,
          },
          {
            seriesName: 'Total Recovered',
            opposite: true,
            title: {
              text: 'Deaths / Recovered',
            },
          },
        ],
      })

      val.map(i => i).forEach((item) => {
        const categoryIdx = categories.indexOf(moment(item.date_posted, 'YYYY-MM-DD').format('YYYY-MM-DD'))
        series[0].data[categoryIdx] += item.confirmed
        series[1].data[categoryIdx] += item.dead
        series[2].data[categoryIdx] += item.recovered
      })

      this.$refs.chart.updateSeries(series)
    },
  },
}
</script>
