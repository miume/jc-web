import React from 'react';
import {Button} from 'antd';
class ReleaseButton extends React.Component{
    render(){
        return (
            <Button style={{width:'80px',height:'35px',background:'#0079FE',color:'white'}} onClick={this.props.handleReleaseNew} ><i className="fa fa-paper-plane" style={{fontWeight:'bolder',color:'white'}}></i>&nbsp;发布</Button>
        )
    }
}
export default ReleaseButton;