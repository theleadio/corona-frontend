<template>
  <div>
    <client-only placeholder="Loading...">
      <apexcharts
        ref="chart"
        type="bar"
        width="100%"
        height="400px"
        :options="options"
        :series="series"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },

  data() {
    return {
      options: {
        title: {
          text: this.$t("top_countries_daily_new_cases"),
          align: "left"
        },

        chart: {
          id: "affected-regions",
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },

        plotOptions: {
          bar: {
            horizontal: true
          }
        },

        legend: {
          position: "top"
        },

        tooltip: {
          theme: "light"
        },

        dataLabels: {
          enabled: false
        },

        stroke: {
          width: 1,
          colors: ["#fff"]
        },

        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on
            opacity: 0.5
          }
        },

        colors: ["#e53e3e", "#718096", "#38a169"], // red, gray, green

        xaxis: {
          categories: [],
          labels: {
            formatter: function(val) {
              return Math.abs(val) > 999
                ? Math.sign(val) * (Math.abs(val) / 1000).toFixed(1) + "k"
                : Math.sign(val) * Math.abs(val)
            }
          }
        }
      },

      series: []
    }
  },

  watch: {
    data(val) {
      const categories = val.map(i => i.country)
      const series = [
        {
          name: this.$t("daily_new_cases"),
          data: Array(categories.length).fill(0)
        },
        {
          name: this.$t("daily_new_deaths"),
          data: Array(categories.length).fill(0)
        }
      ]

      this.$refs.chart.updateOptions({
        xaxis: {
          categories
        }
      })

      val
        .map(i => i)
        .forEach(item => {
          const categoryIdx = categories.indexOf(item.country)
          series[0].data[categoryIdx] += item.daily_cases
          series[1].data[categoryIdx] += item.daily_deaths
        })

      this.$refs.chart.updateSeries(series)
    }
  }
}
</script>
