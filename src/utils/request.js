import axios from "axios";
const service=axios.create({
    baseURL:'http://localhost:8083',
    timeout:5000
})
service.interceptors.request.use(config=>{
    return config
})
service.interceptors.request.use(res=>{
    return res
})
export default service