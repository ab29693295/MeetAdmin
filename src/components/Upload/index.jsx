import React, {Component} from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl:'',
            loading:false,
            fileList:[]
        };
    }
    beforeUpload(file){
        console.log(file)
        //验证格式
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        //验证大小
        if(file.size>10*1024){
            message.error('请上传不超过10MB大小的图片');
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
        const formData = new FormData();
        formData.append('file', options.file);
        formData.append('module','user');
        this.setState({
            loading:true
        })
        // uploadFile(formData).then(res=>{
        //     //图片回显
        //     this.$message.success('图片上传成功！');
        //     this.$emit('show-img',res.data.filePath)
        //     this.loading=false
        // })
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