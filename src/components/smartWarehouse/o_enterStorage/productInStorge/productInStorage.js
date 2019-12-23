//入库管理的原材料入库
import React,{Component} from 'react';
import {Table, message, Spin} from 'antd';
import SearchCell from '../../../BlockQuote/search';
import axios from 'axios';

class ProductInStorage extends Component{
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
             pagination:[],
             pageChangeFlag:0,//1是搜索分页，0是getAllByPAge
             loading: true
         }
         this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            align:'center',
            width:'5%'
        },{
           title:'成品名称',
           dataIndex:'materialName',
           key:'materialName',
           align:'center',
           width:'8%',
        },{
            title:'物料编码',
            dataIndex:'itemCode',
            key:'itemCode',
            align:'center',
            width:'11%',
            render:(text)=>{
                return(
                    <div title={text} className='text-decoration'>{text.split("-")[0]+'...'}</div>
                )
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
             dataIndex:'workShop',
             key:'workShop',
             align:'center',
             width:'8%'
         },{
             title:'厂商',
             dataIndex:'manufacturer',
             key:'manufacturer',
             align:'center',
             width:'8%'
         },{
            title:'重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'6%'
         },{
           title:'数量',
           dataIndex:'quantity',
           key:'quantity',
           align:'center',
           width:'6%'
        },{
           title:'入库时间',
           dataIndex:'inTime',
           key:'inTime',
           align:'center',
           width:'9%',
           render:(text)=>{
             if(text&&text.length>10){
                return(<div title={text} className='text-decoration'>{text.substring(0,10)}</div>)
             }
             else{
                 return(<div>{text}</div>)
             }
           }
        },{
            title:'操作时间',
            dataIndex:'createTime',
            key:'createTime',
            align:'center',
            width:'9%',
            render:(text)=>{
               if(text&&text.length>10){
                    return(
                        <div title={text} className='text-decoration'>{text.substring(0,10)}</div>
                    )
               }
               else{
                   return(
                       <div className='text-decoration'>{text}</div>
                   )
               }
            }
         },{
           title:'入库人',
           dataIndex:'operator',
           key:'operator',
           align:'center',
           width:'7%'
        }];
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
      }
          this.setState({
              dataSource:res.list,
              pageChangeFlag:0,
              searchContent:'',
              loading: false
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
                res.list[i-1]['quantity']=1;
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
                    <SearchCell name='请输入成品名称'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                        fetch={this.fetch}
                        type={this.props.type}
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
export default ProductInStorage;