import React, {Component} from "react";
import {Button, Card, Form, Input,message} from "antd";
import {
    addProject
} from '@/axios/project'
class name extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.submitForm=this.submitForm.bind(this)
        this.form=React.createRef()
    }

    componentDidMount() {
    }
    submitForm(val){

        addProject({...val,liveType:0}).then(res=>{
            if(res.success){
                message.success('新建机构成功！')
                this.props.history.push({
                    pathname: '/project/projectList',
                })
            }
        })

    }
    render() {
        return (<>
            <Card title="新建机构" bordered={false}>
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
                    {/*<Form.Item*/}
                    {/*    label="机构KEY"*/}
                    {/*    name="appKey"*/}
                    {/*    rules={[{required: true, message: '请填写机构KEY！'}]}*/}
                    {/*    className={'formItem'}*/}
                    {/*    labelCol={{ span: 6 }}*/}
                    {/*    wrapperCol={{ span: 16 }}*/}
                    {/*>*/}
                    {/*    <Input autoComplete='off' placeholder='请输入机构KEY'/>*/}
                    {/*</Form.Item>*/}
                    <Form.Item
                        label="机构秘钥"
                        name="appValue"
                        rules={[{required: true, message: '请填写机构秘钥！'}]}
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeholder='请填写机构秘钥'/>
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
                        <Button type="primary" htmlType='submit'>新建机构</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>)
    }
}

export default name
