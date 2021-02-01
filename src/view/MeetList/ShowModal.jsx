import React, {Component} from "react";
import {Button, message, Modal} from "antd";
import styles from './css/index.module.css'
import api from "@/path/index";
import copy from 'copy-to-clipboard';
class ShowModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            path:api.meetDomain
        }
        this.handleCancel=this.handleCancel.bind(this)
        this.copyText=this.copyText.bind(this)
    }

    componentDidMount() {

    }
    handleCancel(){
        let {showCallback}=this.props;
        showCallback()
    }
    copyText() {
        let {path}=this.state;
        let {id}=this.props
        copy(path+'/'+id)
        message.success({
            content: '复制成功！'
        });
        this.handleCancel()
    }
    render() {
        let {visible,id}=this.props
        return (<>
            <Modal title="查看" visible={visible} footer={null} onCancel={this.handleCancel} >
                <div className={styles.showModal}>
                    <p className={styles.showText}>会议链接：{this.state.path}/{id}</p>
                    <Button type="primary" onClick={this.copyText}>一键复制</Button>
                </div>

            </Modal>
        </>)
    }
}

export default ShowModal
