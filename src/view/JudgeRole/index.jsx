import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button, Card, Col, Input, Row, Space, Table} from "antd";
import { PlusOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {
    getALlRole,
    getPermissionList,
    checkRoleStatus,
    deleteRole,
    addOrUpdateRole
} from '@/axios/judge'
import RoleNewModal from './RoleNewModal'
import  * as menu from "@/redux/actions/menu";
const {Search} = Input;
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
                dataIndex: 'num',
                align:'center'
            },

            {
                title: '操作',
                align:'center',
                render: (text, record) => (
                    <Space size="middle">
                        <Button size="small" type="primary" onClick={this.addRole.bind(this,{title:'编辑',type:'up',initialValues:record})}>编辑</Button>
                        <Button size="small" type="primary" danger>删除</Button>
                    </Space>
                ),
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
                            <Search
                                placeholder="角色关键字"
                                allowClear
                                enterButton="搜索"
                                size="large"
                                onSearch={this.searchProject}
                            />
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
        }
    };
};
export default connect(//关联store和组件
    mapStateToProps,
    mapDispatchToProps
)(JudgeRole)