import React, {Component} from "react";
import {Table} from 'antd';

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
            <Table bordered
                   columns={columns}
                   pagination={{ position: ['none', 'bottomRight'] }}
            > </Table>
        )
    }
}

export default MeetList
