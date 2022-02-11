import React, {Component} from 'react';
import {Button, Card, Col, Row, Space, Table, Tag} from "antd";
export default class JournalOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            pageData:{
                total:0
            }
        }
        this.columns=[
            {
                title: '操作内容',
                dataIndex: 'name',
                align:'center'
            },
            {
                title:'操作模块',
                dataIndex: 'url',
                align:'center'
            },
            {
                title: '操作内容',
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
                title:'操作人',
                dataIndex: 'sort',
                align:'center'
            },
            {
                title:'操作时间',
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
                            <Button size="small" type="primary" danger>删除</Button>
                        </Space>
                    )

                }
            },

        ]
    }

    render() {
        let {data,pageData}=this.state

        return (
            <>
                <Card title="操作日志" className='content-card'>
                    <Row className={'toolbar'} justify='space-between'>
                        <Col flex='40%'>

                        </Col>
                        <Col >
                            <Space size={10}>
                                <Button type="primary"  size="large" >
                                    导出
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
            </>
        )
    }
}