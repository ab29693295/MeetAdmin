import React, {PureComponent} from "react";
import {Card,Row,Col,Avatar,Statistic} from "antd";
import {
    SoundOutlined,
    ClockCircleOutlined,
    InfoCircleOutlined,
    PushpinOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';
import BarChart from '@/components/Charts/BarChart'
import {
    getTimeRoomCount,
    getMeetHomeDetail,
    getTimeVisitCount} from '@/axios/tj'
import * as user from "../../redux/actions/user";
import {connect} from "react-redux";

class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            barChartData:{
                title:{
                    left: 'center',
                    padding: 0,
                    text:'会议数量图'
                },
                xAxisData:[],
                series:[
                    {
                    name: "发起会议数量",
                    itemStyle: {
                        normal: {
                            color: "#FF005A",
                            lineStyle: {
                                color: "#FF005A",
                                width: 2,
                            },
                        },
                    },
                    smooth: true,
                    type: "bar",
                    data: [],
                    animationDuration: 2800,
                    animationEasing: "cubicInOut",
                },{
                    name: "参与会议数量",
                    itemStyle: {
                        normal: {
                            color: "#3888fa",
                            lineStyle: {
                                color: "#3888fa",
                                width: 2,
                            },
                        },
                    },
                    smooth: true,
                    type: "bar",
                    data: [],
                    animationDuration: 2800,
                    animationEasing: "cubicInOut",
                }],
                legend: {
                    left:'left',
                    data: ['发起会议数量', '参与会议数量']
                },
            },
            homeData:[
                {
                    title:'会议总数量',
                    icon:<SoundOutlined />,
                    backgroundColor:'#40c9c6',
                    value:0,
                    des:'本月新增',
                    upNum:0,
                    id:1
                },
                {
                    title:'机构总数量',
                    icon:<PushpinOutlined />,
                    backgroundColor:'#36a3f7',
                    value:0,
                    des:'本月新增',
                    upNum:0,
                    id:2
                },
                {
                    title:'访问总数量',
                    icon:<ClockCircleOutlined />,
                    backgroundColor:'#f4516c',
                    value:0,
                    des:'本月新增',
                    upNum:0,
                    id:3
                },
                {
                    title:'用户总数量',
                    icon:<InfoCircleOutlined />,
                    backgroundColor:'#f6ab40',
                    value:0,
                    des:'本月新增',
                    upNum:0,
                    id:4
                }
            ]
        }
    }

    componentDidMount() {
        let {info}=this.props.user
        let {homeData} =this.state
        getTimeRoomCount().then(res=>{
            if(res.success){
                let {series}=this.state.barChartData
                series[0].data=res.response.ownCountArry;
                series[0].data=res.response.countArry;
                this.setState({
                    barChartData:{...this.state.barChartData,series},
                    xAxisData:res.response.timeArry
                })
            }
        })
        getMeetHomeDetail().then(res=>{
            if(res.success){
                let response=res.response
                let data=  homeData.map((item,index)=>{
                    switch (item.id) {
                        case 1:
                            item.value=response.meetCount
                            item.upNum=response.meetMonthCount
                            break

                        case 2:
                            item.value=response.orgCount
                            item.upNum=response.orgMonthCount
                            break
                        case 3:
                            item.value=response.visitCount
                            item.upNum=response.visitMonthCount
                            break
                        case 4:
                            item.value=response.userCount
                            item.upNum=response.userMonthCount
                            break
                    }
                    return item
                })
                this.setState({
                    homeData:data
                })

            }
        })
        getTimeVisitCount().then(res=>{

        })
    }


    render() {
        let {homeData,barChartData}=this.state
        return (
            <Card title="首页"  >
                <Row gutter={40} align='middle'>
                    {
                        homeData.map((item,index)=>{
                            return (
                                <Col span={6} key={index}>
                                    <Card  hoverable>
                                        <Card.Meta
                                            avatar={
                                                <Avatar icon={item.icon} style={{ backgroundColor:item.backgroundColor }} size={80}/>
                                            }
                                            title={<Statistic title={item.title} value={item.value} precision={0} />}
                                            description={<Statistic
                                                title={item.des}
                                                value={item.upNum}
                                                precision={0}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<ArrowUpOutlined />}
                                                suffix=""
                                            />}
                                            style={{display:'flex',
                                                justifyContent:'space-between',alignItems:'center'}}
                                        />
                                    </Card>
                                </Col>
                            )
                        })
                    }

                </Row>
                <BarChart  chartData={barChartData} styles={{
                    padding: 12,
                    backgroundColor: "#fff",
                    margin: "30px 0",
                }}/>
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
const mapDispatchToProps = (dispatch) => {
    return {
        setToken:(token)=>{
            dispatch(user.setToken(token));
        },
        setUserInfo:(info)=>{
            dispatch(user.setUserInfo(info));
        },
        clearToken:()=>{
            dispatch(user.clearToken());
        }
    };
};
export default connect(//关联store和组件
    mapStateToProps,
    mapDispatchToProps
)(Home)
