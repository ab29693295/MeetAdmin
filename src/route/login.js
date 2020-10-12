/*登录管理*/
import React, {Component} from "react";
import {Redirect, Route} from 'react-router-dom'
import {getStorage} from '../common/js/tools'
export default Comp => {
  return  class ConvertComp extends Component {
        constructor() {
            super();
            this.state = {
                login: false
            };
        }

        componentDidMount() {
            if (getStorage('isLogin')) {
                this.setState({
                    login: true
                })
            }
        }

        render() {

            if (getStorage('isLogin')) {
                return <Comp {...this.props} />;
            } else  {
                return <Redirect to='/login' from='/' />
            }
        }

    }
}
