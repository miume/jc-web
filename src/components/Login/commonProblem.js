import React, { Component } from 'react'
import {Modal} from 'antd'

class CommonProblem extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div >
                <div><span className='login-info-font' >常见问题</span></div>
                <hr/>
                <div>1.哪些人需要使用这个系统？</div>
                <div>2.为什么我无法登陆系统？</div>
                <div>3.如何获得登陆账号？</div>
                <div>4.我忘记了自己的账号或密码该怎么办？</div>
                <div style={{textAlign:'center'}}>
                    <span className='blue' onClick={this.problem}>返回</span>
                </div>
            </div>
        )
    }
}
export default CommonProblem