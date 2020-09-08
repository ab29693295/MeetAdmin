import React, {Component} from "react";
import {Button, Card,List, Avatar} from 'antd';
class name extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
                {
                    title: '消息1',
                    description:'123'
                },
                {
                    title: '消息2',
                    description:'234'
                },
                {
                    title: 'Ant Design Title 3',
                },
                {
                    title: 'Ant Design Title 4',
                },
            ]

         }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Card title="系统消息">
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a>{item.title}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        )
    }
}

export default name
