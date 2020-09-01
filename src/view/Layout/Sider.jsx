import React, {Component} from "react";
import { Layout,Menu} from 'antd'
import { Link,withRouter } from 'react-router-dom'

import styles from './css/index.module.css'
import {connect} from "react-redux";
import menu from '../../config/menu.config'
const { Sider } = Layout
const { SubMenu } = Menu;

class SiderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        console.log()

    }

    render() {
        let {pathname,state}=this.props.history.location;

        return (
            <Sider width={180} className={styles.sider} >
                <div className={styles.logo} >视频会议管理系统</div>
                <Menu theme="dark" mode="inline" defaultOpenKeys={[state.key]} defaultSelectedKeys={[pathname]} >
                    {
                        menu.map((ele)=>{
                            return (
                                <SubMenu title={ele.title} key={ele.key}>
                                    {ele.children.map((child)=>{
                                        return(
                                            <Menu.Item key={child.path}>
                                                <Link to={{
                                                    pathname:child.path,
                                                    state:{key:ele.key},
                                                }} >{child.title}</Link>
                                            </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                            )
                        })
                    }
                </Menu>
        </Sider> )
    }
}


export default withRouter(SiderComponent)
