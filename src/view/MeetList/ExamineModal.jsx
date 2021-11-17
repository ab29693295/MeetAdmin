import React, {Component} from "react";
import {Modal, Form, Radio, message, Button} from 'antd';
import styles from './css/index.module.css'
import axios from '@/axios'
class ExamineModal extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
    }

    componentDidMount() {
    }
    handleOk(values){
        let {data,examineCallback}=this.props;
        //接口
        axios.checkRoom({rIDs:data,status:values.status}).then(res=>{
            if(res.success){
                examineCallback(true)
                message.success('审核成功！')
            }else{
                examineCallback()
                message.error('审核失败！')
            }
        })

    }
    handleCancel(){
        let {examineCallback}=this.props;
        //接口
        examineCallback()
    }
    render() {
        let {visible}=this.props
        return (<>
            <Modal title="会议审核" visible={visible} footer={null} onCancel={this.handleCancel}>
                <Form
                    name="basic"
                    className={'form'}
                    initialValues={{
                        status:1
                    }}
                    onFinish={this.handleOk}
                >
                    <Form.Item
                        label="审核"
                        name="status"
                        className={'formItem'}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} >
                            <Radio value={1}>通过</Radio>
                            <Radio value={2}>未通过</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    name='des'*/}
                    {/*    label="审核意见" labelCol={{ span: 6 }}*/}
                    {/*    wrapperCol={{ span: 16 }}>*/}
                    {/*    <Input.TextArea />*/}
                    {/*</Form.Item>*/}
                    <Form.Item  className={'formBtn'}>
                        <Button type="primary" htmlType='submit'>确定</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>)
    }
}

export default ExamineModal
