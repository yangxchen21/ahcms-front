import service from '../utils/request'
const URLS = {
  page: '/article/page'
}
export const pageQuery = (pageIndex, pageSize, title) => {
  const url = title
    ? URLS.page + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&title=' + title
    : URLS.page + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize
  return service.get(url)
}
