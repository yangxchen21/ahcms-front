import service from "../utils/request";
export const register=(data)=>service.post("/user",data)
export const login=(str,password)=>{
    const url="/user/login?"+"username="+str+"&password="+password
    return service.get(url)
}