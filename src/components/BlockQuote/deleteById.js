import React from 'react';
import {Popconfirm} from "antd";

class DeleteById extends React.Component {
    render() {
        return (
            <span className={this.props.flag?'':'hide'}>
                <Popconfirm title="确认删除?" onConfirm={() => this.props.handleDelete(this.props.id)} okText="确定" cancelText="取消" >
                    <span className='blue'>删除</span>
                </Popconfirm>
            </span>
        )
    }
}

export default DeleteById;
