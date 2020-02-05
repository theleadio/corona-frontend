import analyticsApiFactory from './analytics';
import healthCareInstitutionsApiFactory from './healthcareinstitutions'
import newsApiFactory from './news';
import statsApiFactory from './stats';

const apiFactory = axios => ({
  analytics: analyticsApiFactory(axios),
  healthcareinstitutions: healthCareInstitutionsApiFactory(axios),
  news: newsApiFactory(axios),
  stats: statsApiFactory(axios),
});

export default apiFactory;
