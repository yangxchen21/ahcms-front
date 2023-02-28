import service from "../utils/request";
export const getDepartmentsBySchoolId=(id)=>service.get("/department/"+id)
