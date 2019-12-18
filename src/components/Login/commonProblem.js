import React, { Component } from 'react'
/**
 * 常见问题*/
class CommonProblem extends Component{
    constructor(props){
        super(props)
        this.problem=this.problem.bind(this);
    }
    problem(){
        this.props.handleInfo(true,1)
    }
    render(){
        return(
            <div className={!this.props.infoFlag?'login-box login-info-left-default ':'login-box login-info-left-font '}>
                <div><span className='login-info-font' >常见问题</span></div>
                <hr/>
                <div className={'login-font-question'}>1 . 哪些人需要使用这个系统？</div>
                <div className='login-info-font-p'>答：本系统由巴啦巴拉巴拉，主要针对巴啦巴拉巴拉。除此之外巴啦巴拉巴拉。</div>
                <div className={'login-font-question'}>2 . 为什么我无法登陆系统？</div>
                <div className='login-info-font-p'>答：本系统由巴啦巴拉巴拉，主要针对巴啦巴拉巴拉。除此之外巴啦巴拉巴拉。</div>
                <div className={'login-font-question'}>3 . 如何获得登陆账号？</div>
                <div className='login-info-font-p'>答：本系统由巴啦巴拉巴拉，主要针对巴啦巴拉巴拉。除此之外巴啦巴拉巴拉。</div>
                <div className={'login-font-question'}>4 . 我忘记了自己的账号或密码该怎么办？</div>
                <div className='login-info-font-p'>答：本系统由巴啦巴拉巴拉，主要针对巴啦巴拉巴拉。除此之外巴啦巴拉巴拉。</div>
                <div className='blue' onClick={this.problem} style={{position:'absolute', bottom:10,left:'50%',textAlign:'center'}}>
                   返回
                </div>
            </div>
        )
    }
}
export default CommonProblem