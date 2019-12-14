import React, { Component } from 'react'
import {Drawer,Button} from 'antd'


class MoreInfo extends React.Component {

    constructor(props){
        super(props)
        this.state={
            infoFlag:true,
            problemFlag:false
        }
    }
    click=()=>{
        let {infoFlag}=this.state
        this.setState({
            infoFlag:!infoFlag
        })
    }
    problem=()=>{

    }
    
    render() {
        return (
            <div className={this.props.infoFlag?'login-box login-info-left-default ':'login-box login-info-left-font '}>
                <div><span className='login-info-font' >通知公告</span></div>
                <hr/>
                <span className='login-info-font' >系统访问要求</span>
                <hr/>
                <p className='login-info-font-p'>推荐浏览器：Chrome浏览器/Microsoft Edge/360极速模式</p>
                <p className='login-info-font-p'>支持浏览器：FireFox浏览器/Opera浏览器/Safari浏览器器等</p>
                <div style={{height:'200px'}}></div>
                <div style={{textAlign:'center'}}>
                    <span className='blue' onClick={this.problem}>常见问题</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className='blue'>使用帮助</span>
                </div>
            </div>
        );
      }
  }

export default MoreInfo