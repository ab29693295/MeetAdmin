import React, {Component} from 'react';
import {Col, Input, Row, Table} from 'antd';
import axios from '@/axios/index'
const {Search} = Input;
export default class OperateLog extends Component {
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
                title: '操作类型',
                dataIndex: 'typeName',
                align: 'center'
            },
            {
                title: '操作详情',
                dataIndex: 'des',
                align: 'center'
            },
            {
                title: '操作用户',
                dataIndex: 'userName',
                align: 'center'
            },
            {
                title: '时间',
                dataIndex: 'createDate',
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
        axios.getRoomOperateLog(params).then(res=>{
            if(res.success){
                if(res.response.data!=null&&res.response.data.length>0){
                    let data=res.response.data.map((item,index)=>{
                        return {...item,key:index}
                    })
                    this.setState({
                        data,
                        pageData:{...this.state.pageData,total:res.response.dataCount}
                    })
                }

            }
            this.setState({
                loading:false
            })
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
                            placeholder="操作关键字"
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
                       dataSource={data}
                       columns={this.columns}
                       pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changePage}}
                       loading={loading}
                > </Table>
            </>
        )
    }
}