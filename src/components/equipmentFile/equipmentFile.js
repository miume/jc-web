import React, { Component } from 'react';
import {Table,Divider,message} from 'antd';
import axios from 'axios';
import Blockquote from '../BlockQuote/blockquote';
//import NewButton from '../BlockQuote/newButton';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';
import CheckManual from '../equipmentFile/checkShouCe/checkShouCe';
import Edit from '../equipmentFile/Edit/edit';
import Delete from '../equipmentFile/delete/delete';
import Add from '../equipmentFile/add/add';
class EquipmentArchive extends Component{//设备档案
    componentDidMount(){
        this.fetch();
        this.getAllRepairManufacturer();
        this.getAllSupplyManufacturer();
        this.getAllEquipmentBaseInstrument();
        
    }
    constructor(props){
        super(props);
        this.state={
            selectedRowKeys:[],
            dataSource:[],
            searchContent:'',
            supplyManufacturer:[],
            repairManufacturer:[],
            equipmentBaseInstrument:[],
            pageChangeFlag:0,//0表示getAllByPage分页，1表示搜索分页
            
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            align:'center',
            width:'6%'
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
            width:'14%'
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
            width:'9.5%'
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
            width:'9.5%'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            align:'center',
            width:'15%',
            render:(text,record)=>{
                 return(
                     <span>
                        <CheckManual record={record} url={this.url}/>
                        <Divider type='vertical'/>
                        <Edit  url={this.url} record={record} supplyManufacture={this.state.supplyManufacture} repairManufacture={this.state.repairManufacture} equipmentBaseInstrument={this.state.equipmentBaseInstrument}/>
                        <Divider type='vertical'/>
                        <Delete record={record} url={this.url} fetch={this.fetch} pagination={this.pagination}/>
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
     this.getAllEquipmentBaseInstrument=this.getAllEquipmentBaseInstrument.bind(this);
     this.searchEvent=this.searchEvent.bind(this);
     this.searchContentChange=this.searchContentChange.bind(this);
     this.reset=this.reset.bind(this);
    }
    handleTableChange=(pagination)=>{
          this.pagination=pagination;
          const {pageChangeFlag}=this.state;
          if(pageChangeFlag){//为1代表搜索分页
                 this.searchEvent({
                    pageSize: pagination.pageSize,
                    pageNumber: pagination.current,  
                 });
          }
          else{
           this.fetch({
             pageSize:pagination.pageSize,//条目数
             pageNumber:pagination.current,//当前是第几页
           });
          }
    }
    fetch=(params)=>{
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
                var data1=[];
                for(var i=0;i<res.list.length;i++){
                    data1.push({
                        index:i+1,
                        id:res.list[i].equipmentArchiveRecord.id,
                        archiveName:res.list[i].equipmentArchiveRecord.name,
                        instrumentName:res.list[i].baseInstrument.name,//设备名称
                        installTime:res.list[i].equipmentArchiveRecord.installTime,
                        warrantyPeriod:res.list[i].equipmentArchiveRecord.warrantyPeriod,//保修期限
                        supplyManufacture:res.list[i].supplyManufacturer.name,//供货厂家名称
                        supplyManufacturePhone:res.list[i].supplyManufacturer.contact,
                        repairManufacture:res.list[i].repairManufacturer.name,
                        repairManufacturePhone:res.list[i].repairManufacturer.contact,
                        manualName:res.list[i].equipmentArchiveRecord.manualName
                    });
                 }
               this.setState({
                   dataSource:data1,
                   searchContent:'',
                   selectedRowKeys:[],
                   pageChangeFlag:0
               });
            }
        });
    }
     /**重置 */
     reset(){
        this.pagination.current = 1;
        this.fetch();
    }
    onSelectChange(selectedRowKeys){//checkbox变化时调用的函数
        this.setState({
               selectedRowKeys:selectedRowKeys
        });
    }
    searchContentChange(e){
       const value=e.target.value;
    //    console.log(value);
       this.setState({
           searchContent:value
       });
    }
    searchEvent(){
       const name=this.state.searchContent;
       this.setState({
           pageChangeFlag:1
       });
       this.fetch({name:name});
    //    //console.log(name);
    //    axios({
    //         url:`${this.url.equipmentArchiveRecord.getAllByPage}`,
    //         method:'get',
    //         headers:{
    //             'Authorization':this.url.Authorization
    //         },
    //         params:{
    //             pageSize:this.pagination.pageSize,
    //             pageNumber:this.pagination.current,
    //             name:name
    //         },
    //         type:'json'
    //    })
    //    .then((data)=>{
    //        //console.log(data);
    //        const res=data.data.data;
    //        this.pagination.total=res.total?res.total:0;
    //         if(res&&res.list){
    //             var searchData=[];
    //             for(var i=0;i<res.list.length;i++){
    //                 searchData.push({
    //                     index:i+1,
    //                     id:res.list[i].equipmentArchiveRecord.id,
    //                     archiveName:res.list[i].equipmentArchiveRecord.name,
    //                     instrumentName:res.list[i].baseInstrument.name,//设备名称
    //                     installTime:res.list[i].equipmentArchiveRecord.installTime,
    //                     warrantyPeriod:res.list[i].equipmentArchiveRecord.warrantyPeriod,//保修期限
    //                     supplyManufacture:res.list[i].supplyManufacturer.name,//供货厂家名称
    //                     supplyManufacturePhone:res.list[i].supplyManufacturer.contact,
    //                     repairManufacture:res.list[i].repairManufacturer.name,
    //                     repairManufacturePhone:res.list[i].repairManufacturer.contact
    //                 });
    //             }
    //             //console.log(searchData);
    //             this.setState({
    //                 dataSource:searchData,
    //                 pageChangeFlag:1
    //             });
    //         }
    //        })
    //    .catch(()=>{
    //        message.info('搜索失败，请联系管理员！');
    //    })
    }
   
