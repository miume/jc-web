import React from 'react';
import {Popconfirm,message} from "antd";
import axios from "axios";



class DeletaSpan extends React.Component {
    Authorization;
    server;
    render() {
        /**这是个令牌，每次调用接口都将其放在header里 */
        this.Authorization = localStorage.getItem('Authorization');
        /**这是服务器网址及端口 */
        this.server = localStorage.getItem('remote');
        return (
            <span>
                <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(this.props.record.id)} okText="确定" cancelText="取消" >
                    <span style={{color:'#1890ff'}}>删除</span>
                </Popconfirm>
            </span>
        )
    }
    handleDelete = (id) => {
        axios({
            url:`${this.server}/jc/auth/operation/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
        setTimeout(() => {
            this.props.getFetch();
        }, 1000);
    }
}

export default DeletaSpan;
