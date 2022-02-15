import React, {Component} from 'react';
import {Button, Form, Input} from "antd";
export default class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <Form
                    name="basic"
                    ref={this.form}
                    className={'form'}
                    onFinish={this.submitForm}
                >
                    <Form.Item
                        label="机构名称"
                        name="appName"
                        rules={[{required: true, message: '请填写机构名称！'}]}
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeholder='请输入机构名称'/>
                    </Form.Item>
                    <Form.Item
                        label="机构KEY"
                        name="appKey"
                        rules={[{required: true, message: '请填写机构KEY！'}]}
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeh older='请输入机构KEY'/>
                    </Form.Item>
                    <Form.Item
                        label="机构链接"
                        name="appUrl"
                        rules={[{required: true, message: '请填写机构链接！'}]}
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeholder='请输入机构链接'/>
                    </Form.Item>
                    <Form.Item  className={'formBtn'}>
                        <Button type="primary" htmlType='submit'>保存</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}