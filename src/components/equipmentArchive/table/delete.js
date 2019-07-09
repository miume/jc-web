import React from 'react';
import {Divider, Popconfirm} from 'antd';

class Delete extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <span className={this.props.flag?'':'hide'}>
                <Divider type="vertical" />
                <Popconfirm title="确认删除?" onConfirm={() => this.props.handleDelete(this.props.record.code)} okText="确定" cancelText="取消" >
                    <span className='blue'>删除</span>
                </Popconfirm>
            </span>
        )
    }
}

export default Delete