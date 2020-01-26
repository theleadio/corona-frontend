import axios, { getData } from '../lib/axios';

export const getRecentNews = ({ limit = 4, sort = '-publishedAt' } = {}) => {
  return axios.get(`/news?sort=${sort}&limit=${limit}`).then(res => getData(res));
};

export const getTrendingNews = ({ limit, offset }) => {
  return axios.get(`/news/trending?offset=${offset}&limit=${limit}`).then(res => getData(res));
};