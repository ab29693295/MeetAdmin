import instance from "./base";
import api from "../path/index";
export default {
    //获取所有直播数据
    getCourseList(params){
        return instance.get(api.cnkiDomain +"/api/LiveCourse/GetCourseList", {  params ,withCredentials:false});
    },
    //获取直播机构列表
    getProjectList(params){
        return instance.get(api.cnkiDomain +"/api/LiveCourse/GetProjectList",  params );
    },
    //添加修改直播课
    addOrUpdateLiveCourse(params){
        return instance.get(api.cnkiDomain +"/api/LiveCourse/AddorUpdateLiveCourse",  {params} );
    },
    //视频审核
    setCheckStatus(data){
        return instance.post(api.cnkiDomain +"/api/LiveCourse/CheckStatus",  data );
    },
}
