import React, {Component} from "react";
import { Layout,Menu} from 'antd'
import { Link,withRouter } from 'react-router-dom'
import styles from './css/index.module.css'
import {getSiderList} from '@/config/menu.config'
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
        let openKey=window.location.pathname.match(/^\/(\w+)/)?window.location.pathname.match(/^\/(\w+)/)[1]:'';
        let selectKey=this.props.location.pathname;
        return (
            <Sider width={180} className={styles.sider} >
                <div className={styles.logo} >会议管理系统</div>
                <Menu theme="dark" mode="inline"  selectedKeys={[selectKey]} defaultOpenKeys={[openKey]}>
                    {
                        getSiderList().map((ele)=>{
                            if((ele.children&&ele.children.length>0) || ele.permissonType==1){
                                //icon={<Icon type={item.icon} />}
                                return <SubMenu title={ele.title} key={ele.key} >
                                    {ele.children && ele.children.map((child)=>{
                                        return(
                                            <Menu.Item key={child.path}>
                                                <Link to={{
                                                    pathname:child.path,
                                                    // state:{key:ele.key},
                                                }} >{child.title}</Link>
                                            </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                            }else{
                                return <Menu.Item key={ele.key} icon={ele.icon}>
                                    <Link to={{
                                        pathname:ele.path,
                                    }} >{ele.title}</Link>
                                </Menu.Item>
                            }
                        })
                    }
                </Menu>
        </Sider> )
    }
}


export default withRouter(SiderComponent)
