export default axios => ({
  getHealthcareInstitutions: () => {
    return axios.get(`/v1/healthcare-institution`)
      .then(res => res.data);
  },
});
