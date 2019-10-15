//入库管理的原材料入库
import React,{Component} from 'react';
import {Table, message, Spin} from 'antd';
import SearchCell from '../../../BlockQuote/search';
import axios from 'axios';
class RowMaterialInventor extends Component{
    url;
    operation;
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
             loading: true
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
           width:'10%',
           align:'center'
        },{
            title:'物料类型',
            dataIndex:'materialClass',
            key:'materialClass',
            width:'10%',
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
           title:'物料编码',
           dataIndex:'serialNumber',
           key:'serialNumber',
           width:'35%',
           align:'center',
        //    render:(text)=>{
        //     return(
        //         <div title={text} className='text-decoration'>{text.split("-")[0]+'-'+text.split("-")[1]+'-'+text.split("-")[2]+'...'}</div>
        //     )
        //    }
        },{
           title:'重量',
           dataIndex:'weight',
           key:'weight',
           width:'10%',
           align:'center'
        },];
        this.pagination={
            total:this.state.dataSource.length,
            showTotal:(total)=>`共${total}条记录`,//显示共几条记录
            showSizeChanger: true,
            pageSizeOptions: ['10','20','50','100']
        }
        this.handleTableChange=this.handleTableChange.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
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
               const res=data.data.data;
               if(res&&res.list){
                    this.pagination.total=res.total;
                    this.pagination.current=res.pageNum;
                    for(var i=1;i<=res.list.length;i++){
                        res.list[i-1]['index']=res.prePage*10+i;
                  }//使序号从1开始
            }
            this.setState({
                dataSource:res.list,
                searchContent:'',
                pageChangeFlag:0,
                loading: false
            });
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
    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
    }
    render(){
        this.url=JSON.parse(localStorage.getItem('url'));
        const current=JSON.parse(localStorage.getItem('current'));
        //获取该菜单所有权限
      this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null
        return(
            <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <SearchCell name='请输入物料名称'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                        type={this.props.type}
                        fetch={this.fetch}
                        flag={this.judgeOperation(this.operation,'QUERY')}
                    >
                    </SearchCell>

                <div className='clear'  ></div>
                <Table
                rowKey={record=>record.id}
                columns={this.columns}
                dataSource={this.state.dataSource}
                pagination={this.pagination}
                onChange={this.handleTableChange}
                bordered
                size='small'
                ></Table>
            </Spin>
        );
    }
}
export default  RowMaterialInventor;