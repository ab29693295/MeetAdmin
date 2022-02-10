import React, {Component} from 'react';
import {Card,Row,Col,Avatar,Button,Table,Tabs ,List,Space } from "antd";
import EditUser from './EditUser'
import styles from './css/index.module.css'
import {getUserDetail,getALlRole,getPersonStatics,getLiveFootLog,getUserLoginLog} from '../../axios/user'
import api from '../../path/index'
import {timestampToTime} from '@/utils'
const { TabPane } = Tabs;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editModal:{
                visible:false
            },
            userId:this.props.match.params.id,
            userInfo:{},
            roleList:[],
            studyList:{dataCount:0,data:[]},
            useLoginList:{dataCount:0,data:[]}

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
        this.list1=[
            {
                title: '访问',
            },
            {
                title: ' 2021中国企业改革发展峰会暨成果发布会',
            },
            {
                title: '直播课程 3',
            },
            {
                title: '直播课程 4',
            },
        ]
        this.getData=this.getData.bind(this)
        this.getFoot=this.getFoot.bind(this)
        this.getLogin=this.getLogin.bind(this)

    }
    async componentDidMount() {
        getALlRole().then(res=>{
            if(res.success){
                this.setState({
                    roleList:res.response
                })
            }
        })
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
        let {data,editModal,userInfo,roleList,studyList,useLoginList}=this.state;
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
                                        {/*<p>用户年龄：23</p>*/}
                                        <p>来源方式：APP</p>
                                        <p>最近登录时间：{userInfo.lastModyDate}</p>
                                    </Col>
                                    <Col span={6} className={styles.basicInfoList}>
                                        <p>手机号码：{userInfo.phone}</p>
                                        {/*<p>用户职业：产品经理</p>*/}
                                        <p>角色：机构1管理员</p>
                                    </Col>
                                    <Col span={6} className={styles.basicInfoList}>
                                        <p>邮箱：{userInfo.email}</p>
                                        <p>备注：{userInfo.des}</p>

                                    </Col>
                                    <Col span={6 } className={styles.basicInfoList}>
                                        <p>用户性别：{userInfo.sex==0?'男':'女'}</p>
                                        <p>注册时间：{userInfo.createDate}</p>
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
                            <TabPane tab="会议足迹" key="1">
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
                                                    title={<p>{item.userInfo}</p>}
                                                    description={'累计参会'+item.duration}
                                                />
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="登录日志" key="2">
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
                <EditUser {...editModal} hideEditModal={this.setEditModal.bind(this,false)} submitEdit={()=>{this.getData()}} initialValues={userInfo} roleList={roleList}/>
            </>
        )
    }
}