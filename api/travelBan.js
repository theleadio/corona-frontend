export default axios => ({
  getTravelBan: () => {
    return axios.get(`/v1/travel-ban`)
      .then(res => res.data);
  },
});
