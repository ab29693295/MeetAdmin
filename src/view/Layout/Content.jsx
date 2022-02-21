import React, {Component} from "react";
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd'
import {setPower} from '../../config/route.config'
const {Content} = Layout
class name extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }
    beforeEnter(Component,routerPower,props){
        if (routerPower) {
            return <Component {...props}/>
        }else{
            return  <Redirect exact to='/error'/>
        }
    };

    render() {
        return (
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                <Switch>
                    {
                        setPower().map(ele => {
                            return <Route
                                exact
                                // component={ele.component}
                                key={ele.path}
                                path={ele.path}
                                render={(props) => this.beforeEnter( ele.component,ele.routerPower,props)}
                            />
                        })
                    }
                    <Redirect exact to='/error'/>
                </Switch>
            </Content>
        )
    }
}


export default name
