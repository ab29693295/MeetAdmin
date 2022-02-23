import React, {Component} from 'react';
import {Button, Card, Form, Input, Radio, Select} from "antd";
import MemberList from '@/view/ProjectDetail/MemberList.jsx'
import * as user from "../../redux/actions/user";
import {connect} from "react-redux";
class ProjectMemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card title="成员管理" className='content-card'>
                <MemberList id={this.props.user.info.proID}/>
            </Card>
        )
    }
}
const mapStateToProps = (state) =>//将state转到props
{
    return {
        user: state.user
    };
};

export default connect(//关联store和组件
    mapStateToProps
)(ProjectMemberList)