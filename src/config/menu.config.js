import React from "react";
import {
    BarChartOutlined,
    SnippetsOutlined,
    AppstoreOutlined,
    TeamOutlined,
    SettingOutlined,
} from '@ant-design/icons';
export default [
    {
        title: '会议管理', icon: <SnippetsOutlined />,key:'meet',
        children: [
            { path: '/meet/meetList', title: '会议列表' },
            { path: '/meet/newMeet', title: '新建会议' }
        ]
    },
    {
        title: '统计管理', icon: <BarChartOutlined />,key:'tj',
        children: [
            { path: '/tj/meetTj', title: '会议统计' }
        ]
    },
    {
        title: '权限管理', icon: <TeamOutlined/>,key:'3',
        children: [

        ]
    },

    {
        title: '系统管理', icon: <AppstoreOutlined />,key:'msg',
        children: [
            { path: '/msg/message', title: '系统消息' }
        ]
    },
    {
        title: '用户管理', icon: <SettingOutlined />, key: 'usermanage',
        children: [
            { path: '/usermanage/userList', title: '用户列表' }
            
        ]
    },
    {
        title: '账号管理', icon: <SettingOutlined />,key:'user',
        children: [
            { path: '/user/userInfo', title: '个人信息' },
            { path: '/user/safeSetting', title: '安全设置' }
        ]
    }
    
]
