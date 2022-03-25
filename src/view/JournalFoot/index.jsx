
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
                title: '会议名称',
                dataIndex: 'courseName',
                width: '20%',
                align: 'center'
            },
            {
                title: '访问时间',
                dataIndex: 'createDate',
                width: '10%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.createDate))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '停留时长',
                dataIndex: 'duration',
                width: '10%',
                align: 'center'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                align: 'center'
            },
            {
                title: '真实姓名',
                dataIndex: 'trueName',
                align: 'center'
            },
            {
                title: 'IP',
                dataIndex: 'ip',
                align: 'center'
            },
            {
                title: '地区',
                align: 'center',
                render: (text, record) => {
                    return  <Space>{record.country}{record.province}{record.city}</Space>
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
            if(res.success&&res.response.data&&res.response.data.length>0){
              let data= res.response.data.map((item,index)=>{
                  item.key=index
                    return item
                })
                this.setState({
                    data,
                    pageData:{total:res.response.dataCount},
                    loading:false
                    })
            }
            this.setState({
                loading:false
            })
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