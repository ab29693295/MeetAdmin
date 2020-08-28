import React, {Component} from "react";
import { Redirect, withRouter, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import MeetList from '../MeetList'
const { Content } = Layout
class name extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
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
                        <Route
                            component={MeetList}
                            path='/meetList'
                                    />
                        <Redirect
                            from='/'
                            to='/error/404'
                        />

                    </Switch>
                </Content>
        )
    }
}

export default name
