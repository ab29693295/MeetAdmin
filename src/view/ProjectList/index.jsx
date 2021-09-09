import React, {Component} from "react";
import {Card, Table, Button, Col, Space, Row, Input, message} from "antd";
import {SearchOutlined, PlusOutlined, CheckSquareOutlined, CloseCircleOutlined} from '@ant-design/icons';
import axios from '@/axios'
import styles from "../MeetList/css/index.module.css";
import {Link} from "react-router-dom";
const {Search} = Input;
class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            pageData:{},
            projectData:[],
            params:{
                page:1,
                pageSize:10,
                key:''
            },
        }
        this.columns=[
            {
                title: '机构名称',
                dataIndex: 'appName',
                width: '20%',
                align: 'center'
            },
            {
                title: '机构KEY',
                dataIndex: 'appKey',
                align: 'center'
            },
            {
                title: '机构链接',
                dataIndex: 'appUrl',
                align: 'center'
            },
            {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
                render: (text, record) => {
                    if (record.status == 1) {
                        return <span>未禁用</span>
                    } else {
                        return <span>禁用</span>
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'option',
                align: 'center',
                render: (text, record,index) => {
                    if (record.status == 1) {
                        return <Button size="small" type="primary" onClick={this.changeStatus.bind(this,record,index)} danger>禁用</Button>
                    } else {
                        return <Button size="small" type="primary" onClick={this.changeStatus.bind(this,record,index)}>解禁</Button>
                    }
                }
            },

        ]
        this.getData=this.getData.bind(this)
        this.searchProject=this.searchProject.bind(this)
        this.changPage=this.changPage.bind(this)
    }

    componentDidMount() {
        this.getData()
    }
    getData(){
        let {params}=this.state;
        this.setState({
            loading:true
        })
        axios.getAllProject(params).then(res=>{
            if(res.success){
                let response=res.response
                this.setState({projectData: response.data,pageData:{...this.state.pageData,total:response.dataCount}});
            }
            this.setState({
                loading:false
            })
        })
    }
    //搜索
    searchProject(val){
        this.setState({
            params:{...this.state.params,key:val,page: 1}
        },function () {
            this.getData();
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
    //状态
    changeStatus(record,index){
        axios.setProjectStatus({aID:record.id,Status:record.status==1?0:1}).then(res=>{
            if(res.success){
                let {projectData}=this.state;
                if(record.status==1){
                    projectData[index].status=0
                    message.success('机构解禁成功')
                }else{
                    projectData[index].status=1
                    message.success('机构禁用成功')
                }
                this.setState({
                    projectData:projectData
                })
            }

        })
    }

    render() {
        let {loading,projectData,pageData}=this.state
        return (
            <>
            <Card title="机构列表">
                <Row className={'toolbar'} justify='space-between'>
                    <Col flex='40%'>
                        <Search
                            placeholder="机构关键字"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            onSearch={this.searchProject}
                        />
                    </Col>
                    <Col >
                        <Space size={10}>
                            <Link to={{pathname:'/project/newProject'}}>
                                <Button type="primary"  size="large" icon={<PlusOutlined/>}>
                                    新建机构
                                </Button>
                            </Link>
                        </Space>
                    </Col>
                </Row>
                <Table bordered
                       rowKey='id'
                       dataSource={projectData}
                       columns={this.columns}
                       pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                       loading={loading}
                > </Table>
            </Card>
            </>)
    }
}

export default ProjectList
