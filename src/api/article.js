import service from '../utils/request'
import { h } from 'vue'
import { ElMessage } from 'element-plus'
const URLS = {
  page: '/article/page',
  getById: '/article/',
  pageQueryBasic: '/article/basic-page',
  save: '/article'
}
export const ARTICLE_TYPES = {
  NOTICE: 2,
  ROLL_NEWS: 4,
  DYN_NEWS: 5,
  CONTEST_NEWS: 6,
  TRAIN_NEWS: 7,
  WORK_GUIDE: 8,
  ORGANIZATION: 9,
  COMPETITION_NOTICE: 11,
  COMPETITION_DETAIL: 12,
  CMS_OVERVIEW: 1
}
export const pageQuery = (pageIndex, pageSize, title, type) => {
  let url = title
    ? URLS.page + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&title=' + title
    : URLS.page + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize
  if (type) url = url + '&type=' + type
  return service.get(url)
}
export const getArticleById = (id) => {
  const url = URLS.getById + id
  return service.get(url)
}
export const pageQueryBasic = (pageIndex, pageSize, title, type, publisher) => {
  let url = URLS.pageQueryBasic + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize
  if (title) url = url + '&title=' + title
  if (type) url = url + '&type=' + type
  if (publisher) url = url + '&publisher=' + publisher
  return service.get(url)
}
export const getOverview = () => {
  const url = URLS.page + '?pageIndex=1&pageSize=1&type=' + ARTICLE_TYPES.CMS_OVERVIEW
  return service.get(url)
}
export const getGuide = (index, size) => {
  const url =
    URLS.page + '?pageIndex=' + index + '&pageSize=' + size + '&type=' + ARTICLE_TYPES.WORK_GUIDE
  return service.get(url)
}
export const saveArticle = (publisher, content, type, title, appendixIds = []) => {
  const url = URLS.save
  if (publisher === '' || type === null || title == '') {
    ElMessage.error('必要信息不全！')
    return null
  }
  const data = {
    publisher,
    content,
    type,
    title,
    appendixIds
  }
  return service.post(url, data)
}
