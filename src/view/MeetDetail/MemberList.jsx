import React, {Component} from "react";
import {Button, Col, Row, Space, Table} from "antd";
import styles from "../MeetList/css/index.module.css";
import {Link} from "react-router-dom";

class MemberList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            pageData:{
                total:0
            },
        }
        this.columns = [
            {
                title: '昵称',
                dataIndex: 'userName',
                align: 'center'
            },
            {
                title: '真实姓名',
                dataIndex: 'trueName',
                align: 'center'
            },
            {
                title: '参会身份',
                dataIndex: 'isHost',
                align: 'center'
            },
            {
                title: '会议时长',
                dataIndex: 'time',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'option',
                align: 'center'
            },
        ]
    }


    componentDidMount() {
    }

    render() {
        let {loading,data,pageData}=this.state;
        return (<>
            <Row className={styles.toolbar} justify='space-between'>
                <Col flex='40%'>

                </Col>
                <Col >
                    <Space size={10}>
                            <Button type="primary"  size="large" >
                                添加成员
                            </Button>
                        <Button type="primary"  size="large" >
                            导入数据
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Table bordered
                   rowKey='id'
                   dataSource={data}
                   columns={this.columns}
                   pagination={{position: ['none', 'bottomRight'],total:pageData.total,onChange:this.changPage}}
                   loading={loading}
            > </Table>
        </>)
    }
}

export default MemberList
