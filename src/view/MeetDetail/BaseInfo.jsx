import React, {Component} from "react";
import { Card, Form, Input, Button, DatePicker, Select, Radio,message } from 'antd';
import styles from '@/view/NewMeet/css/index.module.css'
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from '@/axios'
import Upload from '@/components/Upload'
import TimeSelect from "../../components/TimeSelect";
import {connect} from "react-redux";
const { RangePicker } = DatePicker;

const { Option } = Select;

class BaseInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hostList:[],
            hostKey:undefined,
            currentValue:'',
            initialValues:{
                isSecret:0,
                isPublic: 1,
                lockStatus: 0,
                roomSecret:'',
                timeRange:[]
            },
            id:0,
            proName:'',
            isSecret:false
        }
        this.getHost=this.getHost.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.getHostData=this.getHostData.bind(this)
        this.submitForm=this.submitForm.bind(this)
        this.getRoomData=this.getRoomData.bind(this)
        this.handleAppName=this.handleAppName.bind(this)
        this.handleSecret=this.handleSecret.bind(this)
        this.timeChange=this.timeChange.bind(this)
        this.uploadSuccess=this.uploadSuccess.bind(this)
        this.timeout=null
        this.form=React.createRef()
    }

    componentDidMount() {
        if(this.props.id){
            let id=Number(this.props.id);
            this.setState({
                id:id
            })

            this.getRoomData(id)
        }
    }

    //获取主持人
    getHost(value){
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

    //时间范围
    timeChange(timeRange){
        this.form.current.setFieldsValue({timeRange})
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
        let {info}=this.props
        if(info.roleID!=1){
            values.proID=info.proID
        }
        values={...values,proName:this.state.proName}
        axios.addMeetRoom(values).then(res=>{
            if(res.success){
                if(this.state.id!=0){
                    message.success('会议修改成功！')
                }else{
                    message.success('会议创建成功！')
                }
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
            this.form.current.setFieldsValue({...initialValues,...res.response})
            this.setState({
                proName:res.response.proName,
                isSecret:res.response.isSecret==1
            })
        })
    }

    handleAppName(e,option){
        this.setState({
            proName:option.data
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
    uploadSuccess(iamgePath){
        //上传图片成功
        this.form.current.setFieldsValue({iamgePath})
    }

    render() {
        let {hostList,initialValues}=this.state
        let {allProjects,info}=this.props
        return (
                <Form
                    name="basic"
                    ref={this.form}
                    className={'form'}
                    initialValues={initialValues}
                    onFinish={this.submitForm}
                >
                    <Form.Item
                        label="会议主题"
                        name="roomName"
                        rules={[{required: true, message: '请填写会议主题！'}]}
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Input autoComplete='off' placeholder='请输入会议主题'/>
                    </Form.Item>
                    {
                        info.roleID==1&&<Form.Item
                            label="会议机构"
                            name="proID"
                            className={'formItem'}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            rules={[{ required: true,message:'请选择会议机构！'  }]}
                        >
                            <Select placeholder="请选择所在机构" onChange={this.handleAppName}>
                                {
                                    allProjects.map((item)=>{
                                        return (
                                            <Option value={item.id} key={item.id} data={item.proName}>{item.proName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    }

                    <Form.Item
                        label="会议时间"
                        name="timeRange"
                        rules={[{required: true, message: '请选择会议时间！'}]}
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <TimeSelect onChange={this.timeChange} value={initialValues.timeRange}/>
                    </Form.Item>
                    <Form.Item  label="是否需要密码"
                                name="isSecret"
                                className={'formItem'}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                rules={[{ required: true  }]}
                                value={0}>
                        <Radio.Group onChange={this.handleSecret} >
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {this.state.isSecret&& <Form.Item
                        label="会议密码"
                        name="roomSecret"
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true,  message: '请输入会议密码！' },{
                            required: false,
                            pattern: new RegExp(/^\d{4,6}$/, "g"),
                            message: '请输入4到6位数字密码',
                        }]}
                    >
                        <Input placeholder='请输入4到6位数字密码' autoComplete='off'/>
                    </Form.Item>}
                    <Form.Item
                        label="是否公开"
                        name="isPublic"
                        className={'formItem'}
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
                        label="锁定状态"
                        name="lockStatus"
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Radio.Group onChange={this.onChange} >
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="最大参会人数"
                        name="maxCount"
                        className={'formItem'}
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
                        className={'formItem'}
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
                    <Form.Item
                        label="会议封面"
                        name="iamgePath"
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Upload uploadSuccess={this.uploadSuccess} uploadError={this.uploadError} aspect={1.65}/>
                    </Form.Item>
                    <Form.Item  className={'formBtn'}>
                        <Button type="primary" htmlType='submit'>确认修改</Button>
                    </Form.Item>
                </Form>
        )
    }
}
const mapStateToProps = (state) =>//将state转到props
{
    return {
        allProjects:state.set.allProjects,
        info:state.user.info
    };
};
export default connect(mapStateToProps)(BaseInfo)
