import React, { Component } from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import AsyncComponent from "../AsyncComponent";

/*路由配置*/
const Login = AsyncComponent(() => import("../view/Login")); //登录
const Layout = AsyncComponent(() => import("../view/Layout")); //

class RoutesIndex extends Component {
    constructor() {
        super();
        this.state = {
            login: false
        };
    }
    componentDidMount() {

    }
    render() {
        console.log()
        return (
            <div>
                {
                    !localStorage.getItem('userId') ?
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Redirect to='/login'/>
                        </Switch> :
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Route path="/" component={Layout} />
                        </Switch>
                }

            </div>
        );
    }
}

export default RoutesIndex;
