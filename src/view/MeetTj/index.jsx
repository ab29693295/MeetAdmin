import React, {Component} from "react";
import {Card,Row,Col,Form,Button,DatePicker,Select,Space} from "antd";
import BarChart from '@/components/Charts/BarChart'
const { RangePicker } = DatePicker;
class name extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <Card title="会议统计"  >
                    <Row justify=''>
                        <Col>
                            <Form
                                layout='inline'>
                                <Form.Item name="price" label="" >
                                    <RangePicker />
                                </Form.Item>
                                <Form.Item name="price" label="" >
                                    <Select placeholder="" defaultValue={0} style={{width:'200px'}}>
                                        <Select.Option value={0}>全部机构</Select.Option>
                                        <Select.Option value={1}>U.S.A</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Space>
                                        <Button type="primary" htmlType="submit">
                                            确定
                                        </Button>
                                        <Button htmlType="button" >
                                            重置
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                {/*<BarChart/>*/}

            </Card>
        )
    }
}

export default name
