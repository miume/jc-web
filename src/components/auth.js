import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import store from './redux/index'

class Auth extends React.Component{
    //在页面加载完成后会去验证用户信息，如果在登录页面，用户信息不存在时，不需要验证，其他页面都需要验证
    componentDidMount(){
        console.log("xxxxx")
        const publicList = ['/']
        const pathname = this.props.location.pathname //获取当前页面的pathname 如/home
        if(publicList.indexOf(pathname) > -1){
            return null
        }
        let data = store.getState()
        if(data.status === 200){
            this.props.loadData(data.data)
        }
    }
    render() {
       
        return null
    }
}
const mapStateToProps = (state) =>{
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData(res){
            const action = {
                type: 'LOAD_DATA',
                loginInfo: res
            }
            dispatch(action);
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Auth))
