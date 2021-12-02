/*登录管理*/
import React, {Component} from "react";
import {Redirect} from 'react-router-dom'
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
            if (getStorage('token')) {
                this.setState({
                    login: true
                })
            }
        }

        render() {
            if (getStorage('token')) {
                return <Comp {...this.props}   />;
            } else  {
                return <Redirect to={{
                    pathname:'/login',
                    // search: "?returnUrl="+this.props.location.pathname,
                    // state: this.props.location.pathname,
                }} from='/' />
            }
        }

    }
}
