import React, {Component} from "react";
import { Card, Form, Input, Button, DatePicker, Select, Radio,message } from 'antd';
import styles from './css/index.module.css'
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from '@/axios'
import Upload from '@/components/Upload'
const { RangePicker } = DatePicker;
const { Option } = Select;

class NewLive extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectList:[],
            hostList:[],
            hostKey:undefined,
            currentValue:'',
            initialValues:{
                isPublic: 1,
                lockStatus: 0,
                roomSecret:'',
                timeRange:[],
                isSecret: 0
            },
            id:0,
            appName:'',
            isSecret:false//控制会议显示隐藏
        }

        this.getProject=this.getProject.bind(this)
        this.getHost=this.getHost.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.getHostData=this.getHostData.bind(this)
        this.submitForm=this.submitForm.bind(this)
        this.getRoomData=this.getRoomData.bind(this)
        this.handleAppName=this.handleAppName.bind(this)
        this.handleSecret=this.handleSecret.bind(this)
        this.timeout=null
        this.form=React.createRef()
    }

    componentDidMount() {
        if(this.props.location.state){
            let id=this.props.location.state.id;
            this.setState({
                id:id
            })

            this.getRoomData(id)
        }
        this.getProject()
    }
    //获取岗位
    getProject(){
        //获取机构列表
        axios.selectProject({key:''}).then(res=>{
            this.setState({
                projectList:res.response
            })
        })
    }
    //获取主持人
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
    }
    //不能选择日期
    disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().subtract(1, 'day')
    }
    //不能选择时间
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

    //时间范围
    timeChange(dates,dateStrings){
        console.log(dates,dateStrings)

    }
    //提交数据
    submitForm(values){
        //提交数据
        if(values.timeRange){
            values.startTime=new Date(values.timeRange[0]._d).getTime().toString()
            values.endTime=new Date(values.timeRange[1]._d).getTime().toString()
        }
        delete  values.timeRange

        if(this.state.id!=0){
            values.id=this.state.id
        }
        if(!this.state.isSecret){
            values.roomSecret=''
        }
        values={...values,appName:this.state.appName}
        axios.addMeetRoom(values).then(res=>{
            if(res.success){
                if(this.state.id!=0){
                    message.success('直播修改成功！')
                }else{
                    message.success('直播创建成功！')
                }
                this.form.current.setFieldsValue({timeRange:[]})
                this.form.current.resetFields()
                this.props.history.push({
                    pathname: '/meet/meetList',
                })
            }
        })
    }
    //获取信息
    getRoomData(id){
        axios.getRoomDetail({rID:id}).then(res=>{
            this.getHostData()
            let startTime=moment(res.response.startTime,'YYYY-MM-DD HH:mm');
            let endTime=moment(res.response.endTime,'YYYY-MM-DD HH:mm');
            let {initialValues}=this.state;
            initialValues.timeRange=[startTime,endTime]
            // this.setState({
            //     initialValues:{...initialValues,...res.response}
            // })
            this.form.current.setFieldsValue({...initialValues,...res.response})

        })
    }

    handleAppName(e,option){
        this.setState({
            appName:option.data
        })
    }

    handleSecret(event){
        if(event.target.value==1){
            this.setState({
                isSecret:true
            })
        }else{
            this.setState({
                isSecret:false
            })
        }


    }


    render() {
        let {projectList,hostList,initialValues}=this.state
        return (
            <Card title="新建直播" bordered={false}>
                <Form
                    name="basic"
                    ref={this.form}
                    className={styles.form}
                    initialValues={initialValues}
                    onFinish={this.submitForm}
                >
                    <Form.Item
                        label="课程名称"
                        name="courseName"
                        rules={[{required: true, message: '请填写课程名称！'}]}
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeholder='请填写课程名称'/>
                    </Form.Item>

                    <Form.Item
                        label="课程机构"
                        name="appID"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true,message:'请选择课程机构！'  }]}
                    >
                        <Select placeholder="请选择所在机构" onChange={this.handleAppName}>
                            {
                                projectList.map((item)=>{
                                    return (
                                        <Option value={item.appID} key={item.id} data={item.appName}>{item.appName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="直播时间"
                        name="timeRange"
                        rules={[{required: true, message: '请选择直播时间！'}]}
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
                    <Form.Item  label="是否启用讨论"
                                name="isPublic"
                                className={styles.formItem}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                rules={[{ required: true  }]}
                                value={1}>
                        <Radio.Group onChange={this.handleSecret} >
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="是否启用鲜花掌声"
                        name="isPublic"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} value={1}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="是否显示成员"
                        name="isPublic"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} value={1}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="是否启用打赏"
                        name="isSecret"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} value={0}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
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
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="推流供应商"
                        name="lockStatus"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} >
                            <Radio value={1}>阿里云</Radio>
                            <Radio value={0}>百度云</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="原生或同传"
                        name="lockStatus"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} >
                            <Radio value={1}>原生</Radio>
                            <Radio value={0}>同传</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="推流或拉流"
                        name="lockStatus"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} >
                            <Radio value={1}>推流</Radio>
                            <Radio value={0}>拉流</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="背景图片"
                        name="imgagePath"
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}>
                        <Upload/>
                    </Form.Item>
                    <Form.Item
                        label="课程描述"
                        name="des"
                        rules={[{ message: '请填写课程描述！'}]}
                        className={styles.formItem}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input.TextArea autoComplete='off' placeholder='请填写课程描述'/>
                    </Form.Item>
                    <Form.Item  className={styles.formBtn}>
                        <Button type="primary" htmlType='submit'>新建直播</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default NewLive
