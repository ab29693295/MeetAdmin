import React, {Component} from "react";
import {Empty, Card,Button} from 'antd';
class Error extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <Card title="无权限" className='content-card'>
                <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                       imageStyle={{
                           height: 120,
                       }}
                       description={
                           <Button type='primary' href='/'>返回首页</Button>
                       }/>
            </Card>
        )
    }
}

export default Error
