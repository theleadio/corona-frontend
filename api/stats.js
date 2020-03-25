export default axios => ({
  getStats: (countryCode) => {
    return axios.get(`/v3/stats/bno?countryCode=${countryCode}`)
      .then(res => res.data);
  },
  
  getTopNCountryStats: (limit) => {
    const endPoint = limit ? `/v3/stats/worldometer/top?limit=${limit}` : '/v3/stats/worldometer/top'
    return axios.get(endPoint)
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

  getLatestStats: () => {
    return axios.get(`/stats/latest`)
      .then(res => res.data);
  },

  getTopStats: (limit) => {
    return axios.get(`/v2/stats/top?limit=${limit}`)
      .then(res => res.data);
  },

  getTotalCasesByCountry: (countryCode) => {
    return axios.get(`/v3/stats/bno/total_daily_cases/country?countryCode=${countryCode}`)
      .then(res => res.data);
  },

  getDailyCasesByCountry: (countryCode) => {
    return axios.get(`/v3/stats/bno/daily_cases/country?countryCode=${countryCode}`)
    .then(res => res.data);
  },

  getTrendByCountry: (countryCode, startDate, endDate) => {
    return axios.get(`/analytics/trend/country?country_code=${countryCode}&start_date=${startDate}&end_date=${endDate}`)
    .then(res => res.data);
  }

});
