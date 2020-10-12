import MeetList from '../view/MeetList'
import NewMeet from "../view/NewMeet"
import MeetTj from '../view/MeetTj'
import UserInfo from '../view/UserInfo'
import SafeSetting from '../view/SafeSetting'
import SystemMsg from '../view/SystemMsg'
import Error from '../view/error'
export const routes=[
    { path: '/meet/meetList', component: MeetList},
    { path: '/meet/newMeet', component: NewMeet},
    { path: '/tj/meetTj', component: MeetTj},
    { path: '/user/userInfo', component: UserInfo},
    { path: '/user/safeSetting', component: SafeSetting},
    { path: '/msg/message', component: SystemMsg},
    { path: '/error', component: Error}
]

