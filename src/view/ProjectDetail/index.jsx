import React, {Component} from 'react';
import {Card, Tabs} from "antd";
import { LeftOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import BaseInfo from './BaseInfo'
import MemberList from './MemberList'
const {TabPane} = Tabs;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <Card className='content-card'>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<Link to={{pathname:'/project/projectList'}}><LeftOutlined />返回上一页</Link>} key="0">
                        </TabPane>
                        <TabPane tab="基本信息" key="1">
                            <BaseInfo id={this.props.match.params.id}/>
                        </TabPane>
                        <TabPane tab="成员管理" key="2">
                            <MemberList id={this.props.match.params.id}/>
                        </TabPane>
                        {/*<TabPane tab="分类管理" key="3">*/}
                            {/*<JoinLog id={this.props.match.params.id}/>*/}
                        {/*</TabPane>*/}
                        {/*<TabPane tab="权限管理" key="4">*/}
                        {/*    <ChatList id={this.props.match.params.id}/>*/}
                        {/*</TabPane>*/}
                        {/*<TabPane tab="数据统计" key="5">*/}
                            {/*<JoinLog id={this.props.match.params.id}/>*/}
                        {/*</TabPane>*/}

                        {/*<TabPane tab="日志管理" key="6">*/}
                            {/*<OperateLog id={this.props.match.params.id}/>*/}
                        {/*</TabPane>*/}
                    </Tabs>
                </Card></>
        )
    }
}