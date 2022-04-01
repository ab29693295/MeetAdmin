import React, {Component} from "react";
import {Layout,Avatar,Dropdown,Menu,Space} from 'antd'
import { DownOutlined } from '@ant-design/icons';
import styles from './css/index.module.css'
import {connect} from "react-redux";
import * as user from '@/redux/actions/user'
import * as menu from '@/redux/actions/menu'
import * as set from '@/redux/actions/set'
import api from '@/path/index'
import Tags from './Tags'
import {setAllRoles,setAllProjects} from "@/redux/actions/set";
import {
    getALlRole
} from '@/axios/user'
import {
    selectProject
} from '@/axios/project'
const {Header} = Layout;

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.dropMenu=this.dropMenu.bind(this)
    }

    componentDidMount() {
        let {setAllRoles,allRoles,allProjects,setAllProjects}=this.props
        if(allRoles.length==0){
            getALlRole().then(res=>{
                if(res.success){
                    setAllRoles(res.response)
                }
            })
        }
        if(allProjects.length==0){
            selectProject({key:'',liveType:0}).then(res=>{
                if(res.success){
                    setAllProjects(res.response)
                }
            })
        }
    }

    dropMenu(){
        return (
            <Menu style={{textAlign:'center'}}>
                {/*<Menu.Item key="0">*/}
                {/*    <a href="http://www.alipay.com/">个人信息</a>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item key="1">*/}
                {/*    <a href="http://www.taobao.com/">系统消息</a>*/}
                {/*</Menu.Item>*/}
                <Menu.Item key="2" onClick={this.logout.bind(this)}>
                    <span >退出系统</span>
                </Menu.Item>
            </Menu>
        )
    }
    logout(){
        this.props.clearInfo();
        window.location.href='/login'
    }
    render() {
        let {userInfo}=this.props
        return (
            <Header className={styles.header} >
                    <Tags/>
                    <div className={styles.user}>
                        <Space>

                            <Dropdown overlay={this.dropMenu} trigger={['click']} placement='bottomCenter' arrow>
                                <div className={styles.userImg}>
                                    {/*<Badge dot>*/}
                                    <Space>
                                        <Avatar
                                            size='large'
                                            src={api.tuDomain+userInfo.photo}
                                        />
                                        <span>{userInfo.trueName}</span>
                                        <DownOutlined style={{ fontSize: '12px',color:'#999' }}/>
                                    </Space>

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
        allRoles:state.set.allRoles,
        allProjects:state.set.allProjects
    };
};

const mapDispatchToProps = dispatch => ({
    clearInfo:()=>{
        dispatch(user.clearToken());
        dispatch(user.setUserInfo({}))
        dispatch(menu.setSiderMenu([]))
        dispatch(menu.setAllMenus([]));
        dispatch(set.setAllProjects([]));
        dispatch(set.setAllRoles([]));

    },
    setAllRoles:(allRoles)=>{
        dispatch(set.setAllRoles(allRoles));
    },
    setAllProjects:(allProjects)=>{
        dispatch(set.setAllProjects(allProjects));
    }

})
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent)


