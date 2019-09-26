import React from 'react';
import {withRouter} from 'react-router-dom'
import Exit from './exit';
import ChangePassword from "./changePassword";
class Top extends React.Component{
    constructor(props){
        super(props);
    }
    logout = () => {
        document.getElementById('defaultCanvas0').style.visibility='visible';
        let showFrame = setInterval(function() {
            let frame = window.frame;
            if(frame !== undefined && frame !== null) {
                frame(20);   //恢复帧
                clearInterval(showFrame);
            }
        },100)
    }
    render(){
        return (
            <div className="top">
                <div className="top-left" >
                    <div className="top-left-image" >
                        <img src={require("../image/logo.png")} width={30} height={30} alt=""  />
                    </div>
                    <div className="top-left-text" >
                        <span>新能源材料智能工厂MES系统</span>
                    </div>
                </div>
                <Exit name='退出' userId={this.props.userId} logout={this.logout}></Exit>
                <ChangePassword userId={this.props.userId} logout={this.logout}
                                userName={this.props.userName} />
            </div>
        )
    }
}
export default withRouter(Top);
