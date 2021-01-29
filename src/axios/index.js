import axios from 'axios';
// import Qs from "qs";
import api from "../path/index";
const instance = axios.create({
    withCredentials: true
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
        return Promise.reject(error);
    }
);
//​/api​/MeetRoom​/DeleteRoom



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
    addMeetRoom(params) {
        return instance.post(api.cnkiDomain + "/api/MeetRoom/AddRoom", { params, withCredentials: false });
    },
    lockRoom(params) {
        return instance.get(api.cnkiDomain + "/Room/LockRoom", { params, withCredentials: false });
    }



}
