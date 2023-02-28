import service from "../utils/request";
export const register=(data)=>service.post("/user",data)