import React, {Component} from "react";
import { Card, Form, Input, Button, DatePicker, Select, Radio,message } from 'antd';
import styles from './css/index.module.css'
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from '@/axios'
const { RangePicker } = DatePicker;
const { Option } = Select;

class NewMeet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectList:[],
            hostList:[],
            hostKey:undefined,
            currentValue:''
        }
        this.getProject=this.getProject.bind(this)
        this.getHost=this.getHost.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.getHostData=this.getHostData.bind(this)
        this.submitForm=this.submitForm.bind(this)
        this.timeout=null
        this.form=React.createRef()
    }

    componentDidMount() {
        this.getProject()
    }
    getProject(){
        //获取机构列表
        axios.selectProject({key:''}).then(res=>{
           this.setState({
               projectList:res.response
           })
        })
    }

    getHost(value){
        console.log(value)
        //获取主持人列表
        if(value){
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.setState({
                currentValue:value
            })
            this.timeout = setTimeout(this.getHostData, 300);
        }else{
            this.setState({
                hostKey:''
            })
            this.setState({ hostList: [] });
        }
    }
    getHostData(){
        axios.selectUserList({key:this.state.currentValue}).then(res=>{
            this.setState({
                hostList:res.response
            })
            if(res.response.length==0){
                this.setState({
                    hostKey:''
                })
            }
        })
    }
    handleChange (hostKey){
        this.setState({ hostKey });
    };
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
    submitForm(values){

         //提交数据
        values.startTime=new Date(values.timeRange[0]._d).getTime().toString()
        values.endTime=new Date(values.timeRange[1]._d).getTime().toString()
        delete  values.timeRange
        console.log(values)
        axios.addMeetRoom(values).then(res=>{
            console.log(res)
            if(res.success){
                message.success('会议创建成功！')
                this.form.current.resetFields()

            }
        })
    }
    render() {
        let {projectList,hostList}=this.state
        return (
            <Card title="会议预定" bordered={false}>
                <Form
                    name="basic"
                    ref={this.form}
                    className={styles.form}
                    initialValues={{
                        isPublic: 1,
                        lockStatus: 2,
                        roomSecret:''
                    }}
                    onFinish={this.submitForm}
                >
                    <Form.Item
                        label="会议主题"
                        name="roomName"
                        rules={[{required: true, message: '请填写会议主题！'}]}
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
                            {
                                projectList.map((item)=>{
                                    return (
                                        <Option value={item.appID} key={item.appID}>{item.appName}</Option>
                                    )
                                })
                            }
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
                        name="roomSecret"
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
                        name="lockStatus"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} >
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="最大参会人数"
                        name="maxCount"
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
                        name="hostID"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}

                    >
                        <Select
                            showSearch
                            placeholder="请填写主持人筛选"
                            defaultActiveFirstOption={false}
                            onSearch={this.getHost}
                            onChange={this.handleChange}
                            showArrow={false}
                            filterOption={false}
                            loading={true}
                            value={this.state.hostKey}
                            notFoundContent={null}>
                            {
                                hostList.map(item=>{
                                    return <Option value={item.id} key={item.id}>{item.userName}</Option>
                                })
                            }
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
