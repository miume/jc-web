import React from 'react';
import {Popconfirm,Divider} from "antd";

class DeletaSpan extends React.Component {
    render() {
        return (
            <span className={this.props.flag?'':'hide'}>
                <Divider type="vertical" />
                <Popconfirm title="确认删除?" onConfirm={() => this.props.handleDelete(this.props.record.id)} okText="确定" cancelText="取消" >
                    <span className='blue'>删除</span>
                </Popconfirm>
            </span>
        )
    }
}

export default DeletaSpan;
