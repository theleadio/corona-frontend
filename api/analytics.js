export default axios => ({
  fetchTrendByDate: (start_date, end_date) => {
    return axios.get(`/v1/analytics/trend?start_date=${start_date}&end_date=${end_date}`)
      .then(res => res.data)
  },
  
  fetchAffectedRegion: () => {
    return axios.get(`/v1/analytics/area`)
      .then(res => res.data)
  },

  fetchAffectedCountry: () => {
    return axios.get(`/v2/analytics/country`)
      .then(res => res.data)
  },
});
