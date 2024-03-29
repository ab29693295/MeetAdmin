import React, {Component} from "react";
import {connect} from "react-redux";
import {message,Button, Input, Form, Checkbox, Spin} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import styles from './css/index.module.css'
import axios from '../../axios'
import * as user from "../../redux/actions/user";
import * as menu from "../../redux/actions/menu";
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.submitFinish = this.submitFinish.bind(this)
    }

    componentDidMount() {
        this.props.clearInfo();
    }
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return
        }
    }

    //验证通过
    submitFinish(value) {
        let returnUrl=this.props.location.state?this.props.location.state:'/';
        this.setState({
            loading:true
        })
        let {setToken,setUserInfo,setSiderMenu}=this.props
        axios.userLogin({userName:value.username,PassWord:value.password}).then((res)=>{
            if(res.success){
                setToken(res.response.token)
                setUserInfo(res.response.userInfo)
                if(res.response.permissionList){
                    setSiderMenu(res.response.permissionList)
                }
                this.props.history.push({
                    pathname: returnUrl
                })
            }else{
                message.error(res.msg);
            }
            this.setState({
                loading:false
            })
        })
    }
    render() {
        return (
            <div className={styles.loginWrap}>
                <div  className={styles.loginForm}>
                    <h2 className={styles.title}>视频会议管理后台</h2>
                    <Form
                        name="normal_login"
                        initialValues={{remember: true}}
                        onFinish={this.submitFinish}
                    >
                        {/*<Spin*/}
                        {/*    spinning={this.state.loading}*/}
                        {/*    tip='加载中...'*/}
                        {/*>*/}
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: '请输入用户名!'}]}
                            className={'formItem'}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"
                                                         style={{color: 'rgba(0,0,0,.25)'}}/>} autoComplete="off"
                                   placeholder="用户名/手机号/邮箱"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: '请输入密码！'}]}
                            className={'formItem'}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"
                                                      style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="密码"
                                autoComplete="off"
                            />
                        </Form.Item>
                        {/*<Form.Item>*/}
                            {/*<Form.Item name='remember' valuePropName="checked" noStyle>*/}
                            {/*    <Checkbox>记住密码</Checkbox>*/}
                            {/*</Form.Item>*/}

                            {/*<a className={styles.formSetting}>忘记密码</a>*/}


                        {/*</Form.Item>*/}

                        <Form.Item>
                            <Button
                                className={styles.formButton}
                                htmlType='submit'
                                type='primary'
                                loading={this.state.loading}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/*</Spin>*/}


            </div>
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
)(Login)

