import React, {Component} from "react";
import {Card, Form, Input, Radio, Button, message} from "antd";
import * as user from "../../redux/actions/user";
import Upload from '@/components/Upload'
import {updateUserMessage,getUserDetail} from '@/axios/user'
import {connect} from "react-redux";
class userInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.uploadSuccess=this.uploadSuccess.bind(this)
        this.submitForm=this.submitForm.bind(this)
        this.getData=this.getData.bind(this)
        this.form=React.createRef()
    }

    componentDidMount() {

    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }
    submitForm(values){
        let {info}=this.props.user
        updateUserMessage({...values,id:info.id}).then(res=>{
            if(res.success){
                message.success('用户修改成功！')
                this.getData(info.id)

            }
        })
    }
    uploadSuccess(photo){
        //上传图片成功
        this.form.current.setFieldsValue({photo})
    }
    async getData(id){
        let {setUserInfo} =this.props
        let data= await getUserDetail({uID:id})
        if(data.success){
            setUserInfo(data.response)
        }
    }
    render() {
        let {info}=this.props.user
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Card title="个人信息"  className='content-card' >
                <Form
                    className={'form'}
                    {...formItemLayout}
                    initialValues={info}
                    ref={this.form}
                    onFinish={this.submitForm}>
                    <Form.Item label='真实姓名'  rules={[{required: true, message: '请输入真实姓名!'}]} name='trueName'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='性别' name="sex">
                        <Radio.Group  >
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="手机号码"
                        name="phone"
                        rules={[{ required: true, message: '手机号为必填信息',max:11 },{
                            required: false,
                            pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
                            message: '请输入正确的手机号',
                        }]}
                    >
                        <Input
                            type="text"
                            autoComplete='new-password'
                            maxLength={11}
                        />
                    </Form.Item>
                    <Form.Item
                        label="邮箱："
                        name="email"
                        rules={[{ required: true, message: '邮箱为必填信息' },{
                            type: 'email',
                            message: '请输入正确的邮箱',
                        },]}
                        className={'formItem'}
                    >
                        <Input autoComplete='off' placeholder='请输入邮箱' />
                    </Form.Item>
                    <Form.Item
                        label="头像"
                        name="photo"
                        className={'formItem'}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        rules={[{ required: true  }]}
                    >
                        <Upload uploadSuccess={this.uploadSuccess} uploadError={this.uploadError}/>
                    </Form.Item>
                    <Form.Item
                        label="地址："
                        name="address"
                    >
                        <Input.TextArea placeholder="请输入地址"/>
                    </Form.Item>
                    <Form.Item
                        label="备注："
                        name="des"
                    >
                        <Input.TextArea placeholder="请输入备注" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
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
        setUserInfo:(info)=>{
            dispatch(user.setUserInfo(info));
        }
    };
};
export default connect(//关联store和组件
    mapStateToProps,
    mapDispatchToProps
)(userInfo)

