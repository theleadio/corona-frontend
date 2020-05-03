export default axios => ({
  fetchTopTrendingCases: limit => {
    const params = {
      limit
    }

    return axios
      .get(`/v3/stats/worldometer/totalTrendingCases`, { params })
      .then(res => res.data)
  },

  // deprecating
  fetchAffectedCountry: () => {
    return axios.get(`/v2/analytics/country`).then(res => res.data)
  },

  fetchTopCountryWithDailyNewStatsSortByNewCases: () => {
    return axios.get(`/v3/analytics/dailyNewStats`).then(res => res.data)
  }
})
