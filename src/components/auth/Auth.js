import {withRouter} from "react-router-dom";
import React from 'react'
class Auth extends React.Component {
    componentDidMount() {
        let auth = localStorage.getItem("authorization");
        let menus = localStorage.getItem("menuList");
        /**如果localStorage非空，则跳回主页面 */
        if(auth && menus){ 
            this.props.history.push({pathname : '/home'})
         /**如果localStorage为空，则跳回登陆页 */
        }else {
            // localStorage.removeItem('quickAccess');
            // localStorage.removeItem('dataType');
            // localStorage.removeItem('url');
            // localStorage.removeItem('authorization');
            // localStorage.removeItem('menuList');
            // localStorage.removeItem('status');
            this.props.history.push({pathname: '/'})
        }
    }
    render() {
        return (null)
    }
}
export default withRouter(Auth)