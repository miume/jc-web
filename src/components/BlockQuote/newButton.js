import React from 'react';
import {Button} from 'antd';
class NewButton extends React.Component{
    render(){
        return (
            <span className='addButton'>
                <Button onClick={this.props.handleClick} type='ant-btn ant-btn-primary' className={this.props.buttonClass}><i className={this.props.className} aria-hidden="true" style={{color:'white',fontWeight:'bolder'}}></i>&nbsp;{this.props.name}</Button>
            </span>
        )
    }
}
export default NewButton;
