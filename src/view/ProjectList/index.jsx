import React, {Component} from "react";
import {Card, Table, Button, Col, Space, Row, Input, message, Tag} from "antd";
import { PlusOutlined} from '@ant-design/icons';
import {
    getAllProject,
    setProjectStatus,
    selectProject
} from '@/axios/project'
import {setAllProjects} from "@/redux/actions/set";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
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
                key:'',
                liveType:0
            },
        }
        this.columns=[
            {
                title: '机构名称',
                dataIndex: 'proName',
                width: '20%',
                align: 'center'
            },
            {
                title: '机构KEY',
                dataIndex: 'proKey',
                align: 'center'
            },
            {
                title: '机构链接',
                dataIndex: 'proUrl',
                align: 'center'
            },
            {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
                render: (text, record) => {
                    if(record.status==1){
                        return <Tag color="#87d068">启用</Tag>
                    }else{
                        return <Tag color="#f50">停用</Tag>
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'option',
                align: 'center',
                render: (text, record,index) => {
                    let tip='启用'
                    if (record.status == 1) {
                        tip='停用'
                    }
                    return(
                        <Space size={5}>
                            <Button size="small" type="primary" onClick={this.changeStatus.bind(this,record,index)} danger={record.status==1}>{tip}</Button>
                            <Button size="small" type="primary" onClick={this.handleModify.bind(this,record)}> 管理</Button>
                        </Space>
                    )
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
        getAllProject(params).then(res=>{
            if(res.success){
                let response=res.response
                this.setState({projectData: response.data,pageData:{...this.state.pageData,total:response.dataCount}});
            }
            this.setState({
                loading:false
            })
        })
        let {setAllProjects}=this.props
        selectProject({key:''}).then(res=>{
            if(res.success){
                setAllProjects(res.response)
            }
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
        setProjectStatus({aID:record.id,Status:record.status==1?0:1}).then(res=>{
            if(res.success){
                let {projectData}=this.state;
                if(record.status==1){
                    projectData[index].status=0
                }else{
                    projectData[index].status=1
                }
                message.success('操作成功')
                this.setState({
                    projectData:projectData
                })
            }

        })
    }

    handleModify(data){
        this.props.history.push({
            pathname: '/project/detail/'+data.id,
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
const mapStateToProps = (state) =>//将state转到props
{
    return {
        allProjects:state.set.allProjects
    };
};
const mapDispatchToProps = dispatch => ({
    setAllProjects:(allProjects)=>{
        dispatch(setAllProjects(allProjects));
    }

})
export default connect(mapStateToProps,mapDispatchToProps)(ProjectList)
