export default axios => ({
  fetchTrendByDate: (start_date, end_date) => {
    return axios.get(`/analytics/trend?start_date=${start_date}&end_date=${end_date}`)
      .then(res => res.data)
  },
  
  fetchAffectedRegion: () => {
    return axios.get(`/analytics/area`)
      .then(res => res.data)
  },

  // deprecating
  fetchAffectedCountry: () => {
    return axios.get(`/v2/analytics/country`)
      .then(res => res.data)
  },

  fetchAllAffectedCountry: () => {
    return axios.get(`/v3/analytics/country`)
      .then(res => res.data)
  },

  fetchTopCountryWithDailyNewCases: () => {
    return axios.get(`/v3/analytics/dailyNewStats`)
      .then(res => res.data)
  },
});
