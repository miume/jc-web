import React from 'react';
import {Button,Popconfirm} from 'antd';
class NewButton extends React.Component{
    render(){
        return (
            this.props.flag ? 
                <Popconfirm placement='topRight' title='确定提交？'
                            onConfirm={this.props.handleClick}
                            okText='确定' cancelText='再想想'>
                    <span className='addButton'>
                        <Button type='ant-btn ant-btn-primary' className={this.props.buttonClass} disabled={this.props.flagConfirm}><i className={this.props.className} aria-hidden="true" style={{color:'white',fontWeight:'bolder'}}></i>&nbsp;{this.props.name}</Button>
                    </span>
                </Popconfirm>
            :<span className='addButton'>
                <Button onClick={this.props.handleClick} type='ant-btn ant-btn-primary' className={this.props.buttonClass} disabled={this.props.flagConfirm}><i className={this.props.className} aria-hidden="true" style={{color:'white',fontWeight:'bolder'}}></i>&nbsp;{this.props.name}</Button>
            </span>
        )
    }
}
export default NewButton;
