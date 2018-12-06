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
            let remote1 = localStorage.getItem('remote1');
            let remote2 = localStorage.getItem('remote2');
            let remote3 = localStorage.getItem('remote3');
            localStorage.clear();
            localStorage.setItem("remote", remote);
            localStorage.setItem("quickAccess", quickAccess);
            localStorage.setItem("remote1", remote1);
            localStorage.setItem("remote2", remote2);
            localStorage.setItem("remote3", remote3);
            this.props.history.push({pathname: '/'})
        }
    }
    render() {
        return (null)
    }
}


export default withRouter(Auth)