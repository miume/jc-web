import React from 'react';
import {Popconfirm,message} from "antd";
import axios from "axios";

/**这是个令牌，每次调用接口都将其放在header里 */

class DeletaSpan extends React.Component {
    url
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        return (
            <span className={this.props.flag?'':'hide'}>
                <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(this.props.record.menuId)} okText="确定" cancelText="取消" >
                    <span className='blue' href="#">删除</span>
                </Popconfirm>
            </span>
        )
    }
    handleDelete = (id) => {
        axios({
            url:`${this.url.menu.add}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
        }).catch((error)=>{
            message.info(error.data)
        });
        setTimeout(() => {
            this.props.getFetch(this.props.pagination);
        }, 1000);
    }
}

export default DeletaSpan;