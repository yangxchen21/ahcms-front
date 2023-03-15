import service from '../utils/request'
const URLS = {
  logout: '/user/logout'
}
export const register = (data) => service.post('/user', data)
export const login = (str, password) => {
  const url = '/user/login?' + 'username=' + str + '&password=' + password
  return service.get(url)
}
export const loginByCode = (phone, code) => {
  const data = {
    phone,
    code
  }
  const url = '/user/login'
  return service.post(url, data)
}
export const getVerifyCode = (phone) => {
  const url = '/user/code?phone=' + phone
  return service.post(url)
}
export const logout = () => {
  return service.post(URLS.logout)
}
