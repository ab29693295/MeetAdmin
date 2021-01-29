import React, {Component} from "react";
import {Modal, Button, Form, Radio,Input} from 'antd';
import styles from "../NewMeet/css/index.module.css";
class ExamineModal extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
    }

    componentDidMount() {
    }
    handleOk(){
        let {data,examineCallback}=this.props;
        //接口
        examineCallback()
    }
    handleCancel(){
        let {examineCallback}=this.props;
        //接口
        examineCallback()
    }
    render() {
        let {visible}=this.props
        return (<>
            <Modal title="会议审核" visible={visible} onOk={this.handleOk}
                   onCancel={this.handleCancel}>
                <Form
                    name="basic"
                    className={styles.form}
                    initialValues={{
                        isPublic: 1,
                        isLock: 1,
                        rate: 3.5,
                    }}
                >
                    <Form.Item
                        label="审核"
                        name="isPublic"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} value={1}>
                            <Radio value={1}>通过</Radio>
                            <Radio value={2}>未通过</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name='des'
                        label="审核意见" labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>)
    }
}

export default ExamineModal
