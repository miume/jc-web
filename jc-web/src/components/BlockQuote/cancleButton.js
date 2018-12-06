import React from 'react';
import {Button,Popconfirm} from 'antd';
class CancleButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
        this.cancle = this.cancle.bind(this);
    }
    /**取消点击 取消按钮 */
    cancle(){
    }
    render(){
        return (
            <Popconfirm placement='rightBottom' title='你确定取消这个任务吗？'
            onConfirm={this.props.handleCancel} 
            okText='确定' cancelText='再想想'
            >
                <Button className='white-button' style={{float:'left',backgroundColor:'white'}}><i className="fa fa-times" style={{fontWeight:'bolder'}}></i><span style={{fontWeight:'bolder'}}> 取消</span></Button>
            </Popconfirm>
        );
    }
}
export default CancleButton;