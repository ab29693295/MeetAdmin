import React, {Component} from 'react';
import {Button, Card, Col, Row, Space, Table, Tag,Modal,message} from "antd";
import AddMenu from "./AddMenu";
import { PlusOutlined} from '@ant-design/icons';
import {
    getPermissionList,
    deletePermission,
    checkMenuStatus} from '@/axios/judge.js'
const { confirm } = Modal;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageData: {
                total:0
            },
            addData:{
                title:'',
                visible:false,
                operateType:'add',
                initialValues:{}
            },
            loading:true
        }
        this.addMenu=this.addMenu.bind(this)
        this.closeAddModal=this.closeAddModal.bind(this)
        this.getData=this.getData.bind(this)
        this.columns=[
            {
                title: '菜单名称',
                dataIndex: 'name',
            },
            {
                title:'URL',
                dataIndex: 'permissonUrl',
                align:'center'
            },
            {
                title: '类型',
                dataIndex: 'permissonType',
                align:'center',
                render:(text,record)=>{
                    if(record.permissonType==1){
                        return <Tag color="magenta">目录</Tag>
                    }else if(record.permissonType==0){
                        return <Tag color="cyan">菜单</Tag>
                    }else{
                        return <Tag color="orange">按钮</Tag>
                    }
                }
            },
            {
                title:'图标',
                dataIndex: 'icon',
                align:'center'
            },
            {
                title:'排序',
                dataIndex: 'orderSort',
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
                render:(text,record,index)=>{
                    let tip='启用'
                    if(record.status==1){
                        tip='停用'
                    }else{
                        tip='启用'
                    }
                    return (
                        <Space size="middle">
                            <Button size="small" type="primary" onClick={this.changeStatus.bind(this,{id:record.id,status:record.status,index})}>{tip}</Button>
                            <Button size="small" type="primary" onClick={this.addMenu.bind(this,{title:'添加子级',operateType:'addC',parentId:record.id})}>添加子级</Button>
                            <Button size="small" type="primary" onClick={this.addMenu.bind(this,{title:'编辑',operateType:'up',initialValues:record,parentId:record.parentID})}>编辑</Button>
                            <Button size="small" type="primary" danger onClick={this.delMenu.bind(this,{id:record.id})}>删除</Button>
                        </Space>
                        )
                }
            },

        ]
    }
    componentDidMount() {
        this.getData()
    }
    getData(){
        this.setState({
            loading:true
        })
        getPermissionList().then(res=>{
            if(res.success){
                this.setState({
                    // pageData:{total:res.response.dataCount},
                    data:res.response,
                    loading:false
                })
            }
        })
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
    delMenu(id){
        let that=this
        confirm({
            title: '确定删除当前菜单或目录吗？',
            onOk() {
                deletePermission(id).then(res=>{
                    if(res.success){
                        message.success('删除成功！');
                        that.getData()
                    }else{
                        message.error('删除失败！');
                    }
                })
            }
        });
    }
    changeStatus({id,status,index}){
        let status1=1
        if(status==1){
            status1=0
        }
        checkMenuStatus({cids:id,status:status1}).then(res=>{
            let {data}=this.state;
            if(res.success){
                if(status==1){
                    data[index].status=0

                }else{
                    data[index].status=1
                }
                message.success('操作成功！')
                this.setState({
                    data
                })
            }

        })
    }
    render() {
        let {data,pageData,addData,loading}=this.state
        return (
            <>
                <Card title="菜单管理" className='content-card'>
                    <Row className={'toolbar'} justify='space-between'>
                        <Col flex='40%'>
                        </Col>
                        <Col >
                            <Space size={10}>
                                <Button type="primary"  size="large" icon={<PlusOutlined/>} onClick={this.addMenu.bind(this,{title:'新增',operateType:"add",parentId:0})}>
                                    新建
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                    <Table bordered
                           rowKey='id'
                           dataSource={data}
                           columns={this.columns}
                           expandable={{childrenColumnName:'childrenList'}}
                           // pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                        loading={loading}
                    > </Table>
                </Card>
                <AddMenu {...addData} onClose={this.closeAddModal} onSuccess={()=>{this.getData()}}/>
            </>
        )
    }
}