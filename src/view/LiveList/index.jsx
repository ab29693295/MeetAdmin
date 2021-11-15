import React, {Component} from "react";
import {Modal, Input, Table, Card, Button, message, Row, Col, Space} from 'antd';
import { PlusOutlined, CheckSquareOutlined} from '@ant-design/icons';
import styles from './css/index.module.css'
import {Link} from 'react-router-dom'
import {formatDateTime} from '../../common/js/tools'
import axios from '../../axios/liveApi'

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
                data:''
            },
            showInfo:{
                visible:false,
                id:''
            }

        }
        this.searchMeet = this.searchMeet.bind(this);
        this.changPage=this.changPage.bind(this)
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
                    return <img src={record.imagePath} width='150' height='80'></img>
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
                dataIndex: 'isPublic',
                align: 'center',
                render: (text, record) => {
                    if (record.isPublic == 1) {
                        return <span> 未审核</span>
                    } else if(record.isPublic == 2){
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
            title: `确定要删除${data.roomName}?`,
            okText: "确认",
            cancelText: "取消",
            onOk() {
                let params = {rID: data.id};
                axios.deleteMeetRoom(params).then((res) => {
                    if (res.success) {
                        message.success(
                            "删除成功！",
                        );
                        //重新获取数据
                        that.getMeetData({page: 1,pageSize:10})
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
    searchMeet(textValue) {
        this.setState({
            params:{...this.state.params,key:textValue,page: 1}
        },function () {
            this.getMeetData();
        })

    }

    //选择课程
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    //翻页
    changPage(page){
        this.setState({
            params:{...this.state.params,page: page}
        },function () {
            this.getMeetData();
        })

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
                                onSearch={this.searchMeet}
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
                                        onClick={this.checkMeet}>审核</Button>
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
                {/*<ExamineModal {...this.state.examineInfo} examineCallback={this.setExamineModal}/>*/}
                {/*<ShowModal {...this.state.showInfo} showCallback={this.setShowModal}/>*/}
            </>

        )
    }
}

export default LiveList
