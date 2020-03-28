export default axios => ({
  getTopNCountryStats: (limit) => {
    const limitQuery = limit ? `?limit=${limit}` : ``
    return axios.get('/v3/stats/worldometer/topCountry' + limitQuery)
      .then(res => res.data);
  },

  getCountrySpecificStats: (countryCode) => {
    return axios.get(`/v3/stats/worldometer/country?countryCode=${countryCode}`)
      .then(res => res.data);
  },

  getGlobalStats: () => {
    return axios.get(`/v3/stats/worldometer/global`)
      .then(res => res.data);
  },

  getTrendByCountryDate: (countryCode, startDate, endDate) => {
    return axios.get(`/v3/analytics/trend/country?countryCode=${countryCode}&startDate=${startDate}&endDate=${endDate}`)
    .then(res => res.data);
  }
});
