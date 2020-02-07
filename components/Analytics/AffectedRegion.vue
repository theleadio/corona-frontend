<template>
  <div>
    <client-only placeholder="Loading...">
      <apexcharts ref="chart" type="bar" width="100%" height="400px" :options="options" :series="series"></apexcharts>
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
          text: 'Most affected regions',
          align: 'left',
        },

        chart: {
          id: 'affected-regions',
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },

        plotOptions: {
          bar: {
            horizontal: true,
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
          width: 1,
          colors: ['#fff'],
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
          labels: {
            formatter: function (val) {
              return Math.abs(val) > 999 ? Math.sign(val)*((Math.abs(val)/1000).toFixed(1)) + 'k' : Math.sign(val)*Math.abs(val)
            },
          },
        },
      },

      series: [],
    }
  },

  watch: {
    data (val) {
      const categories = val.map(i => i.state)
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
          categories,
        }
      })

      val.map(i => i).forEach((item) => {
        const categoryIdx = categories.indexOf(item.state)
        series[0].data[categoryIdx] += item.total_confirmed
        series[1].data[categoryIdx] += item.total_dead
        series[2].data[categoryIdx] += item.total_recovered
      })

      this.$refs.chart.updateSeries(series)
    }
  },
}
</script>
