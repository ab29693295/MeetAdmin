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
import JournalLogin from '@/view/JournalLogin'//登录日志
import JournalFoot from '@/view/JournalFoot'//访问日志
import UserDetail from '@/view/UserDetail'//用户详情
import JudgeRole from '@/view/JudgeRole'//角色权限
import JudgeMenu from '@/view/JudgeMenu'//菜单权限
import store from '@/redux/store.js'
let siderList=store.getState().menu.siderList
let siderListCopy=JSON.parse(JSON.stringify(siderList))
function treeForeach (tree, func) {
    let node, list = [...tree]
    while (node = list.shift()) {
        func(node)
        node.permissionchildList && list.push(...node.permissionchildList)
    }
}
let arr=[]
treeForeach(siderListCopy, node => {
   arr.push(node)
})
const routes=[
    { path: '/', component: Home},
    { path: '/home', component: Home},
    { path: '/meet/meetList', component: MeetList},
    { path: '/meet/newMeet', component: NewMeet},
    { path: '/project/projectList', component: ProjectList},
    { path: '/project/newProject', component: NewProject},
    { path: '/statistics/meetTj', component: MeetTj},
    { path: '/account/userInfo', component: UserInfo},
    { path: '/account/safeSetting', component: SafeSetting},
    { path: '/user/userList', component: UserManage },
    { path: '/user/newUser', component: NewUser },
    { path: '/judge/role', component: JudgeRole },
    { path: '/judge/menu', component: JudgeMenu },
    { path: '/journal/loginLog', component: JournalLogin },
    { path: '/journal/footLog', component: JournalFoot },
]
const noPower=[
    { path: '/error', component: Error,routerPower:true},
    { path: '/meet/meetDetail/:id', component: MeetDetail,routerPower:true},
    { path: '/project/detail/:id', component: ProjectDetail,routerPower:true},
    { path: '/user/detail/:id', component: UserDetail,routerPower:true },
]
export function setPower(){
    for(let i=0;i<routes.length;i++){
         routes[i].routerPower=false
         for(let j=0;j<arr.length;j++){
             if(routes[i].path==arr[j].permissonUrl){
                 routes[i].routerPower=true
             }
         }
     }
    console.log(routes)
    return routes.concat(noPower)
}


