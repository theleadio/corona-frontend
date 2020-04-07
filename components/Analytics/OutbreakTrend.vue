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
          text: this.$t('outbreak_trend'),
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

        colors: ['#e53e3e', '#718096', '#38a169'], // red, gray, green

        xaxis: {
          categories: [],
          type: 'datetime',
          min: new Date(this.firstDate).getTime(),
          labels: {
            datetimeFormatter: {
              month: 'MMM yyyy',
            },
          },
        },

        yaxis: [],
      },

      series: [],

      firstDate: null,
    }
  },

  watch: {
    data (val) {
      const categories = val.map(i => moment(i.lastUpdated, 'YYYY-MM-DD').format('YYYY-MM-DD'))
      const series = [
        {
          name: this.$t('total_confirmed'),
          data: Array(categories.length).fill(0),
        },
        {
          name: this.$t('total_deaths'),
          data: Array(categories.length).fill(0),
        },
        {
          name: this.$t('total_recovered'),
          data: Array(categories.length).fill(0),
        },
      ]

      this.firstDate = categories[0]

      this.$refs.chart.updateOptions({
        xaxis: {
          categories,
        },

        yaxis: [
          {
            seriesName: this.$t('total_confirmed'),
            title: {
              text: this.$t('confirmed'),
            },
          },
          {
            seriesName: this.$t('total_recovered'), // this is actually 'total mortality' mapped to 'total recovered' axis
            opposite: true,
            show: false,
          },
          {
            seriesName: this.$t('total_recovered'),
            opposite: true,
            title: {
              text: this.$t('deaths') + ' / ' + this.$t('recovered'),
            },
          },
        ],
      })

      val.map(i => i).forEach((item) => {
        const categoryIdx = categories.indexOf(moment(item.lastUpdated, 'YYYY-MM-DD').format('YYYY-MM-DD'))
        series[0].data[categoryIdx] += item.totalConfirmed
        series[1].data[categoryIdx] += item.totalDeaths
        series[2].data[categoryIdx] += item.totalRecovered
      })

      this.$refs.chart.updateSeries(series)
    },
  },
}
</script>
