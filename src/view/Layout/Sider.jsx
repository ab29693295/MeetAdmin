import React, {Component} from "react";
import { Layout,Menu} from 'antd'
import { Link } from 'react-router-dom'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import styles from './css/index.module.css'
import * as menu from "../../redux/actions/menu";
import {connect} from "react-redux";
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
        let {siderList}=this.props.menu
        return (
            <Sider width={180} className={styles.sider} >
                <div className={styles.logo} >视频会议管理系统</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleMenu}>
                    <SubMenu key="1" icon={<UserOutlined />} title="会议管理">
                        <Menu.Item key="1-1">
                            <Link to={'/meetList'}>会议列表</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="2"  icon={<UserOutlined />}>统计管理</Menu.Item>
                    <Menu.Item key="3"  icon={<UserOutlined />}>权限管理</Menu.Item>
                    <Menu.Item key="4"  icon={<UserOutlined />}>帐号管理</Menu.Item>

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
