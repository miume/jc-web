//入库管理的原材料入库
import React,{Component} from 'react';
import {Table,message} from 'antd';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios';
class RowMaterialInventor extends Component{
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
             pageChangeFlag:0,//0表示getAllByPage分页  1 表示搜索分页
         }
         
         this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            width:'10%',
            align:'center'
        },{
           title:'物料名称',
           dataIndex:'materialName',
           key:'materialName',
           width:'18%',
           align:'center'
        },{
            title:'物料类型',
            dataIndex:'materialClass',
            key:'materialClass',
            width:'18%',
            align:'center',
            render:(text,record)=>{
                     //console.log(text);
                     switch(`${record.materialClass}`){
                              case '1':return '原材料';
                              case '3':return '产品';
                              default:return ''  
                     }
            }
        },{
           title:'编号',
           dataIndex:'serialNumber',
           key:'serialNumber',
           width:'20%',
           align:'center',
           render:(text)=>{
              if(text.length>24){
                  return(
                      <div title={text} className='text-decoration'>{text.substring(0,24)}</div>
                  )
              }
              else{
                 return(<div className='text-decoration'>{text}</div>)
              }
           }
        },{
           title:'重量',
           dataIndex:'weight',
           key:'weight',
           width:'18%',
           align:'center'
        },];
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
    handleTableChange=(pagination)=>{//页切换时调用
        //console.log(this.pagination);
         this.pagination=pagination;
         const {pageChangeFlag}=this.state;
         if(pageChangeFlag){
             this.searchEvent({
                 size:pagination.pageSize,//每页几条数据
                 page:pagination.current,//当前页是几
                 orderField: 'id',
                 orderType: 'desc',
             });
         }
         else{
            this.fetch({
                size:pagination.pageSize,//当前页显示了几条记录
                page:pagination.current,//当前是第几页
                orderField: 'id',
                orderType: 'desc',             
            });
         }
    }
    fetch=(params)=>{
        const materialClass=1;
        axios({
            url:`${this.url.inventorManage.inventorManage}?materialClass=${materialClass}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                ...params,
            },
        })
        .then((data)=>{
               //console.log(data.data.data);
               const res=data.data.data;
               if(res&&res.list){
                    this.pagination.total=res.total;
                    this.pagination.current=res.pageNum;
                    for(var i=1;i<=res.list.length;i++){
                        res.list[i-1]['index']=res.prePage*10+i;
                  }//使序号从1开始
                  this.setState({
                    dataSource:res.list,
                    searchContent:'',
                    pageChangeFlag:0
                });
            }
        });
    }

    searchContentChange(e){
       const  value=e.target.value;//此处显示的是我搜索框填的内容
         this.setState({searchContent:value});
    }
    searchEvent(params){
      const materialName=this.state.searchContent;
      const materialClass=1;
     //console.log(name);//此处显示的是我搜索框填的内容
     axios({
        url:`${this.url.inventorManage.inventorManage}?materialName=${materialName}&materialClass=${materialClass}`,
        method:'get',
        headers:{
            'Authorization':this.url.Authorization
        },
        params:params,
        type:'json'
     })
     .then((data)=>{
         const res=data.data.data;
         this.pagination.total=res.total?res.total:0;
         this.pagination.current=res.pageNum;
         if(res&&res.list){
          for(var i=1;i<=res.list.length;i++){
            res.list[i-1]['index']=res.prePage*10+i;
         }
         this.setState({
           dataSource:res.list,//list取到的是所有符合要求的数据
           pageChangeFlag:1
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
                    <SearchCell name='请输入物料名称'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                        type={this.props.type}
                        fetch={this.fetch}
                    >
                    </SearchCell>
                </span>
                <div className='clear'  ></div>
                <Table
                rowKey={record=>record.id}
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
export default  RowMaterialInventor;