export default axios => ({
  getStats: (countryCode) => {
    //return axios.get(`/v2/stats?countryCode=${countryCode}`)
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

  getDiffStatsCountry: (countryCode) => {
    return axios.get(`/v2/stats/diff/country`)
      .then(res => res.data);
  }
});
