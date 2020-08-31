import React, { Component } from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import AsyncComponent from "../AsyncComponent";
import Comp from './login'
/*路由配置*/
const Login = AsyncComponent(() => import("../view/Login")); //登录
const Layout = AsyncComponent(() => import("../view/Layout")); //

class RoutesIndex extends Component {
    constructor() {
        super();

    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route  path="/" component={Comp(Layout)}/>
                </Switch>
            </div>
        );
    }
}

export default RoutesIndex;
