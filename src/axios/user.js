import instance from "./base";
import api from "../path/index";
//获取用户列表
export function getUserList(params) {
    return instance.get(api.cnkiDomain + "/api/UserManage/GetUserList", { params})
}
//禁用解禁用户
export function setForbiddenUser(params){
    return instance.get(api.cnkiDomain + "/api/UserManage/ForbidenUser", { params })
}
//禁用解禁用户
export function deleteUser(params){
    return instance.delete(api.cnkiDomain + "/api/UserManage/DeleteUser", { params })
}
//用户详情
export function getUserDetail(params){
    return instance.get(api.cnkiDomain + "/api/UserManage/GetUserDetail", { params })
}
//添加用户/修改用户
export function addOrUpdateUser(data){
    return instance.post(api.cnkiDomain + "/api/UserManage/AddOrUpdateUser", data)
}
//获取所有角色
export function getALlRole(params){
    return instance.get(api.cnkiDomain + "/api/UserRole/GetALlRole", {params})
}
//获取个人统计信息
export function getPersonStatics(params){
    return instance.get(api.cnkiDomain + "/api/MeetPersonCenter/GetPersonStatics", {params})
}
//课程学习足迹
export function getLiveFootLog(params){
    return instance.get(api.cnkiDomain + "/api/MeetPersonCenter/GetRoomFootLog", {params})
}
//登录日志
export function getUserLoginLog(params){
    return instance.get(api.cnkiDomain + "/api/MeetPersonCenter/GetUserLoginLog", {params})
}
//参与过的会议
export function getTotalRoom(params){
    return instance.get(api.cnkiDomain + "/api/MeetPersonCenter/GetTotalRoom", {params})
}
//添加用户/修改用户
export function updateUserMessage(data){
    return instance.post(api.cnkiDomain + "/api/UserManage/UpdateUserMessage", data)
}
//添加用户/修改用户
export function resetUserPwd(data){
    return instance.post(api.cnkiDomain + "/api/UserManage/ResetUserPwd", data)
}