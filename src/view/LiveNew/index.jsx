import React, {Component} from "react";
import { Card, Form, Input, Button, DatePicker, Select, Radio,message } from 'antd';
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from '@/axios/liveApi'
import Upload from '@/components/Upload'
const { RangePicker } = DatePicker;
const { Option } = Select;

class NewLive extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectList:[],
            currentValue:'',
            initialValues:{
                isPublic: 1,
                timeRange:[],
                meetingCode: '',
                des:'',
                imagePath:''
            },
            id:0,
            appName:'',
            isPublic:0,//控制会议密钥显示隐藏
            imagePath:''
        }

        this.getProject=this.getProject.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.publicStatusChange=this.publicStatusChange.bind(this)
        this.submitForm=this.submitForm.bind(this)
        this.handleAppName=this.handleAppName.bind(this)
        this.uploadSuccess=this.uploadSuccess.bind(this)
        this.form=React.createRef()
    }

    componentDidMount() {
        console.log(this.props)
        if(this.props.id){
            let id=Number(this.props.id);
            this.setState({
                id:id
            })

        }
        this.getProject()
    }

    getProject(){
        //获取机构列表
        axios.getProjectList().then(res=>{
            this.setState({
                projectList:res.response
            })
        })
    }

    publicStatusChange(e){
        //修改公开状态
        this.setState({
            isPublic:e.target.value
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


    handleAppName(e,option){
        this.setState({
            appName:option.data
        })
    }

    uploadSuccess(imagePath){
        //上传图片成功
        this.setState({
            imagePath
        })
    }

    submitForm(values){
        //提交数据
        if(values.timeRange){
            values.startDate=new Date(values.timeRange[0]._d).getTime().toString()
            values.endDate=new Date(values.timeRange[1]._d).getTime().toString()
        }
        delete  values.timeRange
        if(this.state.id!=0){
            values.id=this.state.id
        }
        if(this.state.imagePath!=''){
            values.imagePath=this.state.imagePath
        }
        values={...values,appName:this.state.appName}
        axios.addOrUpdateLiveCourse(values).then(res=>{
            if(res.success){
                if(this.state.id!=0){
                    message.success('直播修改成功！')
                }else{
                    message.success('直播创建成功！')
                }
                this.form.current.setFieldsValue({timeRange:[]})
                this.form.current.resetFields()
                this.props.history.push({
                    pathname: '/live/liveList',
                })
            }
        })
    }

    render() {
        let {projectList,isPublic,initialValues}=this.state
        return (
            <Card title="新建直播" bordered={false} >
                <Form
                    name="basic"
                    ref={this.form}
                    className={'form'}
                    initialValues={initialValues}
                    onFinish={this.submitForm}
                >
                    <Form.Item
                        label="课程名称"
                        name="courseName"
                        rules={[{required: true, message: '请填写课程名称！'}]}
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeholder='请填写课程名称'/>
                    </Form.Item>

                    <Form.Item
                        label="课程机构"
                        name="appiD"
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true,message:'请选择课程机构！'  }]}
                    >
                        <Select placeholder="请选择所在机构" onChange={this.handleAppName}>
                            {
                                projectList.map((item)=>{
                                    return (
                                        <Option value={item.id} key={item.id} data={item.appName}>{item.appName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="直播时间"
                        name="timeRange"
                        rules={[{required: true, message: '请选择直播时间！'}]}
                        className={'formItem'}
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
                        label="是否公开"
                        name="isPublic"
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.publicStatusChange} value={1}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                            <Radio value={2}>秘钥</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        isPublic == 2 &&<Form.Item
                            label="秘钥"
                            name="meetingCode"
                            className={'formItem'}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true  }]}
                        >
                            <Input autoComplete='off' placeholder='请填写课程秘钥'/>
                        </Form.Item>
                    }

                    <Form.Item
                        label="背景图片"
                        name="imagePath"
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Upload uploadSuccess={this.uploadSuccess} uploadError={this.uploadError}/>
                    </Form.Item>
                    <Form.Item
                        label="课程描述"
                        name="des"
                        rules={[{ message: '请填写课程描述！'}]}
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input.TextArea autoComplete='off' placeholder='请填写课程描述'/>
                    </Form.Item>
                    <Form.Item  className={'formBtn'}>
                        <Button type="primary" htmlType='submit'>新建直播</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default NewLive
