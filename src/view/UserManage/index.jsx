import React, { Component } from "react";
import {Modal, Input, Table, Card, Button, notification, Row, Col, Space, message} from 'antd';
import { SearchOutlined, PlusOutlined, CheckSquareOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './css/index.module.css'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../../common/js/tools'
import axios from '../../axios'

const { Search } = Input;



const del = (data) => {
    Modal.confirm({
        title: "确定删除用户？",
        okText: "确定",
        cancelText: "取消",
        content: (
            <div>
                <p>用户：{data.trueName}</p>
            </div>
        ),
        onOk() {
            // alert(data.id)
            var params = { rID: data.id };
            axios.deleteMeetRoom(params).then((res) => {
                if (res.success) {
                    notification.success({
                        message: "删除成功",
                    });
                } else {
                    notification.warning({
                        message: "删除失败",
                    });
                }

            });
        },
        onCancel() {
        },
    });

};

class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            selectedRowKeys: [], //ѡ�е���
            loading: false,
        }
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'userName',
                width: '10%',
                align:'center'
            },
            {
                title: '真实姓名',
                dataIndex: 'trueName',
                width: '10%',
                align: 'center'
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                width: '10%',
                align: 'center'
            },
            {
                title: '角色',
                dataIndex: 'roleID',
                width: '10%',
                align: 'center',
                render: (text, record, index) => {

                    if (record.roleID == 1) {
                        return <span>超级管理员</span>
                    }
                    else if (record.roleID == 2) {
                        return <span>主持人</span>
                    }
                    else {
                        return <span>普通用户</span>
                    }

                }
            },
            {
                title: '启用状态',
                dataIndex: 'states',
                width: '10%',
                align: 'center',
                render: (text, record, index) => {

                    if (record.states == 1) {
                        return <span> 启用</span>
                    } else {
                        return <span>禁用</span>
                    }

                }
            },
            {
                title: '用户关联',
                dataIndex: 'states',
                width: '10%',
                align: 'center',
                render: (text, record, index) => {

                    if (record.isBind == 1) {
                        return <span> 已关联</span>
                    } else {
                        return <span>未关联</span>
                    }

                }
            },

            {
                title: '操作',
                dataIndex: 'id',
                align: 'center',
                render: (text, record,index) => {
                    let delTxt = record.states == 1 ? '启用' : '禁用';
                    return (
                        <Space size={5}>
                            <Button size="small" type="primary"
                                    className={` ${record.states == 1 ? styles.infoBtn : styles.infoBtn1}`}
                                    onClick={this.setForbiddenUser.bind(this,record,index)}>{delTxt}</Button>
                            <Button size="small" onClick={() => del(record)} type="primary" danger>删除</Button>
                            <Button size="small" type="primary" >密码</Button>
                            <Button size="small" type="primary" >管理</Button>
                        </Space>
                    )
                }
            }

        ]
        this.SearchUser = this.SearchUser.bind(this);
    }
    componentDidMount() {
        let params = { page: 1 };
        this.getUserData(params);
    }

    //检索用户
    SearchUser(textValue) {
        let params = { page: 1, key: textValue };
        this.getUserData(params);
    }
    //获取用户信息
    getUserData(params) {
        axios.getUserList(params).then((res) => {
            console.log(res)
            this.setState({ userData: res.response.data });
        })
    }

    //选择改变事件
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    setForbiddenUser (record,index){
        axios.setForbiddenUser({uID:record.id,status:record.states==1?0:1}).then(res=>{
            if(res.success){
                let {userData}=this.state;
                if(record.states==1){
                    userData[index].states=0
                    message.success('用户已禁用')
                }else{
                    userData[index].states=1
                    message.success('用户已解禁')
                }
                this.setState({
                    userData:userData
                })
            }

        })
    }
    render() {

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <Card title="用户列表">
                <Row className={styles.toolbar} justify='space-between'>
                    <Col flex='40%'>
                        <Search
                            placeholder="请输入用户名或真实姓名"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            onSearch={this.SearchUser}
                        />
                    </Col>
                    <Col >
                        <Space size={10}>
                            <Link to={{ pathname: '/usermanage/newUser' }}>
                                <Button type="primary" size="large" icon={<PlusOutlined />}>
                                    添加用户
                                </Button>
                            </Link>

                        </Space>
                    </Col>
                </Row>

                <Table bordered
                    rowKey='id'
                    dataSource={this.state.userData}
                    columns={this.columns}
                    rowSelection={rowSelection}
                    pagination={{ position: ['none', 'bottomRight'] }}
                > </Table>
            </Card>
            )

    }

}
export default UserManage
