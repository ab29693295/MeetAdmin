import MeetList from '../view/MeetList'
import NewMeet from "../view/NewMeet"
import MeetTj from '../view/MeetTj'
import UserInfo from '../view/UserInfo'
import SafeSetting from '../view/SafeSetting'
//import SystemMsg from '../view/SystemMsg'
import Error from '../view/error'
import UserManage from '../view/UserManage'
import Home from '../view/Home'
import NewUser from '../view/NewUser'
import ProjectList from '../view/ProjectList'
import NewProject from '../view/NewProject'
import MeetDetail from '../view/MeetDetail'
import OperationList from '../view/OperationList'
import UserDetail from '@/view/UserDetail'//用户详情
export const routes=[
    { path: '/', component: Home},
    { path: '/home', component: Home},
    { path: '/meet/meetList', component: MeetList},
    { path: '/meet/newMeet', component: NewMeet},
    { path: '/meet/meetDetail/:id', component: MeetDetail},
    { path: '/project/projectList', component: ProjectList},
    { path: '/project/newProject', component: NewProject},
    { path: '/tj/meetTj', component: MeetTj},
    { path: '/account/userInfo', component: UserInfo},
    { path: '/account/safeSetting', component: SafeSetting},
    { path: '/user/userList', component: UserManage },
    { path: '/user/detail/:id', component: UserDetail },
    { path: '/user/newUser', component: NewUser },
    { path: '/journal/operationList', component: OperationList },
    { path: '/error', component: Error}
]

