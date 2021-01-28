import React, {Component} from "react";
import {Modal, Input, Table, Card, Button, message, Row, Col, Space} from 'antd';
import {SearchOutlined, PlusOutlined, CheckSquareOutlined, CloseCircleOutlined} from '@ant-design/icons';
import styles from './css/index.module.css'
import {Link} from 'react-router-dom'
import {formatDateTime} from '../../common/js/tools'
import axios from '../../axios'

const {Search} = Input;

const onSearch = value => console.log(value);

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
        }
        this.SearchMeet = this.SearchMeet.bind(this);
        this.changPage=this.changPage.bind(this)
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
                title: '操作',
                dataIndex: 'id',
                align: 'center',
                render: (text, record) => {
                    let delTxt = record.lockStatus == 1 ? '解锁' : '锁定';
                    return (
                        <Space size={5}>
                            <Button size="small" type="primary" className={` ${record.lockStatus == 1?styles.infoBtn:styles.infoBtn1}`}>{delTxt}</Button>
                            <Button size="small" data-record={record} onClick={ this.del.bind(this,record) } type="primary" danger>删除</Button>
                            <Button size="small" type="primary" > 查看</Button>
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

    //检索
    SearchMeet(textValue) {
        this.setState({
            params:{...this.state.params,key:textValue,page: 1}
        },function () {
            this.getMeetData();
        })

    }

    //审核课程
    CheckMeet() {

    }

    //选择课程
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
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
            <Card title="会议列表">
                <Row className={styles.toolbar} justify='space-between'>
                    <Col flex='40%'>
                        <Search
                            placeholder="视频会议关键字"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            onSearch={this.SearchMeet}
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
                                    onClick={this.CheckMeet}>审核</Button>
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
        )
    }
}

export default MeetList
