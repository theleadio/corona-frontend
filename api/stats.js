export default axios => ({
  getStats: (countryCode) => {
    return axios.get(`/v2/stats?countryCode=${countryCode}`)
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
});
