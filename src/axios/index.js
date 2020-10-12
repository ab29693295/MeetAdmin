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
export default {
    userLogin(params){
        return instance.get(api.cnkiDomain +"/api/User/Login", {  params ,withCredentials:false});
    }
}
