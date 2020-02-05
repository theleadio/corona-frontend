export default axios => ({
  getStats: (country) => {
    return axios.get(`/stats?country=${country}`)
      .then(res => res.data);
  },
});
