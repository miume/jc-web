import React from "react"
import axios from "axios"

import {Popconfirm,message} from "antd"
export default class DeleteOne extends React.Component{
    url = JSON.parse(localStorage.getItem('url'));
    handleDelete=(code)=>{
        axios({
            url:this.url.productionBatchInfo.deleteOne,
            method:"Delete",
            header:{
                'Authorization': this.url.Authorization
            },
            params:{
                code:code,
            }
        }).then((response)=>{
            if(response.status===200){
                if(response.data.code===0){
                    message.info("删除成功")
                    this.props.getTableData();
                }else{
                    message.info(response.data.message)
                }
            }else {
                message.info(response.statusText)
            }
        })
    }
    render() {
        return(
            <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(this.props.record.code)} okText="确定" cancelText="取消" >
                <span className={'blue'} >删除</span>
            </Popconfirm>
        )
    }
}