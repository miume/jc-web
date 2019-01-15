import React, { Component } from 'react';
import {Table,Divider} from 'antd';
import axios from 'axios';
import SearchCell from '../../BlockQuote/search';
// import Edit from './edit';
import Detail from './detail';
import EditStandard from './edit';
  class Standard extends Component{
     
    //   componentDidMount(){
    //       this.fetch()
    //   }
     constructor(props){
        super(props);
        this.state={
            searchContent:'',
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
            render:status=>{
                return this.status[status.toString()];
            }
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'10%',
            align:'center',
            render:(text,record)=>{
                //console.log(record.status);
                let editFlag=this.judgeStatus(record.status);
                return(
                    <span>
                        <EditStandard editFlag={editFlag} flag={true} url={this.props.url} record={record} raw={this.props.raw} factory={this.props.factory}  rawManufacturerId={this.props.rawManufacturerId} rawMaterialId={this.props.rawMaterialId} getStandard={this.props.getStandard} />
                        <Divider type='vertical'/>
                        <EditStandard editFlag={editFlag} flag={false} url={this.props.url} record={record} raw={this.props.raw} factory={this.props.factory}  rawManufacturerId={this.props.rawManufacturerId} rawMaterialId={this.props.rawMaterialId} getStandard={this.props.getStandard} />
                    </span>
                );
            }
        }]
     
        this.searchEvent=this.searchEvent.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.checkRaw=this.checkRaw.bind(this);
       
     }
     fetch=()=>{
         this.props.getStandard(this.props.rawManufacturerId);
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
    searchContentChange(e){
        const value=e.target.value;
        this.setState({
            searchContent:value
            });
          }
     searchEvent(){
           const value=this.state.searchContent;
           console.log(value)
          this.props.getStandard(this.props.rawManufacturerId,value);
     }
   
     render(){
        this.status=JSON.parse(localStorage.getItem('status'));
         return(
         <div style={{position:'relative'}}>
             <div style={{padding:'15px'}}>
             <span className='product-standrad-middle-text'>请设置标准</span>
                <span className='fr'>
                <SearchCell name='请输入搜索内容'
                    searchEvent={this.searchEvent}
                    searchContentChange={this.searchContentChange}
                    type={this.props.type}
                    fetch={this.fetch}
                />
                </span>
                <Divider type='horizonal'/>
             </div>
             <div>
                <Table 
                    rowKey={record=>record.index}
                    columns={this.columns}
                    dataSource={this.props.dataSource}
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