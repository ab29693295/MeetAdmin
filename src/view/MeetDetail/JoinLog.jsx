import React, {Component} from 'react';
import {Col, Input, Row, Table} from 'antd';
import axios from '@/axios/index'
const {Search} = Input;
export default class JoinLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data:[],
            pageData:{
                total:0
            },
            params:{
                roomID:this.props.id,
                page:1,
                pageSize:10,
                key:''
            }
        };
        this.columns=[
            {
                title: '用户名',
                dataIndex: 'UserName',
                align: 'center'
            },
            {
                title: 'PeerID',
                dataIndex: 'PeerID',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'CreateDate',
                align: 'center'
            }
        ];
        this.changePage=this.changePage.bind(this)
        this.search=this.search.bind(this)
    }
    componentDidMount() {
        this.getData()
    }
    getData(){
        let {params}=this.state
        axios.getRoomJoinLog(params).then(res=>{
            if(res.success){
                this.setState({
                    data:res.response.data==null?[]:res.response.data,
                    pageData:{...this.state.pageData,total:res.response.dataCount}
                })
            }
        })
    }
    changePage(page){
        this.setState({
            params:{...this.state.params,page: page}
        },function () {
            this.getData();
        })
    }
    //检索
    search(textValue) {
        this.setState({
            params:{...this.state.params,key:textValue,page: 1}
        },function () {
            this.getData();
        })

    }
    render() {
        let {data,pageData,loading}=this.state;
        return (
            <>
                <Row className={'toolbar'} justify='space-between'>
                    <Col flex='40%'>
                        <Search
                            placeholder="访问日志关键字"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            onSearch={this.search}
                        />
                    </Col>
                    <Col >
                    </Col>
                </Row>
                <Table bordered
                       rowKey='id'
                       dataSource={data}
                       columns={this.columns}
                       pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changePage}}
                       loading={loading}
                > </Table>
            </>
        )
    }
}