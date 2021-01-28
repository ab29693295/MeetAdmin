import React, {Component} from "react";
import { Card, Form, Input, Button, Checkbox, DatePicker, Select, Radio } from 'antd';
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
                    size='large'
                >
                    <Form.Item
                        label="会议主题"
                        name="username"
                        rules={[{required: true, message: '请填写会议名称！'}]}
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeholder='请输入会议主题'/>
                    </Form.Item>
                    <Form.Item
                        label="会议时间"
                        name="timeRange"
                        rules={[{required: true, message: '请选择会议时间！'}]}
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
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
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                     >
                        <Input placeholder='请输入4到6位数字密码'/>
                    </Form.Item>
                    <Form.Item
                        label="是否公开"
                        name="isPublic"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Radio.Group onChange={this.onChange} value={1}>
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="锁定状态"
                        name="isLock"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Radio.Group onChange={this.onChange} value={1}>
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item  className={styles.formBtn}>
                        <Button type="primary" htmlType='submit'>预定会议</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default NewMeet
