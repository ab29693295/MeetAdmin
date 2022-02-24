import React, {Component} from 'react';
import {Button, Form, Input, message} from "antd";
import {getProDetail,addProject} from '@/axios/project'
export default class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params:{
                proID:this.props.id
            },
            initialValues:{
                proName:'',
                proValue: '',
                proUrl: ''
            },
        };
        this.submitForm=this.submitForm.bind(this)
        this.form=React.createRef()
    }
    componentDidMount() {
        let {params}=this.state
        getProDetail(params).then(res=>{
            if(res.success){
                this.setState({
                    initialValues:{...res.response}
                })
                this.form.current.setFieldsValue({...res.response})
            }
        })
    }
    submitForm(val){
        addProject({...val,id:Number(this.props.id)}).then(res=>{
            if(res.success){
                message.success('修改成功！')
            }else{
                message.error(res.msg)
            }
        })

    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        let {initialValues}=this.state
        return (
            <>
                <Form
                    name="basic"
                    ref={this.form}
                    className='form'
                    onFinish={this.submitForm}
                    {...formItemLayout}
                    initialValues={initialValues}
                >
                    <Form.Item
                        label="机构名称"
                        name="proName"
                        rules={[{required: true, message: '请填写机构名称！'}]}
                        className='formItem'
                    >
                        <Input autoComplete='off' placeholder='请输入机构名称'/>
                    </Form.Item>
                    <Form.Item
                        label="机构秘钥"
                        name="proValue"
                        rules={[{required: true, message: '请填写机构秘钥！'}]}
                        className={'formItem'}
                    >
                        <Input autoComplete='off' placeholder='请填写机构秘钥'/>
                    </Form.Item>

                    <Form.Item
                        label="机构链接"
                        name="proUrl"
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