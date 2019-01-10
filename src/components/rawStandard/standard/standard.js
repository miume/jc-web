import React, { Component } from 'react';
import {Table,Divider} from 'antd';
import axios from 'axios';
import SearchCell from '../../BlockQuote/search';
import Edit from './edit';
import Detail from './detail';
// const data=[];
// for(var i=0;i<20;i++){
//   data.push({
//      id:i+1,
//      batchNumber:'SN01',
//      createTime:'2018-12-16 12:09:12',
//      createPerson:'李钦',
//      status:'已保存未提交'
//     }
//   );
// }
  class Standard extends Component{
      url;
      componentDidMount(){
          this.fetch()
      }
     constructor(props){
        super(props);
        this.state={
            searchContent:'',
            dataSource:this.props.standardDataSource,
            selectRowKeys:[],
            
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
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
            dataIndex:'createPersonName',
            key:'createPersonName',
            width:'10%',
            align:'center'
        },{
            title:'审核状态',
            dataIndex:'status',
            key:'status',      
            width:'10%',
            align:'center',
            // render:status=>{
            //     return this.status[status.toString()];
            // }

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
                        <Edit editFlag={editFlag}/>
                        <Divider type='vertical'/>
                        <Detail record={record} raw={this.props.raw} factory={this.props.factory} />
                    </span>
                );
            }
        }]
        this.searchEvent=this.searchEvent.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.checkRaw=this.checkRaw.bind(this);
        this.fetch=this.fetch.bind(this);
     }
     fetch(){
         axios({
             url:`${this.url.rawStandard.getStandard}`,
             method:'get',
             headers:{
                'Authorization':this.url.Authorization
             },
             params:{
                name:JSON.parse(localStorage.getItem('menuList')).name,//创建人姓名即用户
                materialId:this.props.rawMaterialId,
                factoryId:this.props.factoryId
           },
             type:'json'
         }).then(data=>{
             console.log(data);
         });
     }
     judgeStatus=(record_status)=>{
             switch(`${record_status}`){
                  case '-1':return true
                  case '0':return false
                  case '1':return false
                  case '2':return false
                  case '3':return true
             }
     }
     checkRaw(e){//点击重新选择厂家调用的函数
        //    const name=this.props.returnRaw();
        //    console.log(name);
            this.props.onBlockChange(2,'设置标准');//跳回原材料界面后，就不可以点击那个面板了
        }
     searchEvent(){

     }
     searchContentChange(e){
       const value=e.target.value;
     }
     render(){
         this.url=JSON.parse(localStorage.getItem('url'));
         return(
         <div style={{position:'relative'}}>
             <div style={{padding:'15px'}}>
                &nbsp;<h2 style={{display:'inline-block'}}>请设置标准</h2>
                <span className='fr'>
                <SearchCell name='请输入搜索内容'
                    searchEvent={this.searchEvent}
                    searchContentChange={this.searchContentChange}
                    type={this.props.type}
                />
                </span>
             </div>
             <div>
                <Table 
                    rowKey={record=>record.id}
                    columns={this.columns}
                    dataSource={this.state.dataSource}
                    pagination={{hideOnSinglePage:true,pageSize:100}}
                    size='small'
                    bordered
                    scroll={{y:230}}
                />
             </div>
               <div className='rawStandardPosition' onClick={this.checkRaw}>重新选择厂家</div>
         </div>
         );
     }
  }
  export default Standard;