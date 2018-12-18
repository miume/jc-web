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
            <span>
            {
                this.props.flag?<Button className='white-button' onClick={this.props.handleCancel}><i className="fa fa-chevron-left" style={{fontWeight:'bolder'}}></i><span style={{fontWeight:'bolder'}}> 返回</span></Button>:
                <Popconfirm placement='rightBottom' title='你确定取消这个任务吗？'
                onConfirm={this.props.handleCancel} 
                okText='确定' cancelText='再想想'
                >
                    <Button className='white-button' style={{float:'left'}}><i className="fa fa-times" style={{fontWeight:'bolder'}}></i><span style={{fontWeight:'bolder'}}> 取消</span></Button>
                </Popconfirm>
            }
            </span>
           
        );
    }
}
export default CancleButton;