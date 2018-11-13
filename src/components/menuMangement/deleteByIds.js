import React from 'react';
import {Button,Popconfirm} from 'antd';
class DeleteByIds extends React.Component {
    constructor(props){
        super(props);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    // deleteByIds() {
    //     console.log(this.props.selectedRowKeys)
    //     if(this.props.selectedRowKeys.length > 0) {
    //         this.setState({ visible : true });
    //     }
    //     else{
    //         message.info('您还没选择任何数据！',1.5);
    //     }
    //   }
    confirm() {
        const ids = this.props.selectedRowKeys.toString();
        console.log(ids)
    }
    cancel() {
        
      }
    render() {
        return (
            <span>
             <Popconfirm placement="rightBottom" title="确定要删除所选择的数据吗?" onConfirm={this.confirm} onCancel={this.cancel} okText="确定" cancelText="取消">
             <Button type="primary" size="small" disabled={!this.props.selectedRowKeys.length>0}>删除</Button>
            </Popconfirm>
            {/* <Modal title='批量删除' visible={this.state.visible}
             onOk={this.handleOk} onCancel={this.handleCancel} 
             onText='确定' cancelText='取消'>
                 <p>确定要删除所选的数据吗？</p>
             </Modal> */}
            </span>
        );
    }
}
export default DeleteByIds;