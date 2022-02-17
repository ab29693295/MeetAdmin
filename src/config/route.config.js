import MeetList from '@/view/MeetList'
import NewMeet from "@/view/NewMeet"
import MeetTj from '@/view/MeetTj'
import UserInfo from '@/view/UserInfo'
import SafeSetting from '@/view/SafeSetting'
//import SystemMsg from '@/view/SystemMsg'
import Error from '@/view/Error'
import UserManage from '@/view/UserManage'
import Home from '@/view/Home'
import NewUser from '@/view/NewUser'
import ProjectList from '@/view/ProjectList'
import ProjectDetail from '@/view/ProjectDetail'//机构详情
import NewProject from '@/view/NewProject'
import MeetDetail from '@/view/MeetDetail'
import OperationList from '@/view/OperationList'
import UserDetail from '@/view/UserDetail'//用户详情
import JudgeRole from '@/view/JudgeRole'//角色权限
import JudgeMenu from '@/view/JudgeMenu'//菜单权限
export const routes=[
    { path: '/', component: Home},
    { path: '/home', component: Home},
    { path: '/meet/meetList', component: MeetList},
    { path: '/meet/newMeet', component: NewMeet},
    { path: '/meet/meetDetail/:id', component: MeetDetail},
    { path: '/project/projectList', component: ProjectList},
    { path: '/project/newProject', component: NewProject},
    { path: '/project/detail/:id', component: ProjectDetail},
    { path: '/tj/meetTj', component: MeetTj},
    { path: '/account/userInfo', component: UserInfo},
    { path: '/account/safeSetting', component: SafeSetting},
    { path: '/user/userList', component: UserManage },
    { path: '/user/detail/:id', component: UserDetail },
    { path: '/user/newUser', component: NewUser },
    { path: '/judge/role', component: JudgeRole },
    { path: '/judge/menu', component: JudgeMenu },
    { path: '/journal/operationList', component: OperationList },
    { path: '/error', component: Error}
]

