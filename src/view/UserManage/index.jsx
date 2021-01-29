import React, { Component } from "react";
import { Modal, Input, Table, Card, Button, notification, Row, Col, Space } from 'antd';
import { SearchOutlined, PlusOutlined, CheckSquareOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './css/index.module.css'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../../common/js/tools'
import axios from '../../axios'

const { Search } = Input;

const columns = [
    {
        title: 'userName',
        dataIndex: 'userName',
        width: '10%',
        align:'center'
    },
    {
        title: 'trueName',
        dataIndex: 'trueName',
        width: '10%',
        align: 'center'
    },
    {
        title: 'phone',
        dataIndex: 'phone',
        width: '10%',
        align: 'center'
    },
    {
        title: 'roleID',
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
        title: 'states',
        dataIndex: 'states',
        width: '10%',
        align: 'center',
         render: (text, record, index) => {

             if (record.states == 1) {
                 return <span> 锁定</span>
             } else {
                 return <span>未锁定</span>
             }

        }
    },
   
    {
        title: 'caozuo',
        dataIndex: 'id',
        align: 'center',
        render: (text, record) => {
            let delTxt = record.states == 1 ? '解锁' : '锁定';
            return (
                <Space size={5}>
                    <Button size="small" type="primary" className={` ${record.states == 1 ? styles.infoBtn : styles.infoBtn1}`}>{delTxt}</Button>
                    <Button size="small" onClick={() => del(record)} type="primary" danger>delete</Button>
                    <Button size="small" type="primary" >pwd</Button>
                </Space>
            )
        }
    }

]

const del = (data) => {
    Modal.confirm({
        title: "信息",
        okText: "确认",
        cancelText: "取消",
        content: (
            <div>
                <p>确定要删除{data.roomname}?</p>
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
            selectedRowKeys: [], //选中的行
            loading: false,
        }
        this.SearchUser = this.SearchUser.bind(this);
    }
    componentDidMount() {
        let params = { page: 1 };
        this.getUserData(params);
    }

    //检索
    SearchUser(textValue) {
        let params = { page: 1, key: textValue };
        this.getUserData(params);
    }
    //获取成员列表
    getUserData(params) {
        axios.getUserList(params).then((res) => {
            console.log(res)
            this.setState({ userData: res.response.data });
        })
    }
  
    //选择课程
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <Card title="用户列表123">
                <Row className={styles.toolbar} justify='space-between'>
                    <Col flex='40%'>
                        <Search
                            placeholder="视频会议关键字"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            onSearch={this.SearchUser}
                        />
                    </Col>
                    <Col >
                        <Space size={10}>
                            <Link to={{ pathname: '/meet/newMeet' }}>
                                <Button type="primary" size="large" icon={<PlusOutlined />}>
                                    AddUser
                                </Button>
                            </Link>
                          
                        </Space>
                    </Col>
                </Row>

                <Table bordered
                    rowKey='id'
                    dataSource={this.state.userData}
                    columns={columns}
                    rowSelection={rowSelection}
                    pagination={{ position: ['none', 'bottomRight'] }}
                > </Table>
            </Card>
            )

    }

}
export default UserManage