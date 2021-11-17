import React, {Component} from "react";
import {Button, Form, Input, Modal, message} from "antd";
import styles from "../../MeetList/css/index.module.css";
import axios from '@/axios'
class AddUserModal extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
    }

    componentDidMount() {
    }
    handleOk(val){
        let {rid}=this.props
        axios.addMember({...val,rid:Number(rid),isHost:0}).then(res=>{
            if(res.success){
                message.success('添加成功')
                this.props.addModalCallback(true)
            }
        })
    }
    handleCancel(){
        this.props.addModalCallback()
    }
    render() {
        let {visible}=this.props
        return (<>
            <Modal title="添加成员" visible={visible} footer={null} onCancel={this.handleCancel}>
                <Form
                    name="basic"
                    className={'form'}
                    initialValues={{
                        status:1
                    }}
                    onFinish={this.handleOk}
                >
                    <Form.Item
                        label="成员昵称"
                        name="userName"
                        className={'formItem'}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 14 }}
                        rules={[{ required: true  }]}
                    >
                        <Input autoComplete='off' placeholder='请输入成员昵称'/>
                    </Form.Item>
                    <Form.Item
                        label="真实姓名"
                        name="trueName"
                        className={'formItem'}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 14 }}
                        rules={[{ required: true  }]}
                    >
                        <Input autoComplete='off' placeholder='请输入真实姓名'/>
                    </Form.Item>
                    <Form.Item  className={'formBtn'}>
                        <Button type="primary" htmlType='submit'>确定</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>)
    }
}

export default AddUserModal

