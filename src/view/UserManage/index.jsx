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
    title: '��������',
    dataIndex: 'roomName',
    width: '20%',
    align: 'center'
}, {
    title: '��ʼʱ��',
    dataIndex: 'startTime',
    width: '20%',
    align: 'center',
    render: (text, record, index) => {
        var dateStr = formatDateTime(new Date(record.startTime))
        return <a>{dateStr}</a>
    }

}, {
    title: '����ʱ��',
    dataIndex: 'endTime',
    width: '20%',
    align: 'center',
    render: (text, record, index) => {
        var dateStr = formatDateTime(new Date(record.endTime))
        return <a>{dateStr}</a>
    }
}, {
    title: '�Ƿ񹫿�',
    dataIndex: 'isPublic',
    align: 'center',
    render: (text, record, index) => {

        if (record.isPublic == 1) {
            return <a> ����</a>
        }
        else {
            return <a>���</a>
        }

    }
}, {
    title: '״̬',
    dataIndex: 'lockStatus',
    align: 'center',
    render: (text, record, index) => {

        if (record.lockStatus == 1) {
            return <a> ����</a>
        }
        else {
            return <a>δ����</a>
        }

    }
},
{
    title: '����',
    dataIndex: 'id',
    align: 'center',
    render: (text, record, index) => {
        var delTxt = record.lockStatus == 1 ? '����' : '����';

        return <div>
            {

                <div className="operating-button-administrator">

                    <Button size="small" >{delTxt}</Button>
                    <Button size="small" onClick={() => del(record)} >ɾ��</Button>
                    <Button size="small"> �鿴</Button>
                </div>
            }
        </div>
    }
}
]

const del = (data) => {
    Modal.confirm({
        title: "��Ϣ",
        okText: "ȷ��",
        cancelText: "ȡ��",
        content: (
            <div>
                <p>ȷ��Ҫɾ��{data.roomname}?</p>
            </div>
        ),
        onOk() {
            // alert(data.id)
            var params = { rID: data.id };
            axios.deleteMeetRoom(params).then((res) => {
                if (res.success) {
                    notification.success({
                        message: "ɾ���ɹ�",
                    });
                } else {
                    notification.warning({
                        message: "ɾ��ʧ��",
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
    //����
    SearchMeet(textValue) {


        var params = { page: 1, key: textValue };
        this.getMeetData(params);
    }
    //��˿γ�
    CheckMeet() {

    }



    render() {

        return (
            <Card title="�����б�"  >

                <Input.Group compact>
                    <Search

                        placeholder="��Ƶ����ؼ���"
                        allowClear
                        enterButton="����"
                        size="large"
                        style={{ width: '40%' }}
                        onSearch={this.SearchMeet}
                    />


                    <Button type="primary" style={{ marginLeft: '2%' }} size="large" icon={<PlusOutlined />} onClick={this.SearchMeet}  >�½�����</Button>

                    <Button type="primary" style={{ marginLeft: '2%' }} size="large" icon={<CheckSquareOutlined />} onClick={this.CheckMeet}  >���ͨ��</Button>
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
