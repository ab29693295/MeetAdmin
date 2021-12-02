import React, {Component} from "react";
import {Modal, Input, Table, Card, Button, message, Row, Col, Space} from 'antd';
import { PlusOutlined, CheckSquareOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {formatDateTime} from '../../common/js/tools'
import axios from '../../axios/liveApi'
import ExamineModal from '@/components/ExamineModal'
import api from '../../path/index'
const {Search} = Input;

class LiveList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            selectedRowKeys: [], //选中的行
            loading: false,
            params:{
                page:1,
                pageSize:10,
                projectID:0,
                key:''
            },
            pageData:{
                total:0
            },
            examineInfo:{
                visible:false,
                data:'',
                title:'课程审核'
            },
            showInfo:{
                visible:false,
                id:''
            }

        }
        this.searchCourse = this.searchCourse.bind(this);
        this.changPage=this.changPage.bind(this)
        this.checkStatus=this.checkStatus.bind(this)
        this.examineFinish=this.examineFinish.bind(this)
        this.examineCancel=this.examineCancel.bind(this)

        this.columns = [
            {
                title: '课程名称',
                dataIndex: 'courseName',
                width: '8%',
                align: 'center'
            },
            {
                title: '课程描述',
                dataIndex: 'des',
                width: '15%',
                align: 'center'
            },
            {
                title: '背景图片',
                dataIndex: 'imagePath',
                width: '15%',
                align: 'center',
                render:(text,record)=>{
                    return <img src={api.tuDomain+record.imagePath} width='150' height='80'></img>
                }
            },
            {
                title: '开始时间',
                dataIndex: 'startDate',
                width: '10%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.startDate))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '结束时间',
                dataIndex: 'endDate',
                width: '10%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.endDate))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '机构名称',
                dataIndex: 'appName',
                align: 'center'
            },
            {
                title: '是否公开',
                dataIndex: 'isPublic',
                align: 'center',
                render: (text, record) => {
                    if (record.isPublic == 1) {
                        return <span> 公开</span>
                    } else if(record.isPublic == 2){
                        return <span>密钥</span>
                    }else{
                        return <span>不公开</span>
                    }

                }
            },
            {
                title: '审核状态',
                dataIndex: 'checkStatus',
                align: 'center',
                render: (text, record) => {
                    if (record.checkStatus == 0) {
                        return <span> 未审核</span>
                    } else if(record.checkStatus == 1){
                        return <span>通过</span>
                    }else{
                        return <span>不通过</span>
                    }
                }
            },
            {
                title: '创建人',
                dataIndex: 'creatorName',
                width: '5%',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'createDate',
                width: '10%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.createDate))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '操作',
                dataIndex: 'id',
                align: 'center',
                render: (text, record) => {
                    return (
                        <Space size={5}>
                            <Button size="small" data-record={record} onClick={ this.del.bind(this,record) } type="primary" danger>删除</Button>
                            <Button size="small" type="primary" onClick={this.handleModify.bind(this,record)}> 管理</Button>
                        </Space>
                    )
                }
            }
        ]
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let {params}=this.state
        this.setState({
            loading:true
        })
        axios.getCourseList(params).then((res) => {
            if(res.success){
                let response=res.response
                this.setState({data: response.data,pageData:{...this.state.pageData,total:response.dataCount}});
            }
            this.setState({
                loading:false
            })
        })
    }

    //删除
    del (data){
        let that=this;
        Modal.confirm({
            title: `确定要删除${data.courseName}?`,
            okText: "确认",
            cancelText: "取消",
            onOk() {
                let params = {cid: data.id};
                axios.deleteCourse(params).then((res) => {
                    if (res.success) {
                        message.success(
                            "删除成功！",
                        );
                        //重新获取数据
                        this.setState({
                            params:{...this.state.params,page: 1,pageSize:10}
                        },function(){
                            that.getData()
                        })
                    } else {
                        message.error("删除失败！");
                    }

                });
            },
            onCancel() {
            },
        });

    };

    //修改
    handleModify(data){
        this.props.history.push({
            pathname: '/live/liveDetail/'+data.id,
        })
    }

    //检索
    searchCourse(textValue) {
        this.setState({
            params:{...this.state.params,key:textValue,page: 1}
        },function () {
            this.getData();
        })

    }

    //选择课程
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    //翻页
    changPage(page){
        //翻页
        this.setState({
            params:{...this.state.params,page: page}
        },function () {
            this.getData();
        })

    }

    //提交审核
    examineFinish(values){
        //接口
        let {data}=this.state.examineInfo
        axios.setCheckStatus({cids:data,status:values.status}).then(res=>{
            if(res.success){
                message.success('审核成功！')
                this.getData()
                this.setState({ selectedRowKeys:[] });
            }else{
                message.error('审核失败！')
            }
            this.examineCancel()
            // this.setState({
            //     examineInfo:{...this.state.examineInfo,visible:false,data:''}
            // })
        })
    }

    //取消审核
    examineCancel(){
        this.setState({
            examineInfo:{...this.state.examineInfo,visible:false,data:''}
        })
    }

    //审核课程
    checkStatus() {
        let {selectedRowKeys}=this.state;
        if(selectedRowKeys.length>0){
            this.setState({
                examineInfo:{...this.state.examineInfo,visible:true,data:selectedRowKeys.join(',')}
            })
        }else{
            message.info('请选择需要审核的课程')
        }
    }

    render() {
        const {  selectedRowKeys,pageData,loading } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <>
                <Card title="直播列表">
                    <Row className={'toolbar'} justify='space-between'>
                        <Col flex='40%'>
                            <Search
                                placeholder="直播关键字"
                                allowClear
                                enterButton="搜索"
                                size="large"
                                onSearch={this.searchCourse}
                            />
                        </Col>
                        <Col >
                            <Space size={10}>
                                <Link to={{pathname:'/live/newLive'}}>
                                    <Button type="primary"  size="large" icon={<PlusOutlined/>}>
                                        新建直播
                                    </Button>
                                </Link>
                                <Button type="primary" size="large" icon={<CheckSquareOutlined/>}
                                        onClick={this.checkStatus}>审核</Button>
                            </Space>
                        </Col>
                    </Row>

                    <Table bordered
                           rowKey='id'
                           dataSource={this.state.data}
                           columns={this.columns}
                           rowSelection={rowSelection}
                           pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                           loading={loading}
                    > </Table>
                </Card>
                <ExamineModal {...this.state.examineInfo} examineFinish={this.examineFinish} examineCancel={this.examineCancel}/>
                {/*<ShowModal {...this.state.showInfo} showCallback={this.setShowModal}/>*/}
            </>

        )
    }
}

export default LiveList
