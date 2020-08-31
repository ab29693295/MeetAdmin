import React, {Component} from "react";
import {Button, Input, Form, Checkbox, Spin} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import styles from './css/index.module.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.submitFinish = this.submitFinish.bind(this)
    }

    componentDidMount() {
        //localStorage.clear()
    }

    //验证通过
    submitFinish(value) {
        console.log(value)
        localStorage.setItem('userId','123')
        this.props.history.push({
            pathname: '/'
        })
    }
    render() {
        return (
            <div className={styles.loginWrap}>

                <Form
                    name="normal_login"
                    className={styles.loginForm}
                    initialValues={{remember: true}}
                    onFinish={this.submitFinish}
                >
                    <Spin
                        spinning={this.state.loading}
                        tip='加载中...'
                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: '请输入用户名!'}]}
                            className={styles.formItem}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"
                                                         style={{color: 'rgba(0,0,0,.25)'}}/>} autoComplete="off"
                                   placeholder="用户名/手机号/邮箱"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: '请输入密码！'}]}
                            className={styles.formItem}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"
                                                      style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name='remember' valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                            <a className={styles.formSetting}>忘记密码</a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className={styles.formButton}
                                htmlType='submit'
                                type='primary'
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Spin>
                </Form>

            </div>
        )
    }
}

export default Login
