import React, { Component } from "react";
import { Card, Form, Input, Button, DatePicker, Select, Radio, message } from 'antd';
import styles from './css/index.module.css'
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from '@/axios'

class NewUser extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Card title="添加用户">
                <Form
                    name="basic"
                    ref={this.form}
                    className={styles.form}
                >

                    <Form.Item
                        label="会议主题"
                        name="roomName"
                        rules={[{ required: true, message: '请填写会议主题！' }]}
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeholder='请输入会议主题' />
                    </Form.Item>
                </Form>
            </Card>
            )
    }
}

export default NewUser