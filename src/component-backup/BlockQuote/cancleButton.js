import React from 'react';
import {Button,Icon,Popconfirm} from 'antd';
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
            onConfirm={this.props.handleCancel} onCancel={this.cancle}
            okText='确定' cancelText='取消'
            >
                <Button type='ghost' className='button' style={{float:'left'}}><Icon type="close" />取消</Button>
            </Popconfirm>
        );
    }
}
export default CancleButton;