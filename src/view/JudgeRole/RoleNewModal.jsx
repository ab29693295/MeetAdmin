import React, {useEffect,useCallback,useRef,useState} from 'react';
import {Button, Form, Input, Modal, Tree, Radio, message} from "antd";
import {useSelector} from 'react-redux'
import {addOrUpdateRole} from '@/axios/judge'
function RoleNewModal ({title='',initialValues={},visible,type,onClose,onSuccess}) {
    const formRef=useRef()
    const treeData = useSelector(state => state.menu.allMenus)
    const [checkIds,setCheckIds] = useState([])
     let onFinish=useCallback((val)=>{
         if(type=='up'){
             val.id=initialValues.id
         }
         //数据提交
         addOrUpdateRole(val).then(res=>{
                if(res.success){
                    message.success('操作成功！');
                    onSuccess&&onSuccess()
                    onClose()
                }
         })
         }, [type,initialValues])
     let onCheck=useCallback((val)=>{
         //数据提交
         formRef.current.setFieldsValue({permissonIDs:val.toString()})
     }, [])
    useEffect(() => {
        if(initialValues.permissonIDs){
            let arr=initialValues.permissonIDs.split(',').map(Number)
            setCheckIds(arr)

        }else{
            setCheckIds([])
        }
        return()=>{
            formRef && formRef.current&&formRef.current.resetFields()
        }

    }, [initialValues])
    return <>
        {/*destroyOnClose*/}
        <Modal title={title} visible={visible} onCancel={onClose} footer={null} forceRender>
            <Form
                name="basic"
                className={'form'}
                autoComplete="off"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                ref={formRef}
                initialValues={{...initialValues}}
            >
                <Form.Item
                    label="角色名称"
                    name="name"
                    rules={[{ required: true, message: '请填写角色名称!' }]}
                >
                    <Input placeholder='请输入角色名称'/>
                </Form.Item>

                <Form.Item
                    label="角色描述"
                    name="des"
                    rules={[{ required: true, message: '请填写角色描述!' }]}
                >
                    <Input.TextArea placeholder='请输入角色描述'/>
                </Form.Item>
                <Form.Item  label="后台管理"
                            name="isAdmin"
                            rules={[{ required: true, message: '后台管理角色为必填信息' }]}
                            className={'formItem'}>
                    <Radio.Group >
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </Radio.Group>
                </Form.Item>
                {
                    treeData.length? <Form.Item
                        label="权限信息"
                        name="permissonIDs"
                        rules={[{ required: true, message: '请选择权限!' }]}
                    >
                        <Tree
                            defaultCheckedKeys={checkIds}
                            checkable
                            treeData={treeData}
                            onCheck={onCheck}
                            fieldNames={{ title: 'name', key: 'id', children: 'childrenList' }}
                        />
                    </Form.Item>:'加载中'
                }

                <Form.Item className={'formBtn'} wrapperCol={{ offset: 3, span: 16 }}>
                    <Button type="primary" htmlType="submit" >
                        确定
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>

}
export default RoleNewModal