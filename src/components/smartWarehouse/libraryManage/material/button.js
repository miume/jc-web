import React from 'react';
import {Button,Popconfirm} from 'antd';
class NewButton extends React.Component{
    render(){
        return (
            <Popconfirm placement='rightBottom' title='你确定要盘库吗？'
                onConfirm={this.props.handleClick}
                okText='确定' cancelText='再想想'
                >
            <Button type='ant-btn ant-btn-primary' loading={this.props.loading}><i className={this.props.className} aria-hidden="true" style={{color:'white',fontWeight:'bolder'}}></i>&nbsp;{this.props.name}</Button>
            </Popconfirm>
        )
    }
}
export default NewButton;