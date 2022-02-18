import axios from 'axios';
import store from '@/redux/store.js'
import {removeStorage} from "../common/js/tools";
import {message} from 'antd'
import * as user from '@/redux/actions/user'
const instance = axios.create({
    withCredentials: false
});
instance.interceptors.request.use(
    config => {
        let token=store.getState().user.token
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
        let status=response.data.status;
        if(status==401){
            message.error(response.data.msg,3,function () {
                store.dispatch(user.clearToken());
                removeStorage('token')
                window.location.href='/login'
            })
            return Promise.reject(new Error(response.data.msg || 'Error'))

        }else if(status==403){
            message.error(response.data.msg,3)
            return Promise.reject(new Error(response.data.msg || 'Error'))

        }else if(status==200){
            return Promise.resolve(response.data);
        }

    },
    error => {
        console.log(error)
        // message.error(error)
        return Promise.reject(error);
    }
);
export default instance