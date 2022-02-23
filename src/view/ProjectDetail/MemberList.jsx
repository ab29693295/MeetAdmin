import React, {Component} from "react";
import {Button, Col, message, Modal, Row, Space, Table, Tag} from "antd";
// import AddUserModal from './component/AddUserModal'
import {getAllProUser} from '@/axios/project'
import {formatDateTime} from "../../common/js/tools";
import {
    getUserList,
    setForbiddenUser,
    deleteUser
} from '../../axios/user'
import {Link} from "react-router-dom";
import styles from "../UserManage/css/index.module.css";
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
                proID:this.props.id,
                page:1,
                pageSize:10,
                key:''
            },
            addInfo:{
               rid: this.props.id,
                visible:false
            }
        }
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'userName',
                align: 'center'
            },
            {
                title: '真实姓名',
                dataIndex: 'trueName',
                align: 'center'
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                align: 'center'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                align: 'center'
            },
            {
                title: '用户关联',
                dataIndex: 'states',
                width: '10%',
                align: 'center',
                render: (text, record, index) => {
                    if (record.isBind == 1) {
                        return <span> 已关联</span>
                    } else {
                        return <span>未关联</span>
                    }

                }
            },
            {
                title: '启用状态',
                dataIndex: 'states',
                width: '10%',
                align: 'center',
                render: (text, record, index) => {
                    if (record.states == 1) {
                        return <span> 启用</span>
                    } else {
                        return <span>禁用</span>
                    }

                }
            },
            {
                title: '最近登录',
                dataIndex: 'lastModyDate',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.lastModyDate))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '操作',
                dataIndex: 'id',
                align: 'center',
                render: (text, record,index) => {
                    let delTxt = record.states == 1 ? '禁用' : '启用';
                    return (
                        <Space size={5}>
                            <Button size="small" type="primary" >
                                <Link to={{pathname:'/user/detail/'+record.id}}>详情</Link>
                            </Button>
                            <Button size="small"
                                    className={` ${record.states == 1 ? styles.infoBtn : styles.infoBtn1}`}
                                    onClick={this.setForbiddenUser.bind(this,record,index)}>{delTxt}</Button>
                            <Button size="small" type="primary">权限</Button>
                            <Button size="small" onClick={ this.deleteUser.bind(this,record)} type="primary" danger>删除</Button>
                        </Space>
                    )
                }
            }
        ]
        this.getData=this.getData.bind(this)
        this.changPage=this.changPage.bind(this)
    }


    componentDidMount() {
        this.getData()
    }
    getData(){
        let {params}=this.state
        this.setState({
            loading:true
        })
        getAllProUser(params).then(res=>{
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
    changPage(page){
        this.setState({
            params:{...this.state.params,page: page}
        },function () {
            this.getData();
        })
    }
    setForbiddenUser (record,index){
        setForbiddenUser({uID:record.id,status:record.states==1?0:1}).then(res=>{
            if(res.success){
                let {data}=this.state;
                if(record.states==1){
                    data[index].states=0
                    message.success('用户已禁用')
                }else{
                    data[index].states=1
                    message.success('用户已解禁')
                }
                this.setState({
                    data
                })
            }

        })
    }
    deleteUser(record){
        let that=this
        Modal.confirm({
            title: "确定删除用户？",
            okText: "确定",
            cancelText: "取消",
            content: (
                <div>
                    <p>用户：{record.trueName}</p>
                </div>
            ),
            onOk() {
                let params = { uID: record.id };
                deleteUser(params).then((res) => {
                    if (res.success) {
                        message.success(
                            "删除成功"
                        );
                        that.getUserData({ page: 1,pageSize:10 });
                    } else {
                        message.error(
                            "删除失败"
                        );
                    }

                });
            },
            onCancel() {
            },
        });
    }
    render() {
        let {loading,data,pageData,addInfo}=this.state;
        return (<>
            {/*<Row className={'toolbar'} justify='space-between'>*/}
            {/*    <Col flex='40%'>*/}

            {/*    </Col>*/}
            {/*    <Col >*/}
            {/*        <Space size={10}>*/}
            {/*            /!*<Button type="primary"  size="large" onClick={this.showAddModal}>*!/*/}
            {/*            /!*    添加成员*!/*/}
            {/*            /!*</Button>*!/*/}
            {/*        </Space>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <Table bordered
                   rowKey='id'
                   dataSource={data}
                   columns={this.columns}
                   pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                   loading={loading}
            > </Table>
            {/*<AddUserModal {...addInfo} addModalCallback={this.showAddModal}/>*/}
        </>)
    }
}

export default MemberList
