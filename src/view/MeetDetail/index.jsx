import React, {Component} from "react";
import {Card, Tabs} from "antd";
import { LeftOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import MemberList from './MemberList'
import BaseInfo from './BaseInfo'
const {TabPane} = Tabs;

class name extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {
        return (<>
            <Card>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<Link to={{pathname:'/meet/meetList'}}><LeftOutlined />返回上一页</Link>} key="0">
                    </TabPane>
                    <TabPane tab="基本信息" key="1">
                        <BaseInfo id={this.props.match.params.id}/>
                    </TabPane>
                    <TabPane tab="成员列表" key="2">
                        <MemberList id={this.props.match.params.id}/>
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
