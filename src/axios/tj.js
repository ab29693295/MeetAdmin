import api from "../path/index";
import instance from "./base";
//获取会议数量柱状图
export function getTimeRoomCount(params){
    return instance.get(api.cnkiDomain  + "/api/AdminHome/GetTimeRoomCount", { params })
}
//房间访问日志
export function getRoomFootLog(params){
    return instance.get(api.cnkiDomain  +"/api/MeetStatics/GetRoomFootLog", { params })
}
//登录日志
export function getUserLoginLog(params){
    return instance.get(api.cnkiDomain  + "/api/MeetStatics/GetUserLoginLog", { params })
}
//获取首页
export function getMeetHomeDetail(params){
    return instance.get(api.cnkiDomain  + "/api/AdminHome/GetMeetHomeDetail", { params, withCredentials: false })
}
//访问人数折线图
export function getTimeVisitCount(params){
    return instance.get(api.cnkiDomain  + "/api/AdminHome/GetTimeVisitCount", { params, withCredentials: false })
}
//访问登陆人数
export function getTimeLoginCount(params){
    return instance.get(api.cnkiDomain  + "/api/AdminHome/GetTimeLoginCount", { params, withCredentials: false })
}