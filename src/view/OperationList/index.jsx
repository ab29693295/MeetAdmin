
import React, {Component} from 'react';
import {Modal, Input, Table, Card, Button, message, Row, Col, Space} from 'antd';
import {SearchOutlined, PlusOutlined, CheckSquareOutlined, CloseCircleOutlined} from '@ant-design/icons';
import styles from "../MeetList/css/index.module.css";
import {Link} from "react-router-dom";
import {formatDateTime} from "../../common/js/tools";
const {Search} = Input;
export default class OperationList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [
            {
                title: '操作',
                dataIndex: 'roomName',
                width: '20%',
                align: 'center'
            },
            {
                title: '开始时间',
                dataIndex: 'startTime',
                width: '20%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.startTime))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
                width: '20%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.endTime))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '是否公开',
                dataIndex: 'isPublic',
                align: 'center',
                render: (text, record) => {
                    if (record.isPublic == 1) {
                        return <span> 公开</span>
                    } else {
                        return <span>封闭</span>
                    }

                }
            },
            {
                title: '锁定状态',
                dataIndex: 'lockStatus',
                align: 'center',
                render: (text, record, index) => {

                    if (record.lockStatus == 1) {
                        return <span> 锁定</span>
                    } else {
                        return <span>未锁定</span>
                    }

                }
            },
            {
                title: '审核状态',
                dataIndex: 'status',
                align: 'center',
                render: (text, record, index) => {

                    if (record.status == 1) {
                        return <span>审核通过</span>
                    } else if(record.status == 2) {
                        return <span>审核未通过</span>
                    }else{
                        return <span>未审核</span>
                    }

                }
            },
            {
                title: '操作',
                dataIndex: 'id',
                align: 'center',
                render: (text, record,index) => {
                    let delTxt = record.lockStatus == 1 ? '解锁' : '锁定';
                    return (
                        <Space size={5}>
                            <Button size="small" type="primary"
                                    className={` ${record.lockStatus == 1?styles.infoBtn:styles.infoBtn1}`}
                                    onClick={this.changeLock.bind(this,record,index)}>{delTxt}</Button>
                            <Button size="small" data-record={record} onClick={ this.del.bind(this,record) } type="primary" danger>删除</Button>
                            <Button size="small" type="primary" onClick={this.lookMeet.bind(this,record.id)}> 查看</Button>
                            <Button size="small" type="primary" onClick={this.handleModify.bind(this,record)}> 管理</Button>
                        </Space>
                    )
                }
            }
        ]

    }

    render() {
        return (
            <>
                <Card title="操作日志">
                    <Row className={'toolbar'} justify='space-between'>
                        <Col flex='40%'>
                            <Search
                                placeholder="操作关键字"
                                allowClear
                                enterButton="搜索"
                                size="large"
                                onSearch={this.searchMeet}
                            />
                        </Col>
                    </Row>
                    {/*<Table bordered*/}
                    {/*       rowKey='id'*/}
                    {/*       dataSource={this.state.meetData}*/}
                    {/*       columns={this.columns}*/}
                    {/*       rowSelection={rowSelection}*/}
                    {/*       pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}*/}
                    {/*       loading={loading}*/}
                    {/*> </Table>*/}
                </Card>
            </>
        )
    }
}