import React, { Component } from 'react';
import {Table} from 'antd';
import './detail.css';

class DetailModal extends Component{
    constructor(props){
        super(props);
    }
    columns=[{
         title:'序号',
         dataIndex:'index',
         key:'index',
         align:'center',
         width:'20%'
    },{
        title:'检测项目',
        dataIndex:'name',
        key:'name',
        align:'center',
        width:'25%'
    },{
        title:'检测标准',
        dataIndex:'value',
        key:'value',
        align:'center',
        width:'25%'
    },{
        title:'计量单位',
        dataIndex:'unit',
        key:'unit',
        align:'center',
        width:'25%'
    }];
    render(){
        const columns=this.columns.map((col)=>{
             return{
                 ...col,
                 onCell:record=>({
                     record,
                 })
             };
        });
        return(
            <div>
               <div className='rawStandardTop'>
                   <table >
                       <thead>
                           <tr>
                              <th>批号</th>
                              <th>原材料</th>
                              <th>厂家名称</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td style={{width:'40%'}}>{this.props.record.batchNumber}</td>
                               <td>{this.props.raw}</td>
                               <td>{this.props.factory}</td>
                           </tr>
                       </tbody>
                   </table>
               </div>
               <div style={{height:'15px'}}></div>
               <div >
                   <Table className='rawStandardTable'
                      rowKey={record=>record.index}
                      columns={columns}
                      dataSource={this.props.data}
                      pagination={{hideOnSinglePage:true,pageSize:100}}
                      size='small'
                      scroll={{y:230}}
                      bordered/>
               </div>
               <div style={{marginTop:'15px'}}>
                       <div>
                           施行时间：<span>{this.props.effectiveTime}</span>
                       </div>
                       <div>
                           编制日期：<span>{this.props.createTime}</span>
                       </div>
                </div>
            </div>
        );
    }
}
export default DetailModal;