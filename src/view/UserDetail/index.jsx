import React, {Component} from 'react';
import {Card,Row,Col,Avatar,Button,Table,Tabs ,List,Space } from "antd";
import EditUser from './EditUser'
import styles from './css/index.module.css'
import {
    getUserDetail,
    getPersonStatics,
    getLiveFootLog,
    getUserLoginLog,
    getTotalRoom} from '../../axios/user'
import api from '../../path/index'
import {timestampToTime} from '@/utils'
import {connect} from "react-redux";
import {formatDateTime,s_to_hs} from "../../common/js/tools";
const { TabPane } = Tabs;
class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editModal:{
                visible:false
            },
            userId:this.props.match.params.id,
            userInfo:{},
            studyList:{dataCount:0,data:[]},
            useLoginList:{dataCount:0,data:[]},
            totalRoomList:{dataCount:0,data:[]}

        };
        this.columns = [
            {
                title: '最近登录时间',
                dataIndex: 'lastLogTime',
                align:'center',
                render: text => <a>{text}</a>,
            },
            {
                title: '今日会议时长（小时）',
                dataIndex: 'tMeetDuration',
                align:'center',
            },
            {
                title: '累计会议时长（小时）',
                dataIndex: 'lMeetDuration',
                align:'center',
            },
            {
                title: '参与会议总数',
                dataIndex: 'totalMeet',
                align:'center',
            },
            {
                title: '创建会议总数',
                dataIndex: 'createTotalMeet',
                align:'center',
            },
        ]
        this.getData=this.getData.bind(this)
        this.getFoot=this.getFoot.bind(this)
        this.getLogin=this.getLogin.bind(this)
        this.getTotalRoom=this.getTotalRoom.bind(this)

    }
    async componentDidMount() {
        let {response}= await getUserDetail({uID:this.state.userId})
        this.setState({
            userInfo:response
        })
       getPersonStatics({userName:response.userName}).then(res=>{
           this.setState({
               data:[res.response]
           })
        })
        this.getFoot({userName:response.userName,page:1,pageSize:5})
        this.getLogin({userName:response.userName,page:1,pageSize:5})
        this.getTotalRoom({userName:response.userName,page:1,pageSize:5})
    }
    getFoot(params){
        //学习足迹
        getLiveFootLog(params).then(res=>{
            if(res.success&&res.response!=null){
                this.setState({
                    studyList:res.response
                })
            }
        })
    }
    getLogin(params){
        //登录日志
        getUserLoginLog(params).then(res=>{
            if(res.success&&res.response!=null){
                this.setState({
                    useLoginList:res.response
                })
            }
        })
    }
    getTotalRoom(params){
        getTotalRoom(params).then(res=>{
            if(res.success&&res.response!=null){
                this.setState({
                    totalRoomList:res.response
                })
            }
        })
    }
    setEditModal(flag){
        this.setState({
            editModal:{...this.state.editModal,visible:flag}
        })
    }
    getData(){
        getUserDetail({uID:this.state.userId}).then(res=>{
            if(res.success){
                this.setState({
                    userInfo:res.response
                })
            }
        })
    }

    render() {
        let {data,editModal,userInfo,studyList,useLoginList,totalRoomList}=this.state;
        let {allRoles}=this.props
        return (
            <>
                <Card title="用户详情" className='content-card'>
                    <div className={`${styles.infoWrap} section`}>
                        <h3 className={styles.title}>基础资料</h3>
                        <Row>
                            <Col span={4}>
                                <div className={styles.headImg}>
                                    <Avatar size={64} src={api.tuDomain+userInfo.photo}/>
                                </div>
                                <Button type="primary" onClick={this.setEditModal.bind(this,true)} data-flag={true}>编辑资料</Button>
                            </Col>
                            <Col span={20} >
                                <Row gutter={24}>
                                    <Col span={6} className={styles.basicInfoList}>
                                        <p>用户姓名：{userInfo.trueName}</p>
                                        <p>角色：{
                                            allRoles.map((item)=>{
                                                if(item.id==userInfo.roleID){
                                                    return item.name
                                                }
                                            })
                                        }</p>
                                    </Col>
                                    <Col span={6} className={styles.basicInfoList}>
                                        <p>手机号码：{userInfo.phone}</p>
                                        <p>备注：{userInfo.des}</p>
                                    </Col>
                                    <Col span={6} className={styles.basicInfoList}>
                                        <p>邮箱：{userInfo.email}</p>
                                        <p>注册时间：{formatDateTime(new Date(userInfo.createDate))}</p>
                                    </Col>
                                    <Col span={6 } className={styles.basicInfoList}>
                                        <p>用户性别：{userInfo.sex==0?'男':'女'}</p>
                                        <p>地址：{userInfo.address}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className={`${styles.infoWrap} section`}>
                        <h3 className={styles.title}>学习统计</h3>
                        <Table columns={this.columns} dataSource={data} rowKey='lMeetDuration' pagination={false}/>
                    </div>
                    <div className={`${styles.infoWrap} section`}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="访问足迹" key="1">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={studyList.data}
                                    pagination={{
                                        onChange: page => {
                                            this.getFoot({userName:userInfo.userName,page:page,pageSize:5})
                                        },
                                        pageSize: 5,
                                        total: studyList.dataCount,
                                    }}
                                    renderItem={item => (
                                        <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar shape="square" size={64} />}
                                                    title={<p>{item.roomName}</p>}
                                                    description={'参会时长'+s_to_hs(item.totalSecond)}
                                                />
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="我的会议" key="2">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={totalRoomList.data}
                                    pagination={{
                                        onChange: page => {
                                            this.getTotalRoom({userName:userInfo.userName,page:page,pageSize:5})
                                        },
                                        pageSize: 5,
                                        total: totalRoomList.dataCount,
                                    }}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<p>{item.roomName}</p>}
                                                description={<Space><span>{'开始时间：'+formatDateTime(item.startTime)}</span><span>{"结束时间："+formatDateTime(item.endTime)}</span></Space>}
                                            />
                                            {/*<div>操作成功</div>*/}
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="登录日志" key="3">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={useLoginList.data}
                                    pagination={{
                                        onChange: page => {
                                            this.getLogin({userName:userInfo.userName,page:page,pageSize:5})
                                        },
                                        pageSize: 5,
                                        total: useLoginList.dataCount,
                                    }}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<p>{timestampToTime(item.createDate)}</p>}
                                                description={<Space><span>{'位置：'+item.country+item.city}</span><span>{"IP："+item.ip}</span></Space>}
                                            />
                                            <div>操作成功</div>
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
                <EditUser {...editModal} hideEditModal={this.setEditModal.bind(this,false)} submitEdit={()=>{this.getData()}} initialValues={userInfo}/>
            </>
        )
    }
}
const mapStateToProps = (state) =>//将state转到props
{
    return {
        allRoles:state.set.allRoles
    };
};

export default connect(//关联store和组件
    mapStateToProps
)(UserDetail)