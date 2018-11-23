import {withRouter} from "react-router-dom";
import React from 'react'


class Auth extends React.Component {

    componentDidMount() {
        let auth = localStorage.getItem("Authorization");
        let menus = localStorage.getItem("menuList");
        /**如果localStorage非空，则跳回主页面 */
        if(auth && menus){ 
            // console.log('is authed')
            // console.log(this.props)
            this.props.history.push({pathname : '/home'})
        /**如果localStorage为空，则跳回登陆页 */
        }else {
            let quickAccess = localStorage.getItem('quickAccess');
            let remote = localStorage.getItem('remote');
            localStorage.clear();
            localStorage.setItem("remote", remote);
            localStorage.setItem("quickAccess", quickAccess);
            this.props.history.push({pathname: '/'})
        }
    }
    render() {
        return (null)
    }
}


export default withRouter(Auth)