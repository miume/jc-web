import React from 'react';
import {Divider} from 'antd';
import {withRouter} from 'react-router-dom'
import Exit from './exit';
class Top extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="top">
                <div className="top-left" >
                    <div className="top-left-image" >
                        <img src={require("../logo/logo.png")} width={30} height={30} alt=""  />
                    </div>
                    <div className="top-left-text" >
                        <span>新能源材料智能工厂MES系统</span>
                    </div>
                </div>
                <div className="fr" >
                    <Exit name='退出' userId={this.props.userId}></Exit>
                </div>
                <div className="fr userName" >
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i> 
                    <span>{this.props.userName}</span>
                    <Divider type='vertical' />
                </div>     
            </div>
        )
    }
}
export default withRouter(Top);