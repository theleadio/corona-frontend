export default axios => ({
  getStats: (countryCode) => {
    return axios.get(`/v3/stats/bno?countryCode=${countryCode}`)
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
  }
});
