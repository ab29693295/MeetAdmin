import api from "../path/index";
import instance from "./base";
//获取机构
export function getAllProject(params){
    return instance.get(api.cnkiDomain + "/api/ProjectMange/GetAllProject", { params, withCredentials: false });
}
//修改机构状态
export function setProjectStatus(params){
    return instance.get(api.cnkiDomain + "/api/ProjectMange/ForbidPro", { params, withCredentials: false })
}
//添加机构
export function addProject(data){
    return instance.post(api.cnkiDomain + "/api/ProjectMange/AddOrUpdateProject", data,{  withCredentials: false })
}
//获取机构下所有成员
export function getAllProUser(params){
    return instance.get(api.cnkiDomain + "/api/MeetPersonCenter/GetAllProUser", { params, withCredentials: false })
}
//获取机构详情
export function getProDetail(params){
    return instance.get(api.cnkiDomain + "/api/ProjectMange/GetProDetail", { params, withCredentials: false })
}