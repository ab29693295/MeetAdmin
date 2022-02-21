
import React, {Component} from 'react';
import {Modal, Input, Table, Card, Button, message, Row, Col, Space} from 'antd';
import styles from "../MeetList/css/index.module.css";
import {formatDateTime} from "../../common/js/tools";
import {getRoomFootLog} from '@/axios/tj'
const {Search} = Input;
export default class JournalFoot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params:{
              page:1,
              pageSize:10
            },
            data:[],
            loading:false,
            pageData:{
                total:0
            }
        };
        this.columns = [
            {
                title: '房间名称',
                dataIndex: 'createDate',
                width: '20%',
                align: 'center'
            },
            {
                title: '访问时间',
                dataIndex: 'startTime',
                width: '20%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.startTime))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '停留时长',
                dataIndex: 'endTime',
                width: '20%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.endTime))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '用户名',
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
                title: 'IP',
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
                title: '位置',
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
        this.getData=this.getData.bind(this)
        this.changPage=this.changPage.bind(this)

    }
    componentDidMount() {
        this.getData()

    }
    getData(){
        this.setState({
            loading:true
        })
        let {params}=this.state;
        getRoomFootLog(params).then(res=>{
            if(res.success){
              let data= res.response.data.map((item,index)=>{
                  item.key=index
                    return item
                })
                console.log(data)
                this.setState({
                    data,
                    pageData:{total:res.response.dataCount},
                    loading:false
                    })
            }
        })
    }
    changPage(page){
        this.setState({
            params:{...this.state.params,page}
        },function(){
            this.getData()
        })
    }
    render() {
        let {pageData,loading,data}=this.state;
        return (
            <>
                <Card title="访问日志">
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
                    <Table bordered
                           rowKey='key'
                           dataSource={data}
                           columns={this.columns}
                           pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                           loading={loading}
                    > </Table>
                </Card>
            </>
        )
    }
}