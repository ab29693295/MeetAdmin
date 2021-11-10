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
    //获取所有直播数据
    getCourseList(params){
        return instance.get(api.cnkiDomain +"/api/LiveCourse/GetCourseList", {  params ,withCredentials:false});
    }
}
