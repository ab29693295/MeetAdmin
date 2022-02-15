import api from "../path/index";
import instance from "./base";
//获取会议数量折线图
export function addPermission(data){
    return instance.post(api.cnkiDomain  + "/api/Permission/AddPermission", data)
}
//获取菜单列表
export function getPermissionList(params){
    return instance.get(api.cnkiDomain  + "/api/Permission/GetPermissionList", {params})
}
//更改菜单状态
export function checkStatus(params){
    return instance.get(api.cnkiDomain  + "/api/Permission/CheckStatus", {params})
}
//删除菜单
export function deletePermission(params){
    return instance.get(api.cnkiDomain  + "/api/Permission/DeletePermission", {params})
}