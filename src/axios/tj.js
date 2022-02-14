import api from "../path/index";
import instance from "./base";
//获取会议数量折线图
export function getTimeRoomCount(params){
    return instance.get(api.cnkiDomain  + "/api/MeetPersonCenter/GetTimeRoomCount", { params })
}