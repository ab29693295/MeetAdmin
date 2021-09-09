import axios from 'axios';
// import Qs from "qs";
import api from "../path/index";
import {message} from 'antd'
const instance = axios.create({
    withCredentials: false
});
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//响应拦截器
instance.interceptors.response.use(
    response => {
        return Promise.resolve(response.data);
    },
    error => {
        console.log(error)
        // message.error(error)
        return Promise.reject(error);
    }
);

export default {
    userLogin(params){
        return instance.get(api.cnkiDomain +"/api/User/Login", {  params ,withCredentials:false});
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
    //机构
    selectProject(params){
        return instance.get(api.cnkiDomain + "/api/ProjectMange/SelectProject", { params, withCredentials: false });
    },
    //主持人
    selectUserList(params){
        return instance.get(api.cnkiDomain + "/api/UserManage/GetSelectUserList", { params, withCredentials: false });
    },
    //获取会议详情
    getRoomDetail(params){
        return instance.get(api.cnkiDomain + "/api/MeetRoom/GetRoomDetail", { params, withCredentials: false });
    },
    //获取机构
    getAllProject(params){
        return instance.get(api.cnkiDomain + "/api/ProjectMange/GetAllProject", { params, withCredentials: false });
    },
    //修改机构状态
    setProjectStatus(params){
        return instance.get(api.cnkiDomain + "/api/ProjectMange/ForbidPro", { params, withCredentials: false })
    },
    //添加机构
    addProject(data){
        return instance.post(api.cnkiDomain + "/api/ProjectMange/addProject", data,{  withCredentials: false })
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
    }
}
