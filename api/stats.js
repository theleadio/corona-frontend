export default axios => ({
  getStats: (country) => {
    return axios.get(`/stats?country=${country}`)
      .then(res => res.data);
  },

  getLatestStats: () => {
    return axios.get(`/stats/latest`)
      .then(res => res.data);
  },
});
