import React, {Component} from "react";
import {Button, Card} from 'antd';
class Error extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <Card title="error"  >
        访问的页面不存在</Card>
        )
    }
}

export default Error
