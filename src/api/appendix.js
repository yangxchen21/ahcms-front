import service from '../utils/request'
const URLS = {
  UPLOAD_FILES: '/appendix/upload',
  LIST: '/appendix/list',
  DOWNLOAD: '/appendix'
}
export const uploadFiles = (data) => {
  return service.post(URLS.UPLOAD_FILES, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const list = (pageIndex, pageSize, name) => {
  let url = name
    ? URLS.LIST + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&name=' + name
    : URLS.LIST + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize
  return service.get(url)
}
export const download = (id) => {
  const url = URLS.DOWNLOAD + '?id=' + id
  return service.get(url, { responseType: 'blob' })
}
