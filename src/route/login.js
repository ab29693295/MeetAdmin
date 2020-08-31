/*登录管理*/
import React, {Component} from "react";
import {Redirect, Route} from 'react-router-dom'

export default Comp => {
  return  class ConvertComp extends Component {
        constructor() {
            super();
            this.state = {
                login: false
            };
        }

        componentDidMount() {
            if (localStorage.getItem('userId')) {
                this.setState({
                    login: true
                })
            }
        }

        render() {

            if (localStorage.getItem('userId')) {
                return <Comp {...this.props} />;
            } else  {
                return <Redirect to='/login' from='/' />
            }
        }

    }
}
