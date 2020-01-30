import axios, { getData } from '../lib/axios';

export const getRecentNews = ({ limit = 4, sort = '-publishedAt', country = '' } = {}) => {
  return axios.get(`/news?sort=${sort}&limit=${limit}&country=${country}`)
    .then(res => getData(res));
};

export const getTrendingNews = ({ limit, offset, country = '', language = 'en' }) => {
  return axios.get(`/news/trending?offset=${offset}&limit=${limit}&country=${country}&language=${language}`)
    .then(res => getData(res));
};