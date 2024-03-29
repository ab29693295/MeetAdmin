import React, {Component} from "react";
import { Layout } from 'antd'
import Header from './Header'
import Sider from './Sider'
import Content from './Content'
import styles from './css/index.module.css'
class LayoutComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        // console.log(this.props)
    }
    render() {
        return (
            <Layout className={styles.layout}>
                <Sider/>
            <Layout className={styles.sitLayout}>
                <Header />
                <Content/>
            </Layout>
        </Layout>
        )
    }
}

export default LayoutComponent
