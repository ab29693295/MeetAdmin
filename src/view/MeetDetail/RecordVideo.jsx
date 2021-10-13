import React, {Component} from 'react';
import {Button, Col, Row, Space, Table, Tag} from "antd";
import axios from '@/axios'
export default class RecordVideo extends Component {
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
                pageSize:10
            }
        };
        this.columns = [
            {
                title: '视频名称',
                dataIndex: 'videoName',
                align: 'center'
            },
            {
                title: '录制时长',
                dataIndex: 'des',
                align: 'center'
            },
            {
                title: '视频描述',
                dataIndex: 'des',
                align: 'center'
            },
            {
                title: '创建人',
                dataIndex: 'createDate',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'createDate',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'option',
                align: 'center',
                render:(text, record, index)=>{
                    return (
                        <Space size={5}>
                            <Button size="small" data-record={record}  type="primary" danger>删除</Button>
                            <Button size="small" type="primary" >预览</Button>
                            <Button size="small" type="primary" >下载</Button>
                        </Space>
                    )
                }
            },
        ]
        this.getData=this.getData.bind(this)
        this.changPage=this.changPage.bind(this)
    }

    componentDidMount() {
        this.getData()
    }
    getData(){
        let {params}=this.state
        axios.getRoomVideo(params).then(res=>{
            if(res.success){
                this.setState({
                    data:res.response.data,
                    pageData:{...this.state.pageData,total:res.response.dataCount}
                })
            }
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
                       rowKey='createDate'
                       dataSource={data}
                       columns={this.columns}
                       pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                       loading={loading}
                > </Table>
            </>
        )
    }
}