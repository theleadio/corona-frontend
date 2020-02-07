import analyticsApiFactory from './analytics';
import healthcareInstitutionsApiFactory from './healthcareInstitutions'
import newsApiFactory from './news';
import statsApiFactory from './stats';

const apiFactory = axios => ({
  analytics: analyticsApiFactory(axios),
  healthcareInstitutions: healthcareInstitutionsApiFactory(axios),
  news: newsApiFactory(axios),
  stats: statsApiFactory(axios),
});

export default apiFactory;
