import React, {useCallback,useEffect,useRef,useState} from 'react';
import {Modal, Form, Input, InputNumber,Radio,Button ,Select } from "antd";
import {addPermission} from '@/axios/judge'
import { IconsData } from "@/utils/icons";
import Icon from "@/components/Icon";
function AddMenu({title='',initialValues={},visible,parentId,onClose,operateType,onSuccess}) {
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const formRef=useRef()

    const onFinish=useCallback((val)=>{
        //数据提交
        if(operateType=='up'){
            val.id=initialValues.id
        }
        addPermission({...val,parentID:parentId}).then(res=>{
            if(res.success){
                onSuccess&&onSuccess()
                onClose()
            }
        })
        },
        [parentId,operateType])
    useEffect(() => {
        return()=>{
            formRef && formRef.current&&formRef.current.resetFields()
        }
    }, [initialValues,parentId])

    return <>
        <Modal title={title} visible={visible} onCancel={onClose} footer={null} forceRender>
            <Form name="add"
                  className={'form'}
                  autoComplete="off"
                  onFinish={onFinish}
                  initialValues={{...initialValues}}
                  ref={formRef}
                  {...formItemLayout}>
                <Form.Item  label="名称："
                            name="name"
                            rules={[{ required: true, whitespace: true, message: '菜单名称为必填信息' }, { max: 12, message: "最多输入12位字符" },]}
                            className={'formItem'}>
                    <Input/>
                </Form.Item>
                <Form.Item  label="URL："
                            name="permissonUrl"
                            rules={[{ required: true,  whitespace: true, message: '菜单URL为必填信息' }]}
                            className={'formItem'}>
                    <Input/>
                </Form.Item>

                <Form.Item  label="描述："
                            name="description"
                            className={'formItem'}
                            rules={[{ max: 100, message: "最多输入100位字符" }]}>
                    <Input.TextArea  autosize={{ minRows: 2, maxRows: 6 }}/>
                </Form.Item>
                <Form.Item  label="类型："
                            name="permissonType"
                            rules={[{ required: true, message: '类型为必填信息' }]}
                            className={'formItem'}>
                    <Radio.Group  >
                        <Radio value={0}>菜单</Radio>
                        <Radio value={1}>目录</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item  label="排序："
                            name="orderSort"
                            rules={[{ required: true, message: '类型为必填信息' }]}
                            className={'formItem'}>
                    <InputNumber min={0} max={9999} style={{width:'100%'}}/>
                </Form.Item>
                {/*<Form.Item label="图标" name="formIcon"  >*/}
                {/*    <Select*/}
                {/*        dropdownClassName="iconSelect"*/}
                {/*    >*/}
                {/*        {IconsData.map((item, index) => {*/}
                {/*            return (*/}
                {/*                <Select.Option key={index} value={item}>*/}
                {/*                    <Icon type={item} style={{fontSize:'20px'}}/>*/}
                {/*                </Select.Option>*/}
                {/*            );*/}
                {/*        })}*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item>
            </Form>
            {
                operateType!='up'&&<p style={{textAlign:'center',color:'red'}}>注：新增菜单后请前往角色管理将菜单授权给相关角色</p>
            }

        </Modal>
    </>
}
export default AddMenu