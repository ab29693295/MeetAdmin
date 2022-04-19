import React, {Component} from 'react';
import {Button, Col, Row, Space, Table, Tag} from "antd";
import axios from '@/axios'
export default class MeetMinutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
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
        this.columns = [
            {
                title: '会议内容',
                dataIndex: 'msgContent',
                align: 'center'
            },
            {
                title: '发言人',
                dataIndex: 'trueName',
                align: 'center'
            },
            {
                title: '用户ID',
                dataIndex: 'userID',
                align: 'center'
            },
            {
                title: '发言时间',
                dataIndex: 'createDate',
                align: 'center'
            },
            {

            }
            // {
            //     title: '操作',
            //     dataIndex: 'option',
            //     align: 'center',
            //     render:(text, record)=>{
            //         return (
            //             <Space size={5}>
            //                 <Button size="small" data-record={record}  type="primary" danger>删除</Button>
            //                 <Button size="small" type="primary" >预览</Button>
            //                 <Button size="small" type="primary" >下载</Button>
            //             </Space>
            //         )
            //     }
            // },
        ]
        this.getData=this.getData.bind(this)
        this.changPage=this.changPage.bind(this)
    }

    componentDidMount() {
        this.getData()
    }
    getData(){
        let {params}=this.state
        axios.getRoomAudioChat(params).then(res=>{
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

    changPage(page){
        this.setState({
            params:{...this.state.params,page: page}
        },function () {
            this.getData();
        })
    }
    render() {

        let {loading,data,pageData}=this.state;
        return (
            <>
                <Row className={'toolbar'} justify='space-between'>

                </Row>
                <Table bordered
                       dataSource={data}
                       columns={this.columns}
                       pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                       loading={loading}
                > </Table>
            </>
        )
    }
}