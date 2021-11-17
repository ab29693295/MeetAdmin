import React, {Component} from "react";
import {Card,Form, Input, Radio, Button,DatePicker} from "antd";
import styles from './css/index.module.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
class name extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <Card title="个人信息"  >
                <Form  className={'form'}>
                    <Form.Item label='昵称'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='性别'>
                        <Radio.Group onChange={this.onChange} value={this.state.value} defaultValue={1}>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='出生日期'>
                        <DatePicker  locale={locale}/>
                    </Form.Item>
                    <Form.Item className={styles.saveBtn}>
                        <Button type="primary">保存</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default name
