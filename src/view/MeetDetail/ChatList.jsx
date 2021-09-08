import React, {Component} from 'react';
import {Avatar, List, Table} from 'antd';
import styles from './css/index.module.css'
import axios from '../../axios/index'
export default class ChatList extends Component {
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
                pageSize:10
            }
        };
        this.columns=[
            {
                title: '昵称',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '用户ID',
                dataIndex: 'id',
                align: 'center'
            },
            {
                title: '聊天内容',
                dataIndex: 'text',
                align: 'center'
            },
            {
                title: '发送时间',
                dataIndex: 'time',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'CreateDate',
                align: 'center'
            }
        ]
    }
    componentDidMount() {
        this.getData()
    }
    getData(){
        let {params}=this.state
        axios.getRoomChat(params).then(res=>{
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
    render() {
        let {data,pageData,loading}=this.state;
        return (
            <>
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