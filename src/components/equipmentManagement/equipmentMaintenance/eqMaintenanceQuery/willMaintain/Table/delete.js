import React from 'react';
import {Divider, Popconfirm} from 'antd';

//用于编写弹出框的按钮应用
class Delete extends React.Component {
    constructor(props) {
        super(props);
        }
    render(){

        return(
            <div>
                <span >
                <Divider type="vertical" />
                <Popconfirm title="确认删除?" onConfirm={()=> this.props.handleDelete(this.props.record.code)} okText="确定" cancelText="取消" >
                    <span className='blue' >删除</span>
                </Popconfirm>
            </span>
            </div>
        )
    }

}

export default Delete