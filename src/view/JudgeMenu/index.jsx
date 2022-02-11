import React, {Component} from 'react';
import {Button, Card, Col, Row, Space, Table, Tag} from "antd";
import AddMenu from "./AddMenu";
import { PlusOutlined} from '@ant-design/icons';
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [

                {
                    key: 2,
                    name: '会议管理',
                    icon: 60,
                    type: 1,
                    url:'/',
                    sort:2,
                    status:1,
                    children:[
                        {
                            key: 21,
                            name: '会议列表',
                            icon: 60,
                            type: 2,
                            url:'/live/liveList',
                            sort:100,
                            status:1,
                        },
                        {
                            key: 22,
                            name: '新建会议',
                            icon: 60,
                            type: 2,
                            url:'/live/skuList',
                            sort:100,
                            status:1,
                        }
                    ]
                },
                {
                    key: 3,
                    name: '机构管理',
                    icon: 60,
                    type: 1,
                    url:'/',
                    sort:2,
                    status:1,
                    children:[
                        {
                            key: 31,
                            name: '机构列表',
                            icon: 60,
                            type: 2,
                            url:'/live/liveList',
                            sort:100,
                            status:1,
                        },
                        {
                            key: 32,
                            name: '新建机构',
                            icon: 60,
                            type: 2,
                            url:'/live/skuList',
                            sort:100,
                            status:1,
                        }
                    ]
                },
            ],
            pageData: {
                total:0
            },
            addData:{
                title:'',
                visible:false,
                initialValues:{}
            }
        }
        this.addMenu=this.addMenu.bind(this)
        this.closeAddModal=this.closeAddModal.bind(this)
        this.columns=[
            {
                title: '菜单名称',
                dataIndex: 'name',
            },
            {
                title:'URL',
                dataIndex: 'url',
                align:'center'
            },
            {
                title: '类型',
                dataIndex: 'type',
                align:'center',
                render:(text,record)=>{
                    if(record.type==1){
                        return <Tag color="magenta">目录</Tag>
                    }else if(record.type==2){
                        return <Tag color="cyan">菜单</Tag>
                    }else{
                        return <Tag color="orange">按钮</Tag>
                    }
                }
            },

            {
                title:'排序',
                dataIndex: 'sort',
                align:'center'
            },
            {
                title:'状态',
                dataIndex: 'status',
                align:'center',
                render:(text,record)=>{
                    if(record.status==1){
                        return <Tag color="#87d068">启用</Tag>
                    }else{
                        return <Tag color="#f50">停用</Tag>
                    }
                }
            },
            {
                title:'操作',
                align:'center',
                render:(text,record)=>{
                    return (
                        <Space size="middle">
                            <Button size="small" type="primary" onClick={this.addMenu.bind(this,{title:'添加子级'})}>添加子级</Button>
                            <Button size="small" type="primary" onClick={this.addMenu.bind(this,{title:'编辑',initialValues:record})}>编辑</Button>
                            <Button size="small" type="primary" danger>删除</Button>
                        </Space>
                        )

                }
            },

        ]
    }
    addMenu(data){
        let {addData}=this.state
        this.setState({
            addData:{...addData,visible:true,initialValues:{}, ...data}
        })
    }
    closeAddModal(){
        let {addData}=this.state
        this.setState({
            addData:{...addData,visible:false}
        })
    }
    render() {
        let {data,pageData,addData}=this.state
        return (
            <>
                <Card title="菜单管理" className='content-card'>
                    <Row className={'toolbar'} justify='space-between'>
                        <Col flex='40%'>

                        </Col>
                        <Col >
                            <Space size={10}>
                                <Button type="primary"  size="large" icon={<PlusOutlined/>} onClick={this.addMenu.bind(this,{title:'新增'})}>
                                    新建
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                    <Table bordered
                           rowKey='key'
                           dataSource={data}
                           columns={this.columns}
                           pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                        // loading={loading}
                    > </Table>
                </Card>
                <AddMenu {...addData} onClose={this.closeAddModal}/>
            </>
        )
    }
}