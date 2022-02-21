import instance from "./base";
import api from "../path/index";
export default {
    //上传图片
    uploadFile(data){
        return instance.post(api.cnkiDomain +"/FileUpload/Img",  data,{headers:{ "Content-Type": false}} );
    }
}
