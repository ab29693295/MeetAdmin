import React from "react";
import {
    BarChartOutlined,
    SnippetsOutlined,
    AppstoreOutlined,
    LockOutlined,
    SettingOutlined,
    HomeOutlined,
    ClusterOutlined,
    ContainerOutlined
} from '@ant-design/icons';
import store from '@/redux/store.js'
export function getSiderList(){
    let siderList=store.getState().menu.siderList
    let list = a2b(siderList);
    return list
}
function a2b(ls){
    return ls.map(obj=>{
        let result = {}
        if(obj.permissionchildList && obj.permissionchildList.length > 0){
            result.title=obj.name;
            result.path=obj.permissonUrl;
            result.key=obj.permissonUrl.slice(1)
            result.children=a2b(obj.permissionchildList)
            return result
        } else {
            result.title=obj.name;
            result.key=obj.permissonUrl.slice(1)
            result.path=obj.permissonUrl;
            return result
        }
    })
}

// export default [
//     {
//         title: '首页', icon:<HomeOutlined />, key: '/', path: '/',
//         children: []
//     },
//     {
//         title: '会议管理', icon: <SnippetsOutlined />,key:'meet',
//         children: [
//             { path: '/meet/meetList', title: '会议列表' },
//             { path: '/meet/newMeet', title: '新建会议' }
//         ]
//     },
//     {
//         title: '机构管理', icon: <ClusterOutlined />,key:'project',
//         children: [
//             { path: '/project/projectList', title: '机构列表' },
//             { path: '/project/newProject', title: '新建机构' }
//         ]
//     },
//     {
//         title: '统计管理', icon: <BarChartOutlined />,key:'tj',
//         children: [
//             { path: '/tj/meetTj', title: '会议统计' }
//         ]
//     },
//     {
//         title: '权限管理', icon: <LockOutlined />,key:'judge',
//         children: [
//             { path: '/judge/role', title: '角色管理' },
//             { path: '/judge/menu', title: '菜单管理' },
//         ]
//     },
//
//     {
//         title: '系统管理', icon: <AppstoreOutlined />,key:'msg',
//         children: [
//             { path: '/msg/message', title: '系统消息' }
//         ]
//     },
//     {
//         title: '用户管理', icon: <SettingOutlined/>, key: 'usermanage',
//         children: [
//             { path: '/user/userList', title: '用户列表' },
//             { path: '/user/newUser', title: '添加用户' }
//
//         ]
//     },
//     {
//         title: '日志管理', icon: <ContainerOutlined />, key: 'journal',
//         children: [
//             { path: '/journal/operationList', title: '操作日志' },
//             { path: '/journal/newUser', title: '会议日志' }
//
//         ]
//     },
//     {
//         title: '账号管理', icon: <SettingOutlined />,key:'user',
//         children: [
//             { path: '/account/userInfo', title: '个人信息' },
//             { path: '/account/safeSetting', title: '安全设置' }
//         ]
//     }
//
// ]
