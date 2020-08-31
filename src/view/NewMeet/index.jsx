import React, {Component} from "react";
import {Card, Form, Input, Button, Checkbox,DatePicker} from 'antd';
import styles from './css/index.module.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;
class NewMeet extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <Card title="会议预定" bordered={false}>
                <Form
                    name="basic"
                    initialValues={{remember: true}}
                    className={styles.form}
                >
                    <Form.Item
                        label="会议名称"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                        className={styles.formItem}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="会议时间"
                        name="timeRange"
                        rules={[{required: true, message: 'Please input your username!'}]}
                        className={styles.formItem}
                    >
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            locale={locale}
                        />
                    </Form.Item>
                    <Form.Item
                        label="会议密码（选填）"
                        name="code"
                        className={styles.formItem}
                     >
                        <Input placeholder='请输入4到6位数字密码'/>
                    </Form.Item>
                    <Form.Item  className={styles.formItem}>
                        <Button type="primary">预定会议</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default NewMeet
