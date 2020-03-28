export default axios => ({
  getTopNCountryStats: (limit) => {
    const params = {
      limit,
    };

    return axios.get(`/v3/stats/worldometer/topCountry`, { params })
      .then(res => {
        const countryStats = res.data;

        return countryStats
          // Remove invalid data.
          .filter(stat => stat.countryCode && (stat.totalConfirmed || stat.totalDeaths || stat.totalRecovered))
          // De-duplicate stats by country code
          .filter((stat, index) => index === countryStats.findIndex(a => a.countryCode === stat.countryCode));
      })
  },

  getCountrySpecificStats: (countryCode) => {
    const params = {
      countryCode,
    };

    return axios.get(`/v3/stats/worldometer/country`, { params })
      .then(res => res.data);
  },

  getGlobalStats: () => {
    return axios.get(`/v3/stats/worldometer/global`)
      .then(res => res.data);
  },

  getTrendByCountryDate: (countryCode, startDate, endDate) => {
    const params = {
      countryCode,
      startDate,
      endDate,
    };

    return axios.get(`/v3/analytics/trend/country`, { params })
    .then(res => res.data);
  }
});
