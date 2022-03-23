import React, {Component} from 'react';
import {getUrlParam} from '@/common/js/tools.js'
import {actToAdmin} from '@/axios/user'
import * as user from "../../redux/actions/user";
import * as menu from "../../redux/actions/menu";
import {connect} from "react-redux";
import {Result} from "antd";
 class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status:'success',
            title:'自动登录中，请稍后...'
        };
    }
    componentDidMount() {
        let {setToken,setUserInfo,setSiderMenu,clearInfo}=this.props
        let key=getUrlParam('key')
        if(key&&key!=''){
            actToAdmin({token:key}).then(res=>{
                clearInfo()
                if(res.success){
                    setToken(res.response.token)
                    setUserInfo(res.response.userInfo)
                    if(res.response.permissionList){
                        setSiderMenu(res.response.permissionList)
                    }
                    this.setState({
                        status:'success',
                        title:'登录成功'
                    })
                    this.props.history.push({
                        pathname: '/'
                    })
                }else{
                    this.setState({
                        status:'error',
                        title:res.msg
                    })
                    // message.error(res.msg);
                }
            }).catch(()=>{
                // clearToken()
                this.setState({
                    status:'error',
                    title:'登录失败，请重试'
                })
            })
        }else{
            this.setState({
                status:'error',
                title:'未携带有效凭证'
            })
        }
    }

    render() {
        let {status,title}=this.state
        return (
            <Result
                status={status}
                title={title}
                extra={[

                ]}
            />
        )
    }
}
const mapStateToProps = (state) =>//将state转到props
{
    return {
        user: state.user,
        menu : state.menu,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setToken:(token)=>{
            dispatch(user.setToken(token));
        },
        setUserInfo:(info)=>{
            dispatch(user.setUserInfo(info));
        },
        clearToken:()=>{
            dispatch(user.clearToken());
        },
        setSiderMenu : (list) =>//设置房间id
        {
            dispatch(menu.setSiderMenu(list));
        },
        clearInfo:()=>{
            dispatch(user.clearToken());
            dispatch(user.setUserInfo({}))
            dispatch(menu.setSiderMenu([]))
            dispatch(menu.setAllMenus([]));
        },

    };
};
export default connect(//关联store和组件
    mapStateToProps,
    mapDispatchToProps
)(Loading)