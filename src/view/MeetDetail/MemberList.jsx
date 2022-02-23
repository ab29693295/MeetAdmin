import React, {Component} from "react";
import {Button, Col, Row, Space, Table,Tag} from "antd";
import styles from "../MeetList/css/index.module.css";
import {Link} from "react-router-dom";
import AddUserModal from './component/AddUserModal'
import axios from '@/axios'
class MemberList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            pageData:{
                total:0
            },
            params:{
                rID:this.props.id,
                page:1,
                pageSize:10
            },
            addInfo:{
               rid: this.props.id,
                visible:false
            }
        }
        this.columns = [
            {
                title: '昵称',
                dataIndex: 'userName',
                align: 'center'
            },
            {
                title: '真实姓名',
                dataIndex: 'trueName',
                align: 'center'
            },
            {
                title: '参会ID',
                dataIndex: 'peerID',
                align: 'center'
            },
            {
                title: '参会身份',
                dataIndex: 'isHost',
                align: 'center',
                render:(text, record, index)=>{
                    if(record.isHost == 1){
                      return   <Tag color="magenta">主持人</Tag>
                    }else{
                       return  <Tag color="lime">嘉宾</Tag>
                    }

                }
            },
            {
                title: '参会时常',
                dataIndex: 'totalMinutes',
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
                            <Button size="small" type="primary" > 修改</Button>
                        </Space>
                    )

                }
            },
        ]
        this.getData=this.getData.bind(this)
        this.changPage=this.changPage.bind(this)
        this.showAddModal=this.showAddModal.bind(this)
    }


    componentDidMount() {
        this.getData()
    }
    getData(){
        let {params}=this.state
        this.setState({
            loading:true
        })
        axios.getAllUserList(params).then(res=>{
            if(res.success){
                this.setState({
                    data:res.response.data,
                    pageData:{...this.state.pageData,total:res.response.dataCount}
                })
            }
            this.setState({
                loading:false
            })
        })
    }
    //翻页
    changPage(page){
        this.setState({
            params:{...this.state.params,page: page}
        },function () {
            this.getData();
        })

    }
    showAddModal(flag){
        this.setState({
            addInfo:{...this.state.addInfo,visible:!this.state.addInfo.visible}
        })
        if(flag){
            this.setState({
                params:{...this.state.params,page: 1}
            },function () {
                this.getData();
            })
        }
    }
    render() {
        let {loading,data,pageData,addInfo}=this.state;
        return (<>
            <Row className={'toolbar'} justify='space-between'>
                <Col flex='40%'>

                </Col>
                <Col >
                    <Space size={10}>
                            <Button type="primary"  size="large" onClick={this.showAddModal}>
                                添加成员
                            </Button>
                        <Button type="primary"  size="large" >
                            导入数据
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Table bordered
                   rowKey='peerID'
                   dataSource={data}
                   columns={this.columns}
                   pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                   loading={loading}
            > </Table>
            <AddUserModal {...addInfo} addModalCallback={this.showAddModal}/>
        </>)
    }
}

export default MemberList
