export default [
    {
        title: '会议管理', icon: 'UserOutlined',key:'1',
        children: [
            { path: '/meetList', title: '会议列表' }
        ]
    },
    {
        title: '统计管理', icon: 'UserOutlined',key:'2',
        children: [
            { path: '/meetTj', title: '会议统计' }
        ]
    },
    {
        title: '权限管理', icon: 'UserOutlined',key:'3',
        children: [

        ]
    },

    {
        title: '系统管理', icon: 'UserOutlined',key:'5',
        children: [
            { path: '/message', title: '系统消息' }
        ]
    },
    {
        title: '账号管理', icon: 'UserOutlined',key:'4',
        children: [
            { path: '/user', title: '个人信息' },
            { path: '/safeSetting', title: '安全设置' }
        ]
    }
]
