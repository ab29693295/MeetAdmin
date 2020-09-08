import MeetList from '../view/MeetList'
import NewMeet from "../view/NewMeet"
import MeetTj from '../view/MeetTj'
import UserInfo from '../view/UserInfo'
import SafeSetting from '../view/SafeSetting'
import SystemMsg from '../view/SystemMsg'
import Error from '../view/error'
export const routes=[
    { path: '/meetList', component: MeetList},
    { path: '/newMeet', component: NewMeet},
    { path: '/meetTj', component: MeetTj},
    { path: '/userInfo', component: UserInfo},
    { path: '/safeSetting', component: SafeSetting},
    { path: '/message', component: SystemMsg},
    { path: '/error', component: Error}
]

