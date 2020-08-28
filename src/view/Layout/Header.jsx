import React, {Component} from "react";
import {Layout, Icon, Popover,Avatar,Dropdown,Menu,Badge} from 'antd'
import styles from './css/index.module.css'
import * as menu from "../../redux/actions/menu";
import {connect} from "react-redux";
import menuList from '../../config/menu.config'
import {
    DownOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
const {Header} = Layout;

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.dropMenu=this.dropMenu.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
    }

    dropMenu(){
        return (
            <Menu>
                <Menu.Item key="0">
                    <a href="http://www.alipay.com/">个人资料</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">系统管理</a>
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        return (
            <Header className={styles.header} >
                    <Dropdown overlay={this.dropMenu} trigger={['click']} placement='bottomCenter'>
                        <div className={styles.userImg}>
                            <Badge dot>
                            <Avatar
                                size='large'
                                // src={userInfo.avatar}
                            />
                            </Badge>
                        </div>
                    </Dropdown>

            </Header>
        )
    }
}
const mapStateToProps = (state) =>//将state转到props
{
    return {
        menu : state.menu,
    };
};
const mapDispatchToProps = (dispatch) =>
{
    return {
        setSiderMenu : (list) =>//设置房间id
        {
            dispatch(menu.setSiderMenu(list));
        }
    };
};
export default connect(//关联store和组件
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent)

