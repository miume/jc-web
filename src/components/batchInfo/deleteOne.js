import React from "react"
import {Popconfirm} from "antd"
export default class DeleteOne extends React.Component{
    handleDelete=(code)=>{

    }
    render() {
        return(
            <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(this.props.record.index)} okText="确定" cancelText="取消" >
                <span className={'blue'} >删除</span>
            </Popconfirm>
        )
    }
}