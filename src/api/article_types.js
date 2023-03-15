import service from '../utils/request'
const URLS={
    GET_LV1_LIST:'/articletype/listv1',
    GET_LV2_LIST:'/articletype/listv2'
}
export const getLv1List=()=>{
    return service.get(URLS.GET_LV1_LIST)
}
export const getLv2ListById=(id)=>{
    const url=URLS.GET_LV2_LIST+'?id='+id
    return service.get(url)
}