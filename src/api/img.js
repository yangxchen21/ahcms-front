import service from '../utils/request'

const URLS = {
  upload: '/img/upload'
}
export const uploadImg = (file) => {
  const data = new FormData()
  data.append('file', file)

  return service.post(URLS.upload, data)
}
