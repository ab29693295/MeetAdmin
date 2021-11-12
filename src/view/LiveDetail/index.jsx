import React, {Component} from "react";
import {Card, Tabs} from "antd";
import { LeftOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
// import MemberList from './MemberList'
// import BaseInfo from './BaseInfo'
// import ChatList from './ChatList'
// import JoinLog from "./JoinLog";
// import OperateLog from "./OperateLog";
// import RecordVideo from "./RecordVideo";
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
                    <TabPane tab={<Link to={{pathname:'/live/liveList'}}><LeftOutlined />返回上一页</Link>} key="0">
                    </TabPane>
                    <TabPane tab="基本信息" key="1">
                        {/*<BaseInfo id={this.props.match.params.id}/>*/}
                    </TabPane>
                    <TabPane tab="成员列表" key="2">
                        {/*<MemberList id={this.props.match.params.id}/>*/}
                    </TabPane>
                    <TabPane tab="聊天数据" key="3">
                        {/*<ChatList id={this.props.match.params.id}/>*/}
                    </TabPane>
                    <TabPane tab="访问日志" key="4">
                        {/*<JoinLog id={this.props.match.params.id}/>*/}
                    </TabPane>
                    <TabPane tab="操作列表" key="5">
                        {/*<OperateLog id={this.props.match.params.id}/>*/}
                    </TabPane>
                    <TabPane tab="录制视频列表" key="6">
                        {/*<RecordVideo id={this.props.match.params.id}/>*/}
                    </TabPane>
                </Tabs>
            </Card>
        </>)
    }
}

export default name
