export default axios => ({
  getRecentNews: ({ limit = 4, sort = '-publishedAt', country = '' } = {}) => {
    return axios.get(`/news?sort=${sort}&limit=${limit}&country=${country}`)
      .then(res => res.data);
  },

  getTrendingNews: ({ limit, offset, country = '', language = 'en' }) => {
    return axios.get(`/news/trending?offset=${offset}&limit=${limit}&country=${country}&language=${language}`)
      .then(res => res.data);
  },

  searchNews: (q) => {
    return axios.get(`/news`, {
      params: { q },
    })
      .then(res => res.data);
  },
});
