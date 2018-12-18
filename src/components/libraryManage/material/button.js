import React from 'react';
import {Button} from 'antd';
class NewButton extends React.Component{
    render(){
        return (
            <Button onClick={this.props.handleClick} type='ant-btn ant-btn-primary' loading={this.props.loading}><i className={this.props.className} aria-hidden="true" style={{color:'white',fontWeight:'bolder'}}></i>&nbsp;{this.props.name}</Button>
        )
    }
}
export default NewButton;