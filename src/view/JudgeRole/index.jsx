import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button, Card, Col, Input, message, Modal, Row, Space, Table, Tag} from "antd";
import { PlusOutlined} from '@ant-design/icons';
import {
    getALlRole,
    getPermissionList,
    checkRoleStatus,
    deleteRole
} from '@/axios/judge'
import RoleNewModal from './RoleNewModal'
import  * as menu from "@/redux/actions/menu";
import * as role from "@/redux/actions/role";
const {Search} = Input;
const { confirm } = Modal;
class JudgeRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleList:[],
            pageData:{
                total:0
            },
            addRoleData:{
                visible:false,
                title:'新建',
                initialValues:{},
                type:'add'
            },
            loading:false
        };
        this.getData=this.getData.bind(this)
        this.getMenus=this.getMenus.bind(this)
        this.closeAddModal=this.closeAddModal.bind(this)
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                align:'center'
            },
            {
                title: '角色描述',
                dataIndex: 'des',
                align:'center'
            },
            {
                title: '角色人数',
                dataIndex: 'roleCount',
                align:'center'
            },
            {
                title: '状态',
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
                title: '操作',
                align:'center',
                render: (text, record,index) => {
                    let tip='启用'
                    if(record.status==1){
                        tip='停用'
                    }else{
                        tip='启用'
                    }
                    return (
                        <Space size="middle">
                            <Button size="small" type="primary" onClick={this.changeStatus.bind(this,{id:record.id,status:record.status,index})}>{tip}</Button>
                            <Button size="small" type="primary" onClick={this.addRole.bind(this,{title:'编辑',type:'up',initialValues:record})}>编辑</Button>
                            <Button size="small" type="primary" danger onClick={this.delRole.bind(this,{id:record.id})}>删除</Button>
                        </Space>
                    )
                },
            },
        ]
    }
    componentDidMount() {
        this.getData()
        this.getMenus()
    }
    getData(){
        this.setState({
            loading:true
        })
        getALlRole().then(res=>{
            if(res.success){
                this.setState({
                    roleList:res.response,
                    loading:false
                })
                this.props.setAllRoles(res.response)
            }

        })
    }
    getMenus(){
        getPermissionList().then(res=>{
            if(res.success){
               this.props.setAllMenus(res.response)
            }
        })
    }
    addRole(data){
        let {addRoleData}=this.state
        this.setState({
            addRoleData:{...addRoleData,visible:true,initialValues:{}, ...data}
        })
    }
    delRole(id){
        let that=this
        confirm({
            title: '确定删除当前角色吗？',
            onOk() {
                deleteRole(id).then(res=>{
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
        checkRoleStatus({id,status:status1}).then(res=>{
            let {roleList}=this.state;
            if(res.success){
                if(status==1){
                    roleList[index].status=0
                }else{
                    roleList[index].status=1
                }
                message.success('操作成功！')
                this.setState({
                    roleList
                })
            }
        })
    }
    closeAddModal(){
        let {addRoleData}=this.state
        this.setState({
            addRoleData:{...addRoleData,visible:false}
        })
    }

    render() {
        let {roleList,pageData,addRoleData,loading}=this.state;
        return (
            <>
                <Card title="角色管理" className='content-card'>
                    <Row className={'toolbar'} justify='space-between'>
                        <Col flex='40%'>
                        </Col>
                        <Col >
                            <Space size={10}>
                                {/*<Link to={{pathname:'/judge/newRole'}}>*/}
                                    <Button type="primary"  size="large" icon={<PlusOutlined/>} onClick={this.addRole.bind(this,{title:'新建',type:'add'})}>
                                        新建
                                    </Button>
                                {/*</Link>*/}
                            </Space>
                        </Col>
                    </Row>
                    <Table bordered
                           rowKey='id'
                           dataSource={roleList}
                           columns={this.columns}
                           pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                           loading={loading}
                    > </Table>
                </Card>
                <RoleNewModal {...addRoleData} onClose={this.closeAddModal} onSuccess={()=>{this.getData()}}/>
            </>
        )
    }
}
const mapStateToProps = (state) =>//将state转到props
{
    return {
        menus: state.menu.allMenus
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setAllMenus:(allMenus)=>{
            dispatch(menu.setAllMenus(allMenus));
        },
        setAllRoles:(allRoles)=>{
            dispatch(role.setAllRoles(allRoles));
        }
    };
};
export default connect(//关联store和组件
    mapStateToProps,
    mapDispatchToProps
)(JudgeRole)