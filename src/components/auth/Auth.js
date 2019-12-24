import {withRouter} from "react-router-dom";
import React from 'react'
class Auth extends React.Component {
    componentDidMount() {
        let auth = localStorage.getItem("authorization"),
            menus = localStorage.getItem("menuList"),
            current = localStorage.getItem('current');
        /**如果localStorage非空，则跳回主页面 */
        if(auth && menus && current){
            this.props.history.push({pathname : '/home'})
         /**如果localStorage为空，则跳回登陆页 */
        } else {
            this.props.history.push({pathname: '/'})
        }
    }
    render() {
        return (null)
    }
}
export default withRouter(Auth)
