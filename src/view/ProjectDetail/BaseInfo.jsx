import React, {Component} from 'react';
import {Button, Form, Input} from "antd";
export default class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.form=React.createRef()
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        return (
            <>
                <Form
                    name="basic"
                    ref={this.form}
                    className='form'
                    onFinish={this.submitForm}
                    {...formItemLayout}
                >
                    <Form.Item
                        label="机构名称"
                        name="appName"
                        rules={[{required: true, message: '请填写机构名称！'}]}
                        className='formItem'

                    >
                        <Input autoComplete='off' placeholder='请输入机构名称'/>
                    </Form.Item>
                    <Form.Item
                        label="机构KEY"
                        name="appKey"
                        rules={[{required: true, message: '请填写机构KEY！'}]}
                        className='formItem'
                    >
                        <Input autoComplete='off' placeholder='请输入机构链接'/>
                    </Form.Item>

                    <Form.Item
                        label="机构链接"
                        name="appUrl"
                        rules={[{required: true, message: '请填写机构链接！'}]}
                        className='formItem'

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