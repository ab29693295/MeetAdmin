import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AsyncComponent from "../AsyncComponent";

/*路由配置*/
const Login = AsyncComponent(() => import("../view/Login")); //会议选择房间
class RoutesIndex extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route  path="/login" component={Login}/>
                    <Route  path="/" component={Login} />
                </Switch>
            </div>
        );
    }
}

export default RoutesIndex;
