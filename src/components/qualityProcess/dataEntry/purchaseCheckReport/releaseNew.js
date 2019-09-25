import React from 'react';
import {Button} from 'antd';
class ReleaseNewButton extends React.Component{
    render(){
        return (
            <Button style={{width:'120px',height:'35px',right:'-8px'}} onClick={this.props.handleReleaseNew} className='white-button' ><i className="fa fa-paper-plane" style={{fontWeight:'bolder'}}></i>&nbsp;发布新材料</Button>
        )
    }
}
export default ReleaseNewButton;