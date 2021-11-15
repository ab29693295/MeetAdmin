import React, {Component} from 'react';
import {Card, Form, Input, Button, DatePicker, Select, Radio,message} from "antd";
import styles from "../LiveNew/css/index.module.css";
export default class AdvancedSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues:{
                isPublic: 1,
                timeRange:[],
                meetingCode: '',
                des:'',
                imagePath:''
            },
            id:0
        };
    }
    componentDidMount() {
        if(this.props.id){
            let id=Number(this.props.id);
            this.setState({
                id:id
            })
            // this.getRoomData(id)
        }
    }
    render() {
        let {initialValues}=this.state
        return (
            <>
                <Form
                    name="basic"
                    ref={this.form}
                    className={styles.form}
                    initialValues={initialValues}
                    onFinish={this.submitForm}
                >
                    <Form.Item  label="是否启用讨论"
                                name="isPublic"
                                className={styles.formItem}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                rules={[{ required: true  }]}
                                value={1}>
                        <Radio.Group onChange={this.handleSecret} >
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="是否启用鲜花掌声"
                        name="isPublic"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} value={1}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="是否显示成员"
                        name="isPublic"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} value={1}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="是否启用打赏"
                        name="isSecret"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} value={0}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="推流供应商"
                        name="lockStatus"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} >
                            <Radio value={1}>阿里云</Radio>
                            <Radio value={0}>百度云</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="原生或同传"
                        name="lockStatus"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} >
                            <Radio value={1}>原生</Radio>
                            <Radio value={0}>同传</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="推流或拉流"
                        name="lockStatus"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} >
                            <Radio value={1}>推流</Radio>
                            <Radio value={0}>拉流</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item  className={styles.formBtn}>
                        <Button type="primary" htmlType='submit'>确认修改</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}