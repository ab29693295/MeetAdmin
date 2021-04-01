import React, { Component } from "react";
import { Card, Form, Input, Button, DatePicker, Select, Radio, message } from 'antd';
import styles from './css/index.module.css'
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from '@/axios'
const { Option } = Select;

class NewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RoleList:[],
            sex: 0
        }
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            sex: e.target.value,
        });
    };

    render() {

        let {RoleList}=this.state
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { sexvalue } = this.state.sex;

        return (
            <Card title="新增用户">
                <Form
                    name="basic"
                    ref={this.form}
                    className={styles.form}
                >

                    <Form.Item
                        label="用户名："
                        name="username"
                        rules={[{ required: true, message: '用户名为必填信息' }]}
                        className={styles.formItem}
                        {...formItemLayout}
                    >
                        <Input autoComplete='off' placeholder='请输入用户名！' />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="密码：">
                        <Input type="password"  placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item
                        label="真实姓名："
                        name="truename"
                        rules={[{ required: true, message: '真实姓名为必填信息' }]}
                        className={styles.formItem}
                        {...formItemLayout}
                    >
                        <Input autoComplete='off' placeholder='请输入真实姓名！' />
                    </Form.Item>
                    <Form.Item
                        label="性别："
                        name="sex"
                        className={styles.formItem}
                        {...formItemLayout}
                    >
                        <Radio.Group onChange={this.onChange} value={sexvalue}>
                            <Radio value={0} >男</Radio>
                            <Radio value={1}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="用户角色："
                        name="appID"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true,message:'请选择用户角色！'  }]}
                    >
                        <Select placeholder="请选择用户角色" onChange={this.handleAppName}>
                            {
                                RoleList.map((item)=>{
                                    return (
                                        <Option value={item.appID} key={item.appID} data={item.appName}>{item.appName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="手机号："
                        name="phone"
                        rules={[{ required: true, message: '手机号为必填信息' }]}
                        className={styles.formItem}
                        {...formItemLayout}
                    >
                        <Input autoComplete='off' placeholder='请输入手机号！' />
                    </Form.Item>
                    <Form.Item
                        label="邮箱："
                        name="email"
                        rules={[{ required: true, message: '邮箱为必填信息' }]}
                        className={styles.formItem}
                        {...formItemLayout}
                    >
                        <Input autoComplete='off' placeholder='请输入邮箱！' />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="备注："
                        name="address"
                       >
                        <Input.TextArea placeholder="地址"    />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="备注："
                        name="des"
                       >
                        <Input.TextArea placeholder="请输入备注！" />
                    </Form.Item>
                    <Form.Item className={styles.formBtn}>
                        <Button type="primary" htmlType='submit'>确定</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default NewUser