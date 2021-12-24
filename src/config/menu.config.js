import React from "react";
import {
    BarChartOutlined,
    SnippetsOutlined,
    AppstoreOutlined,
    TeamOutlined,
    SettingOutlined,
    HomeOutlined,
    ClusterOutlined,
    ContainerOutlined
} from '@ant-design/icons';
export default [
    {
        title: '首页', icon:<HomeOutlined />, key: '/', path: '/',
        children: []
    },
    {
        title: '会议管理', icon: <SnippetsOutlined />,key:'meet',
        children: [
            { path: '/meet/meetList', title: '会议列表' },
            { path: '/meet/newMeet', title: '新建会议' }
        ]
    },
    {
        title: '机构管理', icon: <ClusterOutlined />,key:'project',
        children: [
            { path: '/project/projectList', title: '机构列表' },
            { path: '/project/newProject', title: '新建机构' }
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
        title: '用户管理', icon: <SettingOutlined/>, key: 'usermanage',
        children: [
            { path: '/usermanage/userList', title: '用户列表' },
            { path: '/usermanage/newUser', title: '添加用户' }

        ]
    },
    {
        title: '日志管理', icon: <ContainerOutlined />, key: 'journal',
        children: [
            { path: '/journal/operationList', title: '操作日志' },
            { path: '/journal/newUser', title: '会议日志' }

        ]
    },
    // {
    //     title: '直播管理', icon: <SettingOutlined />,key:'live',
    //     children: [
    //         { path: '/live/liveList', title: '直播列表' },
    //         { path: '/live/newLive', title: '新建直播' },
    //         { path: '/live/platformManage', title: '平台管理' },
    //         { path: '/live/userManage', title: '用户管理' }
    //     ]
    // },
    {
        title: '账号管理', icon: <SettingOutlined />,key:'user',
        children: [
            { path: '/user/userInfo', title: '个人信息' },
            { path: '/user/safeSetting', title: '安全设置' }
        ]
    }

]
