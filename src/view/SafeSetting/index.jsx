import React, {Component} from "react";
import {Button, Card, Form, Input,Modal} from "antd";
import {resetUserPwd} from '@/axios/user.js'
import * as user from "@/redux/actions/user";
import * as menu from '@/redux/actions/menu'
import {connect} from "react-redux";
class SafeSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onFinish=this.onFinish.bind(this)
    }

    componentDidMount() {
    }
    onFinish(val){
        let {info}=this.props.user
        let {Oldpassword,Newpassword}=val
        resetUserPwd({Oldpassword,Newpassword,uID:info.id}).then(res=>{
            if(res.success){
                Modal.success({
                    content: '修改成功，即将退出重新登录！',
                    onOk() {
                        this.props.clearInfo();
                    },
                });
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Card title='安全设置' className='content-card'>
                <Form   className={'form'}
                        {...formItemLayout}
                        onFinish={this.onFinish}>
                    {/*<Form.Item*/}
                    {/*    name=""*/}
                    {/*    label="原始密码"*/}
                    {/*    tooltip="What do you want others to call you?"*/}
                    {/*    rules={[{ required: true, message: '请填写原始密码!', whitespace: true }]}*/}
                    {/*>*/}
                    {/*    <Input disabled/>*/}
                    {/*</Form.Item>*/}
                    <Form.Item
                        name="Oldpassword"
                        label="原始密码"
                        rules={[{ required: true, message: '请填写原始密码!', whitespace: true }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="Newpassword"
                        label="新密码"
                        tooltip='长度至少为8，至少含有一个字母和一个数字'
                        rules={[
                            {
                                required: true,
                                message: '请填写新密码',
                                whitespace: true
                            },
                            {
                                required: false,
                                pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "g"),
                                message: '长度至少为8，至少含有一个字母和一个数字！',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password autoComplete='new-password'/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认新密码"
                        dependencies={['Newpassword']}
                        hasFeedback
                        tooltip='长度至少为8，至少含有一个字母和一个数字'
                        rules={[
                            {
                                required: true,
                                message: '请确认新密码!',
                                whitespace: true
                            },
                            {
                                required: false,
                                pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "g"),
                                message: '长度至少为8，至少含有一个字母和一个数字！',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('Newpassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次密码填写不一致!'));
                                },
                            })
                        ]}
                    >
                        <Input.Password autoComplete='new-password'/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

const mapStateToProps = (state) =>//将state转到props
{
    return {
        user: state.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        clearInfo:()=>{
            dispatch(user.clearToken());
            dispatch(user.setUserInfo({}))
            dispatch(menu.setSiderMenu([]))
            dispatch(menu.setAllMenus([]));
        }
    };
};
export default connect(//关联store和组件
    mapStateToProps,
    mapDispatchToProps
)(SafeSetting)

