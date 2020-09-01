import MeetList from '../view/MeetList'
import NewMeet from "../view/NewMeet"
import MeetTj from '../view/MeetTj'
import Error from '../view/error'
export const routes=[
    { path: '/meetList', component: MeetList},
    { path: '/newMeet', component: NewMeet},
    { path: '/meetTj', component: MeetTj},
    { path: '/error', component: Error}
]

