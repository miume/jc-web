import React from 'react';
import {Popconfirm,message} from "antd";
import axios from "axios";


class DeletaSpan extends React.Component {
    url;
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <span>
                <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(this.props.record.id)} okText="确定" cancelText="取消" >
                    <span className='blue'>删除</span>
                </Popconfirm>
            </span>
        )
    }
    handleDelete = (id) => {
        axios({
            url:`${this.url.department.deleteById}/${id}`,
            method:'Delete',
            headers:{
                'Authorization':this.url.Authorization
            },
        }).then((data)=>{
            message.info(data.data.message);
            this.props.getFetch()
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
        // setTimeout(() => {
        //     this.props.getFetch();
        // }, 1000);
    }
}

export default DeletaSpan;
