import React, { Component } from "react";
import {Card, Form, Input, Button, Select, Radio, message} from 'antd';
import Upload from '@/components/Upload'
import 'moment/locale/zh-cn';
import {getALlRole,addOrUpdateUser} from '@/axios/user'
import axios from '@/axios'
const { Option } = Select;

class NewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectList:[],
            roleList:[],
            initialValues:{
                isBind: 0,
                sex:0,
                userName: '',
                trueName:'',
                email:'',
                phone:'',
                photo:'',
                address:'',
                des:'',
                bindAppID:'',
                roleID:null
            },
        }
        this.getProject=this.getProject.bind(this)
        this.bindStatusChange=this.bindStatusChange.bind(this)
        this.uploadSuccess=this.uploadSuccess.bind(this)
        this.submitForm=this.submitForm.bind(this)

        this.form=React.createRef()
    }
    componentDidMount() {
        getALlRole().then(res=>{
            if(res.success){
                this.setState({
                    roleList:res.response
                })
            }
        })
        this.getProject()
    }

    //绑定状态修改
    bindStatusChange (e) {
        this.setState({
            isBind:e.target.value
        })
    };
    submitForm(values){
        console.log(values)
        addOrUpdateUser(values).then(res=>{
            if(res.success){
                message.success('用户添加成功！')
                this.form.current.resetFields()
                this.props.history.push({
                    pathname: '/user/userList',
                })
            }else{
                message.error(res.msg)
            }
        })
    }
    uploadSuccess(photo){
        //上传图片成功
        this.form.current.setFieldsValue({photo})
    }
    getProject(){
        //获取机构列表
        axios.selectProject({key:''}).then(res=>{
            this.setState({
                projectList:res.response
            })
        })
    }
    render() {

        let {roleList,initialValues,isBind,projectList}=this.state
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Card title="新增用户" className='content-card'>
                <Form
                    name="basic"
                    ref={this.form}
                    className={'form'}
                    {...formItemLayout}
                    initialValues={initialValues}
                    onFinish={this.submitForm}
                >

                    <Form.Item
                        label="用户名："
                        name="userName"
                        rules={[{ required: true, message: '用户名为必填信息',whitespace: true },{ required: false,
                            pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "g"),
                            message: '长度至少为6的数字和字母组合，至少含有一个字母和一个数字',}]}
                        className={'formItem'}
                    >
                        <Input autoComplete='off' placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item
                        label="初始密码："
                        name='pwd'
                        rules={[{ required: true, message: '初始密码为6-20位',min: 6, max: 20 }]}>
                        <Input   autoComplete='off' placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item
                        label="真实姓名："
                        name="trueName"
                        rules={[{ required: true, message: '真实姓名为必填信息' ,whitespace: true}]}
                        className={'formItem'}
                    >
                        <Input autoComplete='off' placeholder='请输入真实姓名' />
                    </Form.Item>
                    <Form.Item
                        label="性别："
                        name="sex"
                        className={'formItem'}
                        rules={[{ required: true, message: '性别为必填信息' }]}
                    >
                        <Radio.Group>
                            <Radio value={0} >男</Radio>
                            <Radio value={1}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="手机号："
                        name="phone"
                        rules={[{ required: true, message: '手机号为必填信息',max:11 },{
                            required: false,
                            pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
                            message: '请输入正确的手机号',
                        }]}
                        className={'formItem'}
                    >
                        <Input autoComplete='off' placeholder='请输入手机号' maxLength={11}/>
                    </Form.Item>
                    <Form.Item
                        label="邮箱："
                        name="email"
                        rules={[{ required: true, message: '邮箱为必填信息' },{
                            type: 'email',
                            message: '请输入正确的邮箱',
                        },]}
                        className={'formItem'}
                    >
                        <Input autoComplete='off' placeholder='请输入邮箱' />
                    </Form.Item>
                    <Form.Item
                        label="用户角色："
                        name="roleID"
                        className={'formItem'}
                        rules={[{ required: true,message:'请选择用户角色'  }]}
                    >
                        <Select placeholder="请选择用户角色">
                            {
                                roleList.map((item)=>{
                                    return (
                                        <Option value={item.id} key={item.id} >{item.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="会议机构"
                        name="proID"
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true,message:'请选择机构！'}]}
                    >
                        <Select placeholder="请选择所在机构" onChange={this.handleAppName}>
                            {
                                projectList.map((item)=>{
                                    return (
                                        <Option value={item.id} key={item.id} data={item.proName}>{item.proName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="用户关联："
                        name="isBind"
                        rules={[{ required: true, message: '邮箱为必填信息' }]}
                        className={'formItem'}
                    >
                        <Radio.Group onChange={this.bindStatusChange}>
                            <Radio value={0}>否</Radio>
                            <Radio value={1}>是</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        isBind == 1 &&<Form.Item
                            label="关联ID"
                            name="bindAppID"
                            className={'formItem'}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true  }]}
                        >
                            <Input autoComplete='off' placeholder='请填写关联ID'/>
                        </Form.Item>
                    }
                    <Form.Item
                        label="头像"
                        name="photo"
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Upload uploadSuccess={this.uploadSuccess} uploadError={this.uploadError}/>
                    </Form.Item>
                    <Form.Item
                        label="地址："
                        name="address"
                    >
                        <Input.TextArea placeholder="请输入地址"/>
                    </Form.Item>
                    <Form.Item
                        label="备注："
                        name="des"
                    >
                        <Input.TextArea placeholder="请输入备注" />
                    </Form.Item>
                    <Form.Item className={'formBtn'}>
                        <Button type="primary" htmlType='submit'>确定</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default NewUser