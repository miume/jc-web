//入库管理的原材料入库
import React,{Component} from 'react';
import {Table,message} from 'antd';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios';


class RowMaterialInventor extends Component{
    url;
    Authorization;
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
             Authorization:this.Authorization,
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
           align:'center'
        },{
           title:'数量',
           dataIndex:'quantity',
           key:'quantity',
           width:'18%',
           align:'center'
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
          this.fetch({
              size:pagination.pageSize,//当前页显示了几条记录
              page:pagination.current,//当前是第几页
             
          });
    }
    fetch=(params={})=>{
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
               this.pagination.total=res.total;
               console.log(res);
               //res.list是传过来的记录
              for(var i=1;i<=res.list.length;i++){
                   res.list[i-1]['index']=res.prePage*10+i;
              }//使序号从1开始
              this.setState({
                  dataSource:res.list
              });
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
        url:`${this.url.inventorManage.inventorManage}`,
        method:'get',
        headers:{
            'Authorization':this.url.Authorization
        },
        params:{
            materialName:materialName,
            materialClass:1
        }
     })
     .then((data)=>{
         const res=data.data.data;
         this.pagination.total=res.total?res.total:0;
         if(res&&res.list){
          for(var i=1;i<=res.list.length;i++){
            res.list[i-1]['index']=res.prePage*10+i;
         }
         this.setState({
           dataSource:res.list//list取到的是所有符合要求的数据
         });
         } 
     })
     .catch(()=>{
         message.info('搜索失败，请联系管理员！');
     });
    }
    render(){
        this.Authorization=localStorage.getItem('Authorization');
        this.url=JSON.parse(localStorage.getItem('url'));
        return(
            <div style={{padding:'0 15px'}}>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入货物名称'
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
                scroll={{y:600}}
                ></Table>
            </div>
        );
    }
}
export default  RowMaterialInventor;