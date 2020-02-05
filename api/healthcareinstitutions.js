export default axios => ({
  getHealthcareInstitutions: () => {
    return axios.get(`https://v2-api.sheety.co/3d29e508008ed3f47cc52f6aaf321f51/coronaInfo/hospitalsAndHealthcareProviders`)
      .then(res => res.data);
  },
});
