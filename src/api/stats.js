import axios, { getData } from '../lib/axios';

export const getStats = (country) => {
  return axios.get(`/stats?country=${country}`)
    .then(res => getData(res));
};
