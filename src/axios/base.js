import axios from 'axios';
// import Qs from "qs";

import {message} from 'antd'
import {getStorage} from "../common/js/tools";
const instance = axios.create({
    withCredentials: false
});
instance.interceptors.request.use(
    config => {
        let token=getStorage('token');
        if(token){
            config.headers.Authorization="Bearer "+token
        }
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
export default instance