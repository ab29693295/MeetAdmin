import React, {Component} from "react";
import { Card, Form, Input, Button, Checkbox, DatePicker, Select, Radio } from 'antd';
import styles from './css/index.module.css'
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;
const { Option } = Select;

class NewMeet extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

     disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().subtract(1, 'day')
    }
     disabledRangeTime(date) {

         let hours = moment().hours();//0~23
         let minutes = moment().minutes();//0~59
         if (date && moment(date).date() === moment().date() ) {
             return {
                 disabledHours: () => range(0,hours),
                 disabledMinutes: () => {
                     if(hours== moment(date).hours()){
                         return range(0,minutes)
                     }else{
                         return []
                     }
                 }
             };
         }

         function range(start, end) {
             const result = [];
             for (let i = start; i < end; i++) {
                 result.push(i);
             }
             return result;
         }
    }

    timeChange(dates,dateStrings){
        console.log(dates,dateStrings)

    }
    render() {

        return (
            <Card title="会议预定" bordered={false}>

                <Form
                    name="basic"
                    className={styles.form}
                    size='large'
                    initialValues={{
                        isPublic: 1,
                        isLock: 1,
                        rate: 3.5,
                    }}
                >
                    <Form.Item
                        label="会议主题"
                        name="username"
                        rules={[{required: true, message: '请填写会议名称！'}]}
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeholder='请输入会议主题'/>
                    </Form.Item>
                    <Form.Item
                        label="会议机构"
                        name="appID"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true,message:'请选择会议机构！'  }]}
                    >
                        <Select placeholder="请选择所在机构">
                            <Option value={1}>China</Option>
                            <Option value={2}>U.S.A</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="会议时间"
                        name="timeRange"
                        rules={[{required: true, message: '请选择会议时间！'}]}
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            locale={locale}
                            disabledDate={this.disabledDate}
                            disabledTime={this.disabledRangeTime}
                            onChange={this.timeChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="会议密码（选填）"
                        name="code"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                     >
                        <Input placeholder='请输入4到6位数字密码'/>
                    </Form.Item>
                    <Form.Item
                        label="是否公开"
                        name="isPublic"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} value={1}>
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="锁定状态"
                        name="isLock"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} value={1}>
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="最大参会人数"
                        name="maxNum"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Select placeholder="请选择参会人数">
                            <Option value={10}>10</Option>
                            <Option value={20}>20</Option>
                            <Option value={30}>30</Option>
                            <Option value={40}>40</Option>
                            <Option value={50}>50</Option>
                            <Option value={60}>60</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="会议主持人"
                        name="host"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Select placeholder="请选择主持人">
                            <Option value={1}>China</Option>
                            <Option value={2}>U.S.A</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item  className={styles.formBtn}>
                        <Button type="primary" htmlType='submit'>预定会议</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default NewMeet
