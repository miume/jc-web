


import {withRouter} from "react-router-dom";
import React from 'react'


class Auth extends React.Component {

    componentDidMount() {
        let auth = localStorage.getItem("Authorization");
        let menus = localStorage.getItem("menuList");
        if(auth && menus){ 
            console.log('is authed')
            console.log(this.props)
            this.props.history.push({pathname : '/home'})
        }else {
            localStorage.clear();
            localStorage.setItem("remote", "http://218.77.105.241:40080");
            this.props.history.push({pathname: '/'})
        }
    }
    render() {
        return (null)
    }
}


export default withRouter(Auth)