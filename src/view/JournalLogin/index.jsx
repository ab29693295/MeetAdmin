
import React, {Component} from 'react';
import {Modal, Input, Table, Card, Button, message, Row, Col, Space} from 'antd';
import {SearchOutlined, PlusOutlined, CheckSquareOutlined, CloseCircleOutlined} from '@ant-design/icons';
import styles from "../MeetList/css/index.module.css";
import {Link} from "react-router-dom";
import {formatDateTime} from "../../common/js/tools";
import {getUserLoginLog} from '@/axios/tj'
const {Search} = Input;
export default class JournalLogin extends Component {
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
                title: '登录时间',
                dataIndex: 'createDate',
                width: '20%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.createDate))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '终端类型',
                width: '20%',
                align: 'center'
            },
            {
                title: '登录者',
                dataIndex: 'userName',
                width: '20%',
                align: 'center'
            },

            {
                title: 'IP地址',
                dataIndex: 'ip',
                width: '20%',
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
        getUserLoginLog(params).then(res=>{
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
        })
    }
    changPage(page){
        console.log(page)
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
                <Card title="登录日志">
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