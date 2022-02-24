import React, {Component} from 'react';
import {Card} from "antd";
import BaseInfo from '@/view/ProjectDetail/BaseInfo.jsx'
import {connect} from "react-redux";
class ProjectMemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card title="机构详情" className='content-card'>
                <BaseInfo id={this.props.user.info.proID}/>
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