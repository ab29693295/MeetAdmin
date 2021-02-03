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
            <Card title="新增用户">
                <Form
                    name="basic"
                    ref={this.form}
                    className={styles.form}
                >

                    <Form.Item
                        label="��������"
                        name="roomName"
                        rules={[{ required: true, message: '����д�������⣡' }]}
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeholder='�������������' />
                    </Form.Item>
                </Form>
            </Card>
            )
    }
}

export default NewUser