import React from 'react';
import {Popconfirm} from 'antd';
class DeleteById extends React.Component {
    render() {
        // console.log(this.props.selectedRowKeys.length>0)
        return (
            <span>
             <Popconfirm onConfirm={this.props.handleDelete(this.props.id)}  okText="确定" cancelText="再想想" >
                 <span className='blue'>删除</span>
             </Popconfirm>
            </span>
        );
    }
}
export default DeleteById;