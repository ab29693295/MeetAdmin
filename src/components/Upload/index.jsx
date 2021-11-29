import React, {Component} from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from '../../axios/liveApi'
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl:'',
            loading:false,
            fileList:[]
        };
        this.beforeUpload=this.beforeUpload.bind(this)
        this.customRequest=this.customRequest.bind(this)
    }
    beforeUpload(file){
        //验证格式
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        //验证大小
        if(file.size>100*1024){
            message.error('请上传不超过100MB大小的图片');
            return false
        }else if(!isJpgOrPng){
            message.error('需要上传jpg格式或者jpeg格式或者png格式!');
            return false
        }else{
            this.setState({
                fileList:[this.state.fileList,file]
            })
        }
    }
    customRequest(options){

        // let reader = new FileReader();
        // reader.readAsBinaryString( options.file)
        // reader.onload=function(e){
        //     console.log(e)
        //     axios.uploadFile(e.target.result).then(res=>{
        //         //图片回显
        //         message.success('图片上传成功！');
        //         this.loading=false
        //         // this.props.uploadSuccess(res.data.filePath)
        //     }).then(error=>{
        //         message.success('图片上传失败！');
        //         this.props.uploadError()
        //     })
        // }
        const formData = new FormData();
        formData.append('file', options.file);
        // formData.append('module','live');
        this.setState({
            loading:true
        })
        axios.uploadFile(formData).then(res=>{
            //图片回显
            message.success('图片上传成功！');
            this.loading=false
            // this.props.uploadSuccess(res.data.filePath)
        }).then(error=>{
             message.success('图片上传失败！');
            this.props.uploadError()
        })
    }
    render() {
        let {imageUrl,loading}=this.state
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        );
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                customRequest={this.customRequest}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        )
    }
}