export default axios => ({
  getTrendingNews: ({
    limit,
    offset,
    countryCode,
    country,
    language = "en"
  }) => {
    return axios
      .get(`/news/trending`, {
        params: {
          limit,
          offset,
          countryCode,
          country,
          language
        }
      })
      .then(res => res.data)
  },

  searchNews: q => {
    return axios
      .get(`/news`, {
        params: { q }
      })
      .then(res => res.data)
  }
})