    getAllRepairManufacturer(){//获取所有维修厂家
        const type=2;
        axios({
            url:`${this.url.equipmentManufacture.getAllEquipmentManufactute}/${type}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            })
        .then((data)=>{
            const res=data.data.data;
            if(res){
                this.setState({
                    repairManufacture:res
                });
            }
        });
    }
    getAllSupplyManufacturer(){//获取所有供货厂家
        const type=1;
        axios({
            url:`${this.url.equipmentManufacture.getAllEquipmentManufactute}/${type}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
         })
         .then((data)=>{
            // console.log(data);
            const res=data.data.data;
            if(res){
                this.setState({
                    supplyManufacture:res
                });
            }
         });
    }
    getAllEquipmentBaseInstrument(){//获取所有设备名称
        axios({
            url:`${this.url.equipmentBaseInstrument.getAllEquipmentBaseInstrument}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
         })
         .then((data)=>{
             //console.log(data);
             const res=data.data.data;
             if(res){
                this.setState({
                    equipmentBaseInstrument:res
                });
             }
         });
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
                     <Add  url={this.url} supplyManufacture={this.state.supplyManufacture} repairManufacture={this.state.repairManufacture} equipmentBaseInstrument={this.state.equipmentBaseInstrument} reset={this.reset}/> &nbsp;&nbsp;&nbsp;
                     <DeleteByIds selectedRowKeys={this.state.selectedRowKeys}/>
                     <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell 
                           name='请输入搜索内容'
                           searchEvent={this.searchEvent}
                           searchContentChange={this.searchContentChange}
                           fetch={this.fetch}
                        />
                     </span>
                   <Table
                      rowKey={record=>record.id}
                      columns={this.columns}
                      dataSource={this.state.dataSource}
                      rowSelection={rowSelection}
                      pagination={this.pagination}
                      onChange={this.handleTableChange}
                      size='small'
                      bordered
                      scroll={{y:400}}
                      >
                    </Table>
                 </div>
            </div>
        );
    }
}

export default EquipmentArchive;