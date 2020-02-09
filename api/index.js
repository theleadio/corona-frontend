import analyticsApiFactory from './analytics';
import healthcareInstitutionsApiFactory from './healthcareInstitutions'
import newsApiFactory from './news';
import statsApiFactory from './stats';
import travelAlertApiFactory from './travelAlert';

const apiFactory = axios => ({
  analytics: analyticsApiFactory(axios),
  healthcareInstitutions: healthcareInstitutionsApiFactory(axios),
  news: newsApiFactory(axios),
  stats: statsApiFactory(axios),
  travelAlert: travelAlertApiFactory(axios),
});

export default apiFactory;
