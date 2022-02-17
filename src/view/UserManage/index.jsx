import React, { Component } from "react";
import {Modal, Input, Table, Card, Button, notification, Row, Col, Space, message} from 'antd';
import { SearchOutlined, PlusOutlined, CheckSquareOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './css/index.module.css'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../../common/js/tools'
import {
    getUserList,
    setForbiddenUser,
    deleteUser
} from '../../axios/user'

const { Search } = Input;



const del = (data) => {


};

class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            selectedRowKeys: [],
            loading: true,
        }
        this.columns = [
            {
                title: '真实姓名',
                dataIndex: 'trueName',
                width: '10%',
                align: 'center'
            },
            {
                title: '注册时间',
                dataIndex: 'createDate',
                width: '10%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.createDate))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: '10%',
                align:'center'
            },

            {
                title: '手机号',
                dataIndex: 'phone',
                width: '10%',
                align: 'center'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: '10%',
                align: 'center',
                render:(text, record)=>{
                    if (record.sex == 0) {
                        return '男'
                    } else  {
                        return '女'
                    }
                }
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
                    let delTxt = record.states == 1 ? '禁用' : '启用';
                    return (
                        <Space size={5}>
                            <Button size="small" type="primary" >
                                <Link to={{pathname:'/user/detail/'+record.id}}>详情</Link></Button>
                            <Button size="small"
                                    className={` ${record.states == 1 ? styles.infoBtn : styles.infoBtn1}`}
                                    onClick={this.setForbiddenUser.bind(this,record,index)}>{delTxt}</Button>
                            <Button size="small" onClick={ this.deleteUser.bind(this,record)} type="primary" danger>删除</Button>
                        </Space>
                    )
                }
            }

        ]
        this.SearchUser = this.SearchUser.bind(this);
    }
    componentDidMount() {
        let params = { page: 1,pageSize:10 };
        this.getUserData(params);
    }

    //检索用户
    SearchUser(textValue) {
        let params = { page: 1, pageSize:10,key: textValue };
        this.getUserData(params);
    }
    //获取用户信息
    getUserData(params) {
        getUserList(params).then((res) => {
            console.log(res)
            this.setState({ userData: res.response.data,loading:false });
        })
    }

    setForbiddenUser (record,index){
        setForbiddenUser({uID:record.id,status:record.states==1?0:1}).then(res=>{
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
                    userData
                })
            }

        })
    }
    deleteUser(record){
        let that=this
        Modal.confirm({
            title: "确定删除用户？",
            okText: "确定",
            cancelText: "取消",
            content: (
                <div>
                    <p>用户：{record.trueName}</p>
                </div>
            ),
            onOk() {
                let params = { uID: record.id };
                deleteUser(params).then((res) => {
                    if (res.success) {
                        message.success(
                            "删除成功"
                        );
                        that.getUserData({ page: 1,pageSize:10 });
                    } else {
                        message.error(
                            "删除失败"
                        );
                    }

                });
            },
            onCancel() {
            },
        });
    }
    render() {

        const { loading } = this.state;
        return (
            <Card title="用户列表" className='content-card'>
                <Row className={'toolbar'} justify='space-between'>
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
                            <Link to={{ pathname: '/user/newUser' }}>
                                <Button type="primary" size="large" icon={<PlusOutlined />}>
                                    添加用户
                                </Button>
                            </Link>

                        </Space>
                    </Col>
                </Row>
                <Table
                    bordered
                    rowKey='id'
                    dataSource={this.state.userData}
                    columns={this.columns}
                    pagination={{ position: ['none', 'bottomRight'] }}
                    loading={loading}
                > </Table>
            </Card>
        )
    }

}
export default UserManage
