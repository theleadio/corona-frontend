export default axios => ({
  fetchTrendByDate: (start_date, end_date) => {
    return axios.get(`/analytics/trend?start_date=${start_date}&end_date=${end_date}`)
      .then(res => res.data)
  },
});
