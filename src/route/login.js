    /*登录管理*/
    import React, { Component } from "react";
    import { Redirect,Route } from 'react-router-dom'

         class ConvertComp extends Component {
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
                 console.log(this.props)
                 console.log(localStorage.getItem('userId'))
                 return (
                     <Route
                         render={props =>
                             this.state.login ? (
                                 <Component {...props} />
                             ) : (
                                 <Redirect
                                     to='/login'
                                 />
                             )
                         }
                     />
                 )
             }

         }
