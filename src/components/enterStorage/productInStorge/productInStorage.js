//入库管理的原材料入库
import React,{Component} from 'react';
import {Table,message} from 'antd';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios';

class ProductInStorage extends Component{
    url;
    componentDidMount(){
      this.fetch();
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
               return;
        }
    }
    constructor(props){
         super(props);
         this.state={
             searchContent:'',
             dataSource:[],
             pagination:[],
             pageChangeFlag:0,//1是搜索分页，0是getAllByPAge
         }
         this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            width:'5%',
            align:'center'
        },{
           title:'产品名称',
           dataIndex:'repoBaseSerialNumber.materialName',
           key:'repoBaseSerialNumber.materialName',
           width:'8%',
           align:'center'
        },{
           title:'物料编码',
           dataIndex:'repoBaseSerialNumber.serialNumber',
           key:'repoBaseSerialNumber.serialNumber',
           width:'11%',
           align:'center',
           render:(text,record)=>{
            if(text.length>13){
                return(<div title={text} className='text-decoration'>{text.substring(0,13)}</div>)
            }
            else{
                return(<div>{text}</div>)
            }
          }
        },{
            title:'袋号',
            dataIndex:'bagNumber',
            key:'bagNumber',
            align:'center',
            width:'11%'
         },{
             title:'批次',
             dataIndex:'batch',
             key:'batch',
             align:'center',
             width:'8%'
         },{
             title:'车间',
             dataIndex:'workshop',
             key:'workshop',
             align:'center',
             width:'8%'
         },{
             title:'厂商',
             dataIndex:'repoBaseSerialNumber.manufacturerName',
             key:'manufacturerName',
             align:'center',
             width:'8%'
         },{
           title:'数量',
           dataIndex:'quantity',
           key:'quantity',
           width:'6%',
           align:'center'
        },{
           title:'重量',
           dataIndex:'repoInRecord.weight',
           key:'repoInRecord.weight',
           width:'6%',
           align:'center'
        },{
           title:'入库时间',
           dataIndex:'repoInRecord.createTime',
           key:'repoInRecord.createTime',
           width:'9%',
           align:'center',
           render:(text,record)=>{
            if(text&&text.length>10){
               return(<div title={text} className='text-decoration'>{text.substring(0,10)}</div>)
            }
            else{
                return(<div>{text}</div>)
            }
          }
        },{
            title:'操作时间',
            dataIndex:'repoInRecord.operationTime',
            key:'repoInRecord.operationTime',
            width:'9%',
            align:'center',
            render:(text,record)=>{
                if(text&&text.length>10){
                   return(<div title={text} className='text-decoration'>{text.substring(0,10)}</div>)
                }
                else{
                    return(<div>{text}</div>)
                }
              }
         },{
           title:'入库人',
           dataIndex:'repoInRecord.createPerson',
           key:'repoInRecord.createPerson',
           width:'7%',
           align:'center'
        }];
        this.pagination={
            total:this.state.dataSource.length,
            showTotal:(total)=>`共${total}条记录`,//显示共几条记录
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {//current是当前页数，pageSize是每页条数
                //console.log('Current: ', current, '; PageSize: ', pageSize);
              },
              onChange(current) {//跳转，页码改变
                //console.log('Current: ', current);
              }
        }
        this.handleTableChange=this.handleTableChange.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
    }
    handleTableChange=(pagination)=>{//页码发生改变时调用
        const {pageChangeFlag}=this.state;
        if(pageChangeFlag){
            this.searchEvent({
                size:pagination.pageSize,//此页显示了几条
                page:pagination.current,//当是第几页
                orderField: 'id',
                orderType: 'desc',
            });
        }
        else{
            this.fetch({
                size:pagination.pageSize,//此页显示了几条
                page:pagination.current,//当是第几页
                orderField: 'id',
                orderType: 'desc',
            });
        }
         
    }
    fetch=(params={})=>{
      axios({
        url:`${this.url.enterStorage.enterStorage}`,
        method:'get',
        headers:{
              'Authorization':this.url.Authorization
        },
        params:{
            ...params,
            materialType:3
        }
    })
      .then((data)=>{
          const res=data.data.data;
      if(res&&res.list){
        this.pagination.total=res.total;//切换页的时候会用到
        this.pagination.current=res.pageNum;
        for(var i=1;i<=res.list.length;i++){
            res.list[i-1]['index']=(res.pages-1)*10+i;
            res.list[i-1]['quantity']=1;
        }//使序号从1开始
        this.setState({
            dataSource:res.list,
            pageChangeFlag:0,
            searchContent:''
        });
      }
          
      });
    
    }
    searchContentChange(e){
        const  value=e.target.value;//此处显示的是我搜索框填的内容
         this.setState({searchContent:value});
    }
    searchEvent(){
      const materialName=this.state.searchContent;
     //console.log(name);//此处显示的是我搜索框填的内容
     axios({
        url:`${this.url.enterStorage.enterStorage}`,
        method:'get',
        headers:{
               'Authorization':this.url.Authorization
        },
        params:{
           materialName:materialName,
           materialType:3
        }

     })
     .then((data)=>{
        const res =data.data.data;
       if(res&&res.list){
        this.pagination.total=res.total?res.total:0;
        this.pagination.current=res.pageNum;
        for(var i=1;i<=res.list.length;i++){
            res.list[i-1]['index']=(res.pages-1)*10+i;
            res.list[i-1]['quantity']=res.pageNum;
        }
        this.setState({
            dataSource:res.list,
            pageChangeFlag:1,
        });
       }
     })
     .catch(()=>{
         message.info('搜索失败，请联系管理员！');
     });
     
    }
    render(){
       this.url=JSON.parse(localStorage.getItem('url'));
        return(
            <div style={{padding:'0 15px'}}>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入成品名称'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                        fetch={this.fetch}
                        type={this.props.type}
                    >
                    </SearchCell>
                </span>
                <div className='clear'  ></div>
                <Table
                rowKey={record=>record.index}
                columns={this.columns}
                dataSource={this.state.dataSource}
                pagination={this.pagination}
                onChange={this.handleTableChange}
                bordered
                size='small'
                scroll={{y:400}}
                ></Table>
            </div>
        );
    }
}
export default ProductInStorage;