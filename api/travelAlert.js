export default axios => ({
  getTravelAlert: () => {
    return axios.get(`/v1/travel-alert`).then(res => res.data)
  }
})
