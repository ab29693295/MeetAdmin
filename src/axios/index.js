import api from "../path/index";
import instance from "./base";

export default {
    //登录
    userLogin(params){
        return instance.get(api.cnkiDomain +"/api/Login/AdminLogin", {  params ,withCredentials:false});
    },
    //获取会议列表
    getMeetList(params) {
        return instance.get(api.cnkiDomain + "/api/MeetRoom/GetRoomList", { params,  withCredentials: false })
    },
    //获取用户列表
    getUserList(params) {
        return instance.get(api.cnkiDomain + "/api/UserManage/GetUserList", { params, withCredentials: false })
    },
    deleteMeetRoom(params) {
        return instance.get(api.cnkiDomain +'/api/MeetRoom/DeleteRoom', { params, withCredentials: false });
    },
    addMeetRoom(data) {
        return instance.post(api.cnkiDomain + "/api/MeetRoom/AddOrUpdateRoom", data,{withCredentials: false});
    },
    lockRoom(params) {
        return instance.get(api.cnkiDomain + "/Room/LockRoom", { params, withCredentials: false });
    },
    //审核
    checkRoom(params){
        return instance.get(api.cnkiDomain + "/api/MeetRoom/checkMeet", { params, withCredentials: false });
    },

    //获取选择用户
    selectUserList(params){
        return instance.get(api.cnkiDomain + "/api/UserManage/GetSelectUserList", { params, withCredentials: false });
    },
    //获取会议详情
    getRoomDetail(params){
        return instance.get(api.cnkiDomain + "/api/PersonMeetRoom/GetRoomDetail", { params, withCredentials: false });
    },

    //获取会议成员
    getAllUserList(params){
        return instance.get(api.cnkiDomain + "/RoomUser/GetAllUserList", { params, withCredentials: false })
    },
    //添加成员
    addMember(data){
        return instance.post(api.cnkiDomain + "/RoomUser", data)
    },
    //禁用解禁用户
    setForbiddenUser(params){
        return instance.get(api.cnkiDomain + "/api/UserManage/ForbidenUser", { params, withCredentials: false })
    },
    //获取房间聊天记录
    getRoomChat(params){
        return instance.get(api.cnkiDomain + "/api/RoomManage/GetRoomChat", { params, withCredentials: false })
    },
    //获取房间访问日志
    getRoomJoinLog(params){
        return instance.get(api.cnkiDomain + "/api/RoomManage/GetRoomJoinLog", { params, withCredentials: false })
    },
    //获取房间操作日志
    getRoomOperateLog(params){
        return instance.get(api.cnkiDomain  + "/api/RoomManage/GetRoomOperateLog", { params, withCredentials: false })
    },
    //获取房间录制视频
    getRoomVideo(params){
        return instance.get(api.cnkiDomain  + "/api/RoomManage/getRoomVideo", { params, withCredentials: false })
    },



}
