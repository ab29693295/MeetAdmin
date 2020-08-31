import MeetList from '../view/MeetList'
import NewMeet from "../view/NewMeet";
import Error from '../view/error'
export const routes=[
    { path: '/meetList', component: MeetList},
    { path: '/newMeet', component: NewMeet},
    { path: '/error', component: Error},
]

