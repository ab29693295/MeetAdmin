import React, { Component } from "react";
import { Modal, Input, Table, Card, Button, notification } from 'antd';
import { SearchOutlined, PlusOutlined, CheckSquareOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './css/index.module.css';
import { Link } from 'react-router-dom';
import axios from '../../axios'

const { Search } = Input;

var formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
};


const columns = [{
    title: '会议主题',
    dataIndex: 'roomName',
    width: '20%',
    align: 'center'
}, {
    title: '开始时间',
    dataIndex: 'startTime',
    width: '20%',
    align: 'center',
    render: (text, record, index) => {
        var dateStr = formatDateTime(new Date(record.startTime))
        return <a>{dateStr}</a>
    }

}, {
    title: '结束时间',
    dataIndex: 'endTime',
    width: '20%',
    align: 'center',
    render: (text, record, index) => {
        var dateStr = formatDateTime(new Date(record.endTime))
        return <a>{dateStr}</a>
    }
}, {
    title: '是否公开',
    dataIndex: 'isPublic',
    align: 'center',
    render: (text, record, index) => {

        if (record.isPublic == 1) {
            return <a> 公开</a>
        }
        else {
            return <a>封闭</a>
        }

    }
}, {
    title: '状态',
    dataIndex: 'lockStatus',
    align: 'center',
    render: (text, record, index) => {

        if (record.lockStatus == 1) {
            return <a> 锁定</a>
        }
        else {
            return <a>未锁定</a>
        }

    }
},
{
    title: '操作',
    dataIndex: 'id',
    align: 'center',
    render: (text, record, index) => {
        var delTxt = record.lockStatus == 1 ? '解锁' : '锁定';

        return <div>
            {

                <div className="operating-button-administrator">

                    <Button size="small" >{delTxt}</Button>
                    <Button size="small" onClick={() => del(record)} >删除</Button>
                    <Button size="small"> 查看</Button>
                </div>
            }
        </div>
    }
}
]

const del = (data) => {
    Modal.confirm({
        title: "信息",
        okText: "确认",
        cancelText: "取消",
        content: (
            <div>
                <p>确定要删除{data.roomname}?</p>
            </div>
        ),
        onOk() {
            // alert(data.id)
            var params = { rID: data.id };
            axios.deleteMeetRoom(params).then((res) => {
                if (res.success) {
                    notification.success({
                        message: "删除成功",
                    });
                } else {
                    notification.warning({
                        message: "删除失败",
                    });
                }

            });
        },
        onCancel() { },
    });

};



const onSearch = value => console.log(value);

class UserManage extends Component {


    constructor(props) {
        super(props)
        this.state = {
            meetdata: []
        }
        this.SearchMeet = this.SearchMeet.bind(this);
    }

    componentDidMount() {

        var params = { page: 1 };
        this.getMeetData(params);



    }

    getMeetData(params) {
        axios.getMeetList(params).then((res) => {
            console.log(res)

            this.setState({ meetdata: res.response.data });




        })
    }
    //检索
    SearchMeet(textValue) {


        var params = { page: 1, key: textValue };
        this.getMeetData(params);
    }
    //审核课程
    CheckMeet() {

    }



    render() {

        return (
            <Card title="会议列表"  >

                <Input.Group compact>
                    <Search

                        placeholder="视频会议关键字"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        style={{ width: '40%' }}
                        onSearch={this.SearchMeet}
                    />


                    <Button type="primary" style={{ marginLeft: '2%' }} size="large" icon={<PlusOutlined />} onClick={this.SearchMeet}  >新建会议</Button>

                    <Button type="primary" style={{ marginLeft: '2%' }} size="large" icon={<CheckSquareOutlined />} onClick={this.CheckMeet}  >审核通过</Button>
                </Input.Group>

                <br />

                <Table bordered
                    dataSource={this.state.meetdata}
                    columns={columns}

                    pagination={{ position: ['none', 'bottomRight'] }}
                > </Table>
            </Card>
        )
    }
}

export default UserManage
