import React, { Component } from 'react';
import {Table} from 'antd';
const data=[];
// data.push({
//     bagNumber:this.props.record.bagNumber,
//     batch:this.props.record.batch,
//     workshop:this.props.record.workshop,
//     verdor:this.props.record.vendor
// });
class DetailSpan extends Component{
    constructor(props){
        super(props);
        this.columns=[{
           title:'袋号',
           dataIndex:'bagNumber',
           key:'bagNumber',
           align:'center'
        },{
            title:'批次',
            dataIndex:'batch',
            key:'batch',
            align:'center'
        },{
            title:'车间',
            dataIndex:'workshop',
            key:'workshop',
            align:'center'
        },{
            title:'厂商',
            dataIndex:'repoBaseSerialNumber.manufacturerName',
            key:'manufacturerName',
            align:'center'
        }];
    }
   render(){
       return(
           <div>
               <Table
                 
                 columns={this.columns}
                 dataSource={data}
                 bordered
                 size='small'
                 >
                
               </Table>
           </div>
       );
   }
}
export default DetailSpan;