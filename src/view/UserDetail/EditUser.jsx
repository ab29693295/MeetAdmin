import React, {Component} from 'react';
import {Modal, Button, Form, Input, Radio, Select, message} from 'antd';
import Upload from '@/components/Upload'
import {addOrUpdateUser} from '@/axios/user'
import {connect} from "react-redux";
const {Option}=Select
 class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBind:0
        }
        this.submitForm=this.submitForm.bind(this)
        this.bindStatusChange=this.bindStatusChange.bind(this)
        this.uploadSuccess=this.uploadSuccess.bind(this)
        this.form=React.createRef()
    }
    //绑定状态修改
    bindStatusChange (e) {
        this.setState({
            isBind:e.target.value
        })
    };
    submitForm(values){
        addOrUpdateUser({...values,id:this.props.initialValues.id}).then(res=>{
            if(res.success){
                message.success('用户修改成功！')
                this.form.current.resetFields()
                this.props.submitEdit()
                this.props.hideEditModal()
            }
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.initialValues.isBind!=this.props.initialValues.isBind){
            this.setState({
                isBind:this.props.initialValues.isBind
            })
        }
    }
    uploadSuccess(photo){
        console.log(photo)
        //上传图片成功
        this.form.current.setFieldsValue({photo})
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 20 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 28 },
                sm: { span: 24 },
            },
        };
        let {visible,initialValues}=this.props;
        let roleList=this.props.role.allRoles
        let {isBind}=this.state
        return (
            <>
                <Modal title="编辑基础资料" visible={visible} footer={null} onCancel={this.props.hideEditModal}>
                    <Form  name="horizontal_login"
                           ref={this.form}
                           {...formItemLayout}
                           initialValues={initialValues}
                           onFinish={this.submitForm}
                    >
                        <Form.Item
                            label="真实姓名："
                            name="trueName"
                            rules={[{ required: true, message: '真实姓名为必填信息' ,whitespace: true}]}
                            className={'formItem'}
                        >
                            <Input autoComplete='off' placeholder='请输入真实姓名' />
                        </Form.Item>
                        <Form.Item
                            label="手机号码"
                            name="phone"
                            rules={[{ required: true, message: '手机号为必填信息',max:11 },{
                                required: false,
                                pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
                                message: '请输入正确的手机号',
                            }]}
                        >
                            <Input
                                type="text"
                                autoComplete='new-password'
                            />
                        </Form.Item>
                        <Form.Item
                            label="性别"
                            name="sex"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Radio.Group>
                                <Radio value={0}>男</Radio>
                                <Radio value={1}>女</Radio>
                            </Radio.Group>
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
                            label="用户关联："
                            name="isBind"
                            rules={[{ required: true}]}
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
                            label="备注"
                            name="text"
                        >
                            <Input
                                type="text"
                                placeholder=""
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = (state) =>//将state转到props
{
    return {
        role:state.role
    };
};

export default connect(//关联store和组件
    mapStateToProps
)(EditUser)