import React, {Component} from "react";
import {Modal, Form, Radio, Button, message} from 'antd';
class ExamineModal extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleOk=this.handleOk.bind(this)
    }

    componentDidMount() {
    }
    handleOk(values){
        this.props.examineFinish(values)
    }
    render() {
        let {visible,title}=this.props
        return (<>
            <Modal title={title} visible={visible} footer={null} onCancel={this.props.examineCancel}>
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
                    <Form.Item   className={'formBtn'}>
                        <Button type="primary" htmlType='submit'>确定</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>)
    }
}

export default ExamineModal
