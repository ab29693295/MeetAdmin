import api from "../path/index";
import instance from "./base";
//添加菜单或者目录
export function addPermission(data){
    return instance.post(api.cnkiDomain  + "/api/Permission/AddPermission", data)
}
//获取菜单列表
export function getPermissionList(params){
    return instance.get(api.cnkiDomain  + "/api/Permission/GetPermissionList", {params})
}
//更改菜单状态
export function checkMenuStatus(params){
    return instance.get(api.cnkiDomain  + "/api/Permission/CheckStatus", {params})
}
//删除菜单
export function deletePermission(params){
    return instance.get(api.cnkiDomain  + "/api/Permission/DeletePermission", {params})
}
//获取角色列表
export function getALlRole(params){
    return instance.get(api.cnkiDomain  + "/api/UserRole/GetALlRole", {params})
}
//更改角色状态
export function checkRoleStatus(params){
    return instance.get(api.cnkiDomain  + "/api/UserRole/CheckStatus", {params})
}
//删除角色
export function deleteRole(params){
    return instance.get(api.cnkiDomain  + "/api/UserRole/DeleteRole", {params})
}
//添加角色
export function addOrUpdateRole(data){
    return instance.post(api.cnkiDomain  + "/api/UserRole/AddOrUpdateRole", data)
}