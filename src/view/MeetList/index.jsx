import React, {Component} from "react";
import {Table,Card,Button} from 'antd';
import { Link } from 'react-router-dom'
const columns = [{
    title: '开始时间',
    dataIndex: 'name',
    render: name => `${name.first} ${name.last}`,
    width: '20%',
    align:'center'
}, {
    title: '会议主题',
    dataIndex: 'gender',
    width: '20%',
    align:'center'
}, {
    title: '会议号',
    dataIndex: 'email',
    align:'center'
}, {
    title: '状态',
    dataIndex: 'email',
    align:'center'
},
    {
        title: '操作',
        dataIndex: 'email',
        align:'center'
    }
]

class MeetList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <Card title="会议列表" extra={<Button type="primary"><Link to={
                {pathname:'/newMeet',state:1}}>新建会议</Link></Button>} >
            <Table bordered
                   columns={columns}
                   pagination={{ position: ['none', 'bottomRight'] }}
            > </Table>
            </Card>
        )
    }
}

export default MeetList
