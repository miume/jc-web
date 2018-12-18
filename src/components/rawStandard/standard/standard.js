import React, { Component } from 'react';
import {Table,Divider} from 'antd';
import SearchCell from '../../BlockQuote/search';

const data=[];
for(var i=0;i<20;i++){
  data.push({
     id:i,
     
     batchNumber:'SN01',
     createTime:'2018-12-16 12:09:12',
     createPerson:'浩浩',
     status:'未申请'
    }
  );
}


  class Standard extends Component{
     constructor(props){
        super(props);
        this.state={
            searchContent:'',
            dataSource:data,
            selectRowKeys:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id',
            sorter:(a,b)=>a.id-b.id,
            width:'10%',
            align:'center'
        },{
            title:'批号',
            dataIndex:'batchNumber',
            key:'batchNumber',
            width:'10%',
            align:'center'
        },{
            title:'创建时间',
            dataIndex:'createTime',
            key:'createTime',
            width:'10%',
            align:'center'
        },{
            title:'创建人',
            dataIndex:'createPerson',
            key:'createPerson',
            width:'10%',
            align:'center'
        },{
            title:'状态',
            dataIndex:'status',
            key:'status',      
            width:'10%',
            align:'center'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'10%',
            align:'center',
            render:(text,record)=>{
                let editFlag=this.judgeStatus(record.status);
                return(
                    <span>
                        <Divider type='vertical'/>
                        
                    </span>
                );
            }
        }]
        this.searchEvent=this.searchEvent.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
     }

     judgeStatus=(record_status)=>{
             
     }
     searchEvent(){

     }
     searchContentChange(e){
       const value=e.target.value;
     }
     render(){
         return(
         <div>
             <div style={{padding:'15px'}}>
             &nbsp;<h2 style={{display:'inline-block'}}>请设置标准</h2>
             <span style={{float:'right'}}>
               <SearchCell name='请输入搜索内容'
                 searchEvent={this.searchEvent}
                 searchContentChange={this.searchContentChange}
               />
             </span>
             </div>
             <Table 
                 rowKey={record=>record.id}
                 columns={this.columns}
                 dataSource={this.state.dataSource}
                 size='small'
                 scroll={{y:400}}
               />
         </div>
         );
     }
  }
  export default Standard;