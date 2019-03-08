import React from 'react';
import {Popconfirm,message} from "antd";
import axios from "axios";


class DeletaSpan extends React.Component {
    render() {
        return (
            <span>
                <Popconfirm title="确认删除?" onConfirm={() => this.props.handleDelete(this.props.record.id)} okText="确定" cancelText="取消" >
                    <span className='blue'>删除</span>
                </Popconfirm>
            </span>
        )
    }
}

export default DeletaSpan;
