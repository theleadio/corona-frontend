export default axios => ({
  getStats: (country) => {
    return axios.get(`/stats?country=${country}`)
      .then(res => res.data);
  },

  getLatestStats: () => {
    return axios.get(`/stats/latest`)
      .then(res => res.data);
  },
  getTopStats: (limit) => {
    return axios.get(`/stats/top?limit=${limit}`)
      .then(res => res.data);
  },
});
