import React, {useState,useEffect} from 'react';
import {Button, Form, Input, Modal, Tree} from "antd";

 function RoleNewModal ({title='',initialValues={},visible,onClose}) {

     const [treeData, setTreeData] = useState([]);
     useEffect( () => {
         console.log(1)
         setTreeData([
             {
                 title: '首页',
                 key: '0-0'
             },
             {
                 title: '机构管理',
                 key: '0-1',
                 children: [
                     { title: '机构列表', key: '0-1-0-0' },
                     { title: '新建机构', key: '0-1-0-1' },
                 ]
             },
             {
                 title: '权限管理',
                 key: '0-2',
                 children: [
                     {
                         title: '角色权限',
                         key: '0-2-0-0' ,
                         children: [
                             { title: '查看', key: '0-1-1-0' },
                             { title: '编辑', key: '0-1-1-1' },
                             { title: '删除', key: '0-1-1-2' },
                         ]},
                     { title: '新建角色', key: '0-2-0-1' },
                 ]
             }
         ])
     },[]);
    return <>
        <Modal title={title} visible={visible} onCancel={onClose} footer={null}>
            <Form
                name="basic"
                className={'form'}
                autoComplete="off"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item
                    label="角色名称"
                    name="username"
                    rules={[{ required: true, message: '请填写角色名称!' }]}
                >
                    <Input placeholder='请输入角色名称'/>
                </Form.Item>

                <Form.Item
                    label="角色描述"
                    name="des"
                >
                    <Input.TextArea placeholder='请输入角色描述'/>
                </Form.Item>
                <Form.Item
                    label="权限信息"
                    name="judge"
                    rules={[{ required: true, message: '请选择权限!' }]}
                >
                    <Tree
                        checkable
                        treeData={treeData}
                    />
                </Form.Item>
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