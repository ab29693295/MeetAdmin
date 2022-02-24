import React, {Component} from "react";
import {Layout,Avatar,Dropdown,Menu,Space} from 'antd'
import styles from './css/index.module.css'
import {connect} from "react-redux";
import * as user from '@/redux/actions/user'
import * as menu from '@/redux/actions/menu'
import api from '@/path/index'
import Tags from './Tags'
import * as role from "@/redux/actions/role";
import {
    getALlRole
} from '@/axios/user'
const {Header} = Layout;

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.dropMenu=this.dropMenu.bind(this)
    }

    componentDidMount() {
        console.log('header')
        let {setAllRoles,allRoles}=this.props
        if(allRoles.length==0){
            getALlRole().then(res=>{
                if(res.success){
                    setAllRoles(res.response)
                }
            })
        }

    }

    dropMenu(){
        return (
            <Menu>
                {/*<Menu.Item key="0">*/}
                {/*    <a href="http://www.alipay.com/">个人信息</a>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item key="1">*/}
                {/*    <a href="http://www.taobao.com/">系统消息</a>*/}
                {/*</Menu.Item>*/}
                <Menu.Item key="2">
                    <span onClick={this.logout.bind(this)}>退出系统</span>
                </Menu.Item>
            </Menu>
        )
    }
    logout(){
        this.props.clearInfo();
    }
    render() {
        let {userInfo}=this.props
        return (
            <Header className={styles.header} >
                    <Tags/>
                    <div className={styles.user}>
                        <Space>
                            <span>欢迎您，{userInfo.trueName}</span>
                            <Dropdown overlay={this.dropMenu} trigger={['click']} placement='bottomCenter'>
                                <div className={styles.userImg}>
                                    {/*<Badge dot>*/}

                                    <Avatar
                                        size='large'
                                        src={api.tuDomain+userInfo.photo}
                                    />
                                    {/*</Badge>*/}
                                </div>
                            </Dropdown>
                        </Space>

                    </div>


            </Header>
        )
    }
}
const mapStateToProps = (state) =>//将state转到props
{
    return {
        userInfo: state.user.info,
        allRoles:state.role.allRoles
    };
};

const mapDispatchToProps = dispatch => ({
    clearInfo:()=>{
        dispatch(user.clearToken());
        dispatch(user.setUserInfo({}))
        dispatch(menu.setSiderMenu([]))
        dispatch(menu.setAllMenus([]));
    },
    setAllRoles:(allRoles)=>{
        dispatch(role.setAllRoles(allRoles));
    }

})
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent)


