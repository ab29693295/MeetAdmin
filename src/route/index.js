import React, { useCallback,useEffect } from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import AsyncComponent from "../AsyncComponent";
import {useSelector, useDispatch} from 'react-redux'
/*路由配置*/
const Login = AsyncComponent(() => import("../view/Login")); //登录
const Layout = AsyncComponent(() => import("../view/Layout")); //


function RoutesIndex(){
    const token = useSelector(state => state.user.token)
    //跳转路由前
    const beforeEnter=((Component,props)=>{
        if (token) {
           return <Component {...props}/>
        }else{
            return <Redirect to={{
                pathname:'/login'
            }} from='/' />
        }
    });
    return <div>
             <Switch>
                 <Route exact path="/login" component={Login}/>
                 {/*<Route  path="/" component={Comp(Layout)}/>*/}
                 <Route path='/' render={(props)=>(beforeEnter(Layout,props))}/>
             </Switch>
         </div>
}
export default RoutesIndex;
