import React, {PureComponent} from "react";
import {Card,Row,Col,Avatar} from "antd";
import {
    SoundOutlined,
    ClockCircleOutlined,
    InfoCircleOutlined,
    PushpinOutlined
} from '@ant-design/icons';
import LineChart from '@/components/Charts/LineChart.jsx'
class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            lineChartData:{
                title:{
                    left: 'center',
                    padding: 0,
                    text:'会议数量图表'
                },
                xAxisData:["2021-1-1", "2021-1-2", "2021-1-3", "2021-1-4", "2021-1-5", "2021-1-6", "2021-1-7"],
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
                    type: "line",
                    data: [1,2,3,4,5,6],
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
                    type: "line",
                    data: [1,10,3,6,5,9],
                    animationDuration: 2800,
                    animationEasing: "cubicInOut",
                }],
                legend: {
                    left:'left',
                    data: ['发起会议数量', '参与会议数量']
                },
            }
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Card title="首页"  >
                <Row gutter={40} align='middle'>
                    <Col span={6} >
                        <Card  hoverable>
                            <Card.Meta
                                avatar={
                                    <Avatar icon={<SoundOutlined />} style={{ backgroundColor: '#40c9c6' }} size={64}/>
                                }
                                title="我发起的会议"
                                description="500个"
                                style={{display:'flex',justifyContent:'space-between'}}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card  hoverable>
                            <Card.Meta
                                avatar={
                                    <Avatar icon={<PushpinOutlined />} style={{ backgroundColor: '#36a3f7' }} size={64}/>
                                }
                                title="我参与的会议"
                                description="500个"
                                style={{display:'flex',justifyContent:'space-between'}}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card  hoverable>
                            <Card.Meta
                                avatar={
                                    <Avatar icon={<ClockCircleOutlined />} style={{ backgroundColor: '#f4516c' }} size={64}/>
                                }
                                title="参会总时长"
                                description="100小时"
                                style={{display:'flex',justifyContent:'space-between'}}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card  hoverable>
                            <Card.Meta
                                avatar={
                                    <Avatar icon={<InfoCircleOutlined />} style={{ backgroundColor: '#f6ab40' }} size={64}/>
                                }
                                title="我的消息"
                                description="This is the description"
                                style={{display:'flex',justifyContent:'space-between'}}
                            />
                        </Card>
                    </Col>

                </Row>
                <LineChart  chartData={this.state.lineChartData} styles={{
                    padding: 12,
                    backgroundColor: "#fff",
                    margin: "30px 0",
                }}/>
            </Card>
        )
    }
}

export default Home
