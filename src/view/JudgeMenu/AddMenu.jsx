import React, {useCallback} from 'react';
import {Modal, Form, Input, InputNumber,Radio,Button  } from "antd";

function AddMenu({title='',initialValues={},visible,onClose,onSuccess}) {
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const onFinish=useCallback((val)=>{
        //数据提交

        },
        [])
    return <>
        <Modal title={title} visible={visible} onCancel={onClose} footer={null}>
            <Form name="add"
                  className={'form'}
                  autoComplete="off"
                  onFinish={onFinish}
                  initialValues={initialValues}
                  {...formItemLayout}>
                <Form.Item  label="菜单名称："
                            name="name"
                            rules={[{ required: true, message: '菜单名称为必填信息' }]}
                            className={'formItem'}>
                    <Input/>
                </Form.Item>
                <Form.Item  label="菜单URL："
                            name="url"
                            rules={[{ required: true, message: '菜单URL为必填信息' }]}
                            className={'formItem'}>
                    <Input/>
                </Form.Item>
                <Form.Item  label="描述："
                            name="des"
                            className={'formItem'}>
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item  label="类型："
                            name="type"
                            rules={[{ required: true, message: '类型为必填信息' }]}
                            className={'formItem'}>
                    <Radio.Group >
                        <Radio value={1}>菜单</Radio>
                        <Radio value={2}>目录</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item  label="排序："
                            name="type"
                            rules={[{ required: true, message: '类型为必填信息' }]}
                            className={'formItem'}>
                    <InputNumber min={1} max={10} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item  label="状态："
                            name="status"
                            rules={[{ required: true, message: '状态为必填信息' }]}
                            className={'formItem'}>
                    <Radio.Group >
                        <Radio value={1}>启用</Radio>
                        <Radio value={2}>不启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item>
            </Form>
            <p style={{textAlign:'center',color:'red'}}>注：新增菜单后请前往角色管理将菜单授权给相关角色</p>
        </Modal>
    </>
}
export default AddMenu