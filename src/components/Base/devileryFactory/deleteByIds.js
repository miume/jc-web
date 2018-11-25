import React from 'react';
import {Button,Popconfirm,message} from 'antd';
import axios from 'axios';

const Authorization=localStorage.getItem('Authorization');
const server=localStorage.getItem('remote2');
class DeleteByIds extends React.Component {
    constructor(props){
       super(props);
       this.cancel=this.cancel.bind(this);
       this.deleteByIds=this.deleteByIds.bind(this);
    }
    /**批量删除弹出框确认函数 */
    deleteByIds(){
        const ids = this.props.selectedRowKeys;//删除的几行的id
       // console.log(ids);
        axios({
            url:`${server}/jc/deliveryFactory/deleteByIds?ids=${ids}`,
            method:'Delete',
            headers:{
                  'Authorization' :Authorization
            },
            data:ids,//前端要传的参数放在data里面，
            type:'json'
        })
        .then((data)=>{
         // console.log(data);
          message.info(data.data.message);
          this.props.fetch();//调用getAllByPage,渲染删除后的表格
        })//处理成功
        .catch((error)=>{
         // console.log(error);
          message.info(error.data.message)
        });//处理异常
       
     }
    cancel(){
      
    }
    render() {
        return (
            <span>
             <Popconfirm placement="rightBottom" title="确定要删除所选择的数据吗?" onConfirm={this.deleteByIds} onCancel={this.cancel} okText="确定" cancelText="取消">
             <Button type="primary" size="small" disabled={!this.props.selectedRowKeys.length>0}>删除</Button>
            </Popconfirm>
            </span>
        );
    }
}
export default DeleteByIds;