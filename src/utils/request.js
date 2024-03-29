import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8083',
  timeout: 5000
})

service.interceptors.request.use((config) => {
  let token = sessionStorage.getItem('token')
  if (token) config.headers['authorization'] = token
  return config
})
service.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data
  }
  return res.data
})
export default service
