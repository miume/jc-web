import React, { Component } from 'react';
import {Table, Divider, message, Spin} from 'antd';
import axios from 'axios';
import Blockquote from '../BlockQuote/blockquote';
//import NewButton from '../BlockQuote/newButton';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';
import CheckManual from './checkShouCe/checkShouCe';
import Edit from './/Edit/edit';
import Delete from './/delete/delete';
import Add from './/add/add';
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
            width:'5%'
        },{
            title:'文档名称',
            dataIndex:'archiveName',
            key:'archiveName',
            align:'center',
            width:'9%'
        },{
            title:'设备名称',
            dataIndex:'instrumentName',
            key:'instrumentName',
            align:'center',
            width:'9%'

        },{
            title:'安装日期',
            dataIndex:'installTime',
            key:'installTime',
            align:'center',
            width:'10%',
            render:(text)=>{
                if(text.length>10){
                    return(
                        <div title={text} className='text-decoration'>{text.substring(0,10)}</div>
                    )
                }
                else{
                    return(
                        <div>{text}</div>
                    )
                }
            }
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
            dataIndex:'operation',
            key:'operation',
            align:'center',
            width:'15%',
            render:(text,record)=>{
                 return(
                     <span>
                        <CheckManual record={record} url={this.url}/>
                        {this.judgeOperation(this.operation,'UPDATE')?<Divider type='vertical' />:''}
                        <Edit  url={this.url} record={record} supplyManufacture={this.state.supplyManufacture} repairManufacture={this.state.repairManufacture} equipmentBaseInstrument={this.state.equipmentBaseInstrument} fetch={this.fetch} operation={this.operation} judgeOperation={this.judgeOperation}/>
                        {this.judgeOperation(this.operation,'DELETE')?<Divider type='vertical' />:''}
                        <Delete record={record} url={this.url} fetch={this.fetch} pagination={this.pagination} operation={this.operation} judgeOperation={this.judgeOperation}/>
                    </span>
                 )
            }
        }
     ]
     this.pagination={
         total:this.state.dataSource.length,
         showSizeChanger:true,//是否可以改变 pageSize
         showTotal:(total)=>`共${total}条记录`,//显示共几条记录
         pageSizeOptions: ["10","20","50","100"]
     };
     this.onSelectChange=this.onSelectChange.bind(this);
     this.handleTableChange=this.handleTableChange.bind(this);
     this.getAllRepairManufacturer=this.getAllRepairManufacturer.bind(this);
     this.getAllSupplyManufacturer=this.getAllSupplyManufacturer.bind(this);
     this.getAllEquipmentBaseInstrument=this.getAllEquipmentBaseInstrument.bind(this);
     this.searchEvent=this.searchEvent.bind(this);
     this.searchContentChange=this.searchContentChange.bind(this);
     this.reset=this.reset.bind(this);
     this.deleteByIds=this.deleteByIds.bind(this);
     this.deleteCancel=this.deleteCancel.bind(this);
     this.judgeOperation=this.judgeOperation.bind(this);
    }
    handleTableChange=(pagination)=>{//页数变化时调用
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
            //console.log(res);
            var data1=[];
            if(res&&res.list){
                //console.log('11')
                this.pagination.total=res.total?res.total:0;
                this.pagination.current=res.pageNumber;
                for(var i=0;i<res.list.length;i++){
                    data1.push({
                        index:i+1,
                        id:res.list[i].equipmentArchiveRecord.id,
                        archiveName:res.list[i].equipmentArchiveRecord.name,
                        instrumentName:res.list[i].baseInstrument.name,//设备名称
                        instrumentId:res.list[i].baseInstrument.id,//设备名称
                        installTime:res.list[i].equipmentArchiveRecord.installTime,
                        warrantyPeriod:res.list[i].equipmentArchiveRecord.warrantyPeriod,//保修期限
                        supplyManufacture:res.list[i].supplyManufacturer.name,//供货厂家名称
                        supplyManufacturerId:res.list[i].supplyManufacturer.id,//供货厂家名称
                        supplyManufacturePhone:res.list[i].supplyManufacturer.contact,
                        repairManufacture:res.list[i].repairManufacturer.name,
                        repairManufacturerId:res.list[i].repairManufacturer.id,
                        repairManufacturePhone:res.list[i].repairManufacturer.contact,
                        manualName:res.list[i].equipmentArchiveRecord.manualName
                    });
                 }
            }
            this.setState({
                dataSource:data1,
                searchContent:'',
                selectedRowKeys:[],
                pageChangeFlag:0
            });
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
    /**批量删除*/
    deleteByIds(){
       const ids=this.state.selectedRowKeys;
       axios({
           url:`${this.url.equipmentArchiveRecord.get}`,
           method:'Delete',
           headers:{
            'Authorization' :this.url.Authorization
           },
           data:ids,
           type:'json'
       }).then((data)=>{
          // console.log(data)
       }).catch();
    }
    deleteCancel(){
        this.setState({
            selectedRowKeys:[]
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
    //用来判断该菜单有哪些权限
   judgeOperation(operation,operationCode){
       //console.log(operation)
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[]
        return flag.length>0?true:false
    }
    render(){
        this.url=JSON.parse(localStorage.getItem('url'));
        const current=JSON.parse(localStorage.getItem('current'));
        //获取当前菜单所有权限
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        const {selectedRowKeys}=this.state;
        const rowSelection={
            selectedRowKeys,
            onChange:this.onSelectChange
        }
        return(
            <div>
                <Blockquote menu={current.menuParent} name={current.menuName}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Add  url={this.url} supplyManufacture={this.state.supplyManufacture} repairManufacture={this.state.repairManufacture} equipmentBaseInstrument={this.state.equipmentBaseInstrument} reset={this.reset} judgeOperation={this.judgeOperation} operation={this.operation}/> &nbsp;&nbsp;&nbsp;
                     <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.deleteCancel} flag={this.judgeOperation(this.operation,'DELETE')}/>

                        <SearchCell
                           name='请输入文档名称'
                           searchEvent={this.searchEvent}
                           searchContentChange={this.searchContentChange}
                           fetch={this.fetch}
                           flag={this.judgeOperation(this.operation,'QUERY')}
                        />

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
                </Spin>
            </div>
        );
    }
}

export default EquipmentArchive;
