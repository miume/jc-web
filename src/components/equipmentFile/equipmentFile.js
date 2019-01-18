import React, { Component } from 'react';
import {Table,Divider} from 'antd';
import axios from 'axios';
import Blockquote from '../BlockQuote/blockquote';
import NewButton from '../BlockQuote/newButton';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';
import CheckManual from '../equipmentFile/checkShouCe/checkShouCe';
import Edit from '../equipmentFile/Edit/edit';
import Delete from '../equipmentFile/delete/delete';
// const data=[];
// for(var i=0;i<32;i++){
//    data.push({
//        index:i+1,
//        archiveName:'档案名称',
//        instrumentName:'设备名称',
//        installTime:'2019年1月15日',
//        warrantyPeriod:'10年',
//        supplyManufacture:'供货厂家',
//        supplyManufacturePhone:'0731-1234567',
//        repairManufacture:'维修厂家',
//        repairManufacturePhone:'0731-1234567'
//    });
// }
class EquipmentArchive extends Component{//设备档案
    componentDidMount(){
        this.fetch();
        this.getAllRepairManufacturer();
        this.getAllSupplyManufacturer();
    }
    constructor(props){
        super(props);
        this.state={
            selectedRowKeys:[],
            dataSource:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            align:'center',
            width:'5%'
        },{
            title:'文档名称',
            dataIndex:'archiveName',
            key:'archiveName',
            align:'center',
            width:'9.5%'
        },{
            title:'设备名称',
            dataIndex:'instrumentName',
            key:'instrumentName',
            align:'center',
            width:'9.5%'
            
        },{
            title:'安装日期',
            dataIndex:'installTime',
            key:'installTime',
            align:'center',
            width:'10%'
        },{
            title:'保修期限',
            dataIndex:'warrantyPeriod',
            key:'warrantyPeriod',
            align:'center',
            width:'7%'
        },{
            title:'供货厂家',
            dataIndex:'supplyManufacture',
            key:'supplyManufacture',
            align:'center',
            width:'9.5%'
        },{
            title:'供货厂家电话',
            dataIndex:'supplyManufacturePhone',
            key:'supplyManufacturePhone',
            align:'center',
            width:'10%'
        },{
            title:'维修厂家',
            dataIndex:'repairManufacture',
            key:'repairManufacture',
            align:'center',
            width:'9.5%'
        },{
            title:'维修厂家电话',
            dataIndex:'repairManufacturePhone',
            key:'repairManufacturePhone',
            align:'center',
            width:'10%'
        },{
            title:'操作',
            dataIndex:'id',
            key:'id',
            align:'center',
            width:'18%',
            render:(text,record)=>{
                 return(
                     <span>
                        <CheckManual/>
                        <Divider type='vertical'/>
                        <Edit flag={true} url={this.url}/>
                        <Divider type='vertical'/>
                        <Delete selectedRowKeys={this.state.selectedRowKeys}/>
                    </span>
                 )
            }
        }
     ]
     this.pagination={
         total:this.state.dataSource.length,
         showSizeChanger:true,//是否可以改变 pageSize
         showTotal:(total)=>`共${total}条记录`,//显示共几条记录
         onShowSizeChange(current, pageSize) {//current是当前页数，pageSize是每页条数
            //console.log('Current: ', current, '; PageSize: ', pageSize);
          },
          onChange(current) {//跳转，页码改变
            //console.log('Current: ', current);
          }
     }
     this.onSelectChange=this.onSelectChange.bind(this);
     this.handleTableChange=this.handleTableChange.bind(this);
     this.getAllRepairManufacturer=this.getAllRepairManufacturer.bind(this);
     this.getAllSupplyManufacturer=this.getAllSupplyManufacturer.bind(this);
    }
    handleTableChange=(pagination)=>{
          this.fetch({
            pageSize: pagination.pageSize,//条目数
            pageNumber: pagination.current,//当前页
          });
    }
    fetch=(params={})=>{
        axios({
            url:`${this.url.equipmentArchiveRecord.getAllByPage}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:params
        })
        .then((data)=>{
            //console.log(data);
            const res=data.data.data;
            this.pagination.total=res.total?res.total:0;
            if(res&&res.list){
                var data=[];
                for(var i=0;i<res.list.length;i++){
                    data.push({
                        index:i+1,
                        id:res.list[i].equipmentArchiveRecord.id,
                        archiveName:res.list[i].equipmentArchiveRecord.name,
                        instrumentName:res.list[i].baseInstrument.name,//设备名称
                        installTime:res.list[i].equipmentArchiveRecord.installTime.split(" ")[0],
                        warrantyPeriod:res.list[i].equipmentArchiveRecord.warrantyPeriod,//保修期限
                        supplyManufacture:res.list[i].supplyManufacturer.name,//供货厂家名称
                        supplyManufacturePhone:res.list[i].supplyManufacturer.contact,
                        repairManufacture:res.list[i].repairManufacturer.name,
                        repairManufacturePhone:res.list[i].repairManufacturer.contact
                    });
                 }
               this.setState({
                   dataSource:data
               });
            }
        });
    }
    onSelectChange(selectedRowKeys){//checkbox变化时调用的函数
        this.setState({
               selectedRowKeys:selectedRowKeys
        });
    }
    getAllRepairManufacturer(){
            axios({
               url:`${this.url.equipmentArchiveRecord.getAllManufactute}`,
               
            })
            .then();
    }
    getAllSupplyManufacturer(){

    }
    render(){
        this.url=JSON.parse(localStorage.getItem('url'));
        const current=JSON.parse(localStorage.getItem('current'));
        const {selectedRowKeys}=this.state;
        const rowSelection={
            selectedRowKeys,
            onChange:this.onSelectChange
        }
        return(
            <div>
                <Blockquote menu={current.menuParent} name={current.menuName}/>
                 <div style={{padding:'15px'}}>
                     <Edit flag={false} url={this.url}/> &nbsp;&nbsp;&nbsp;
                     <DeleteByIds selectedRowKeys={this.state.selectedRowKeys}/>
                     <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell 
                           name='请输入搜索内容'
                        />
                     </span>
                   <Table
                      rowKey={record=>record.id}
                      columns={this.columns}
                      dataSource={this.state.dataSource}
                      rowSelection={rowSelection}
                      size='small'
                      bordered
                      >
                    </Table>
                 </div>
            </div>
        );
    }
}

export default EquipmentArchive;