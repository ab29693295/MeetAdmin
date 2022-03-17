import React, {Component} from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import axios from '@/axios/upload'
import api from '@/path/index'
export default class UploadImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl:this.props.value||'',
            loading:false,
            fileList:[]
        };
        this.beforeUpload=this.beforeUpload.bind(this)
        this.customRequest=this.customRequest.bind(this)

    }
    componentDidMount() {
    }
    static getDerivedStateFromProps(props, state){
        if(props.value!=''&&props.value!=state.value){
            return {
                imageUrl:props.value
            }

        }
        return null
    }

    beforeUpload(file){
        //验证格式
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        //验证大小
        if(file.size/1024/1024>100){
            message.error('请上传不超过100MB大小的图片');
            return false
        }else if(!isJpgOrPng){
            message.error('需要上传jpg格式或者jpeg格式或者png格式!');
            return false
        }else{
            this.setState({
                fileList:[this.state.fileList,file]
            })
            return true
        }
    }
    customRequest(options){
        const formData = new FormData();
        formData.append('file', options.file);
        // formData.append('module','live');
        this.setState({
            loading:true
        })
        axios.uploadFile(formData).then(res=>{
            //图片回显
            if(res.success){
                message.success('图片上传成功！');
                this.setState({
                    loading:false,
                    imageUrl:res.response
                })
                this.props.uploadSuccess(res.response)
            }else{
                message.success('图片上传失败！');
                this.props.uploadError&&this.props.uploadError()
            }

        })
    }
    render() {
        let {imageUrl,loading}=this.state
        let {aspect}=this.props
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        );
        return (
            <ImgCrop aspect={aspect} rotate>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    customRequest={this.customRequest}
                >
                    {imageUrl ? <img src={api.tuDomain+imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </ImgCrop>

        )
    }
}
UploadImg.defaultProps ={
    aspect:1
}