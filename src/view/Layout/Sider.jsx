import React, {Component} from "react";
import { Layout,Menu} from 'antd'
import { Link } from 'react-router-dom'

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

    }

    render() {
        console.log(this.props)
        return (
            <Sider width={180} className={styles.sider} >
                <div className={styles.logo} >视频会议管理系统</div>
                <Menu theme="dark" mode="inline" defaultOpenKeys={['1']} defaultSelectedKeys={['1-1']} >
                    {
                        menu.map((ele)=>{
                            return (
                                <SubMenu title={ele.title} key={ele.key}>
                                    {ele.children.map((child)=>{
                                        return(
                                            <Menu.Item key={child.path}>
                                                <Link to={child.path}>{child.title}</Link>
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
const mapStateToProps = (state) =>//将state转到props
{
    return {
        menu : state.menu,
    };
};

export default connect(//关联store和组件
    mapStateToProps
)(SiderComponent)
