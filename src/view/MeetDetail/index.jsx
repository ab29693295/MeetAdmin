import React, {Component} from "react";
import {Card, Tabs} from "antd";
import { LeftOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import MemberList from './MemberList'
const {TabPane} = Tabs;

class name extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (<>
            <Card>
                <Tabs defaultActiveKey="2">
                    <TabPane tab={<Link to={{pathname:'/meet/meetList'}}><LeftOutlined />返回上一页</Link>} key="1">
                    </TabPane>
                    <TabPane tab="成员列表" key="2">
                        <MemberList/>
                    </TabPane>
                    <TabPane tab="统计数据" key="3">
                        当前会议统计数据
                    </TabPane>
                </Tabs>
            </Card>
        </>)
    }
}

export default name
