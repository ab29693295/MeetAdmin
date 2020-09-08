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
        title: '会议管理', icon: <SnippetsOutlined />,key:'1',
        children: [
            { path: '/meetList', title: '会议列表' }
        ]
    },
    {
        title: '统计管理', icon: <BarChartOutlined />,key:'2',
        children: [
            { path: '/meetTj', title: '会议统计' }
        ]
    },
    {
        title: '权限管理', icon: <TeamOutlined/>,key:'3',
        children: [

        ]
    },

    {
        title: '系统管理', icon: <AppstoreOutlined />,key:'5',
        children: [
            { path: '/message', title: '系统消息' }
        ]
    },
    {
        title: '账号管理', icon: <SettingOutlined />,key:'4',
        children: [
            { path: '/userInfo', title: '个人信息' },
            { path: '/safeSetting', title: '安全设置' }
        ]
    }
]
