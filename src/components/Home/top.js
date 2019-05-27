import React from 'react';
import {withRouter} from 'react-router-dom'
import Exit from './exit';
import ChangePassword from "./changePassword";
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
                <Exit name='退出' userId={this.props.userId}></Exit>
                <ChangePassword userName={this.props.userName}/>
            </div>
        )
    }
}
export default withRouter(Top);