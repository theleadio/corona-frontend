export default axios => ({
  getHealthcareInstitutions: () => {
    return axios.get(`/healthcare-institution`)
      .then(res => res.data);
  },
});
