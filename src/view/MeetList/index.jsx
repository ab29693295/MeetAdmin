import React, {Component} from "react";
import {Modal, Input, Table, Card, Button, message, Row, Col, Space} from 'antd';
import {SearchOutlined, PlusOutlined, CheckSquareOutlined, CloseCircleOutlined} from '@ant-design/icons';
import styles from './css/index.module.css'
import {Link} from 'react-router-dom'
import {formatDateTime} from '../../common/js/tools'
import ExamineModal from './ExamineModal'
import axios from '../../axios'

const {Search} = Input;

class MeetList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meetData: [],
            selectedRowKeys: [], //选中的行
            loading: false,
            params:{
                page:1,
                pageSize:10,
                key:''
            },
            pageData:{
                total:0
            },
            examineInfo:{
                visible:false,
                data:''
            }

        }
        this.searchMeet = this.searchMeet.bind(this);
        this.changPage=this.changPage.bind(this)
        this.checkMeet=this.checkMeet.bind(this)
        this.setExamineModal=this.setExamineModal.bind(this)
        this.columns = [
            {
                title: '会议主题',
                dataIndex: 'roomName',
                width: '20%',
                align: 'center'
            },
            {
                title: '开始时间',
                dataIndex: 'startTime',
                width: '20%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.startTime))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
                width: '20%',
                align: 'center',
                render: (text, record) => {
                    let dateStr = formatDateTime(new Date(record.endTime))
                    return <span>{dateStr}</span>
                }
            },
            {
                title: '是否公开',
                dataIndex: 'isPublic',
                align: 'center',
                render: (text, record) => {
                    if (record.isPublic == 1) {
                        return <span> 公开</span>
                    } else {
                        return <span>封闭</span>
                    }

                }
            },
            {
                title: '锁定状态',
                dataIndex: 'lockStatus',
                align: 'center',
                render: (text, record, index) => {

                    if (record.lockStatus == 1) {
                        return <span> 锁定</span>
                    } else {
                        return <span>未锁定</span>
                    }

                }
            },
            {
                title: '审核状态',
                dataIndex: 'status',
                align: 'center',
                render: (text, record, index) => {

                    if (record.status == 1) {
                        return <span>审核通过</span>
                    } else if(record.status == 2) {
                        return <span>审核未通过</span>
                    }else{
                        return <span>未审核</span>
                    }

                }
            },
            {
                title: '操作',
                dataIndex: 'id',
                align: 'center',
                render: (text, record,index) => {
                    let delTxt = record.lockStatus == 1 ? '解锁' : '锁定';
                    return (
                        <Space size={5}>
                            <Button size="small" type="primary"
                                    className={` ${record.lockStatus == 1?styles.infoBtn:styles.infoBtn1}`}
                                    onClick={this.changeLock.bind(this,record,index)}>{delTxt}</Button>
                            <Button size="small" data-record={record} onClick={ this.del.bind(this,record) } type="primary" danger>删除</Button>
                            <Button size="small" type="primary" > 查看</Button>
                            <Button size="small" type="primary" onClick={this.handleModify.bind(this,record)}> 修改</Button>
                        </Space>
                    )
                }
            }
        ]
    }

    componentDidMount() {
        // let params = {page: 1};
        this.getMeetData();
    }

    getMeetData() {
        let {params}=this.state
        this.setState({
            loading:true
        })
        axios.getMeetList(params).then((res) => {
            if(res.success){
                let response=res.response
                this.setState({meetData: response.data,pageData:{...this.state.pageData,total:response.dataCount}});
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
            pathname: '/meet/newMeet',
            state:{id:data.id}
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

    //审核课程
    checkMeet() {
        let {selectedRowKeys}=this.state;
        if(selectedRowKeys.length>0){
            this.setState({
                examineInfo:{...this.state.examineInfo,visible:true,data:selectedRowKeys.join(',')}
            })
        }else{
            message.info('请选择需要审核的课程')
        }
    }

    setExamineModal(update){
        if(update){
            // this.setState({
            //     // params:{...this.state.params,page: 1}
            // },function () {
                this.getMeetData();
            // })
        }
        this.setState({
            examineInfo:{...this.state.examineInfo,visible:false,data:''}
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
    //锁定状态
    changeLock(record,index){
        axios.lockRoom({rID:record.id,LockStatus:record.lockStatus==1?0:1}).then(res=>{
            if(res.success){
                let {meetData}=this.state;
                if(record.lockStatus==1){
                    meetData[index].lockStatus=0
                    message.success('解锁房间成功')
                }else{
                    meetData[index].lockStatus=1
                    message.success('锁定房间成功')
                }
                this.setState({
                    meetData:meetData
                })
            }

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
                    <Card title="会议列表">
                    <Row className={styles.toolbar} justify='space-between'>
                        <Col flex='40%'>
                            <Search
                                placeholder="视频会议关键字"
                                allowClear
                                enterButton="搜索"
                                size="large"
                                onSearch={this.searchMeet}
                            />
                        </Col>
                        <Col >
                            <Space size={10}>
                                <Link to={{pathname:'/meet/newMeet'}}>
                                    <Button type="primary"  size="large" icon={<PlusOutlined/>}>
                                        新建会议
                                    </Button>
                                </Link>
                                <Button type="primary" size="large" icon={<CheckSquareOutlined/>}
                                        onClick={this.checkMeet}>审核</Button>
                            </Space>
                        </Col>
                    </Row>

                    <Table bordered
                           rowKey='id'
                           dataSource={this.state.meetData}
                           columns={this.columns}
                           rowSelection={rowSelection}
                           pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                           loading={loading}
                    > </Table>
                </Card>
                    <ExamineModal {...this.state.examineInfo} examineCallback={this.setExamineModal}/>
                </>

        )
    }
}

export default MeetList
