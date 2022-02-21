import api from "../path/index";
import instance from "./base";
//获取会议数量折线图
export function getTimeRoomCount(params){
    return instance.get(api.cnkiDomain  + "/api/MeetPersonCenter/GetTimeRoomCount", { params })
}
//房间访问日志
export function getRoomFootLog(params){
    console.log(api.cnkiDomain  + "/api/MeetStatics/GetRoomFootLog")
    return instance.get(api.cnkiDomain  +"/api/MeetStatics/GetRoomFootLog", { params })
}
//登录日志
export function getUserLoginLog(params){
    return instance.get(api.cnkiDomain  + "​/api/MeetStatics/GetRoomFootLog", { params })
}