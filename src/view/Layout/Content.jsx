import React, {Component} from "react";
import {Redirect, withRouter, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd'
import {routes} from '../../config/route.config'


const {Content} = Layout

class name extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    handleFilter(permission) {

        const roles = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).roles
        if (!permission || permission === roles) {
            return true
        } else {
            return false
        }
    }


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
                        routes.map(ele => {
                            return this.handleFilter(ele.permission) && <Route
                                exact
                                component={ele.component}
                                key={ele.path}
                                path={ele.path}
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
