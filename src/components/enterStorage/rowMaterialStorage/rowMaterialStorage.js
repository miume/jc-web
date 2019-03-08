//入库管理的原材料入库
import React,{Component} from 'react';
import {Table,message} from 'antd';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios';

class RowMaterialStorage extends Component{
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
             pageChangeFlag:0,
         }
         
         this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=>a.index-b.index,
            align:'center',
            width:'5%'
        },{
           title:'原材料名称',
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
            render:(text,record)=>{
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
           render:(text,record)=>{
              // console.log(text);
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
    
    handleTableChange=(pagination)=>{//当点击第二页，第三页的时候，调用
       //console.log(pagination);
       const {pageChangeFlag}=this.state;
       if(pageChangeFlag){//用于区分点击分页时是搜索分页哈市getAllByPage分页,搜索符合要求的可能有很多页，这时也要分页，
        this.searchEvent({
            size:pagination.pageSize,//每页几条数据
            page:pagination.current,//当前页是几
            orderField: 'id',
            orderType: 'desc',
        });
       }
       else{
        this.fetch({
            size:pagination.pageSize,//每页条目数
            page:pagination.current,//当前是第几页
            orderField: 'id',
            orderType: 'desc', 
        });
       }
    }
    fetch=(params)=>{
        //console.log(params)//空
        axios({
            url:`${this.url.enterStorage.enterStorage}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params: {
                ...params,
                materialType:1
            }
        })
        .then((data)=>{
            const res=data.data.data;
          // console.log(res);
          if(res&&res.list){
            this.pagination.total=res.total;
            this.pagination.current=res.pageNum;//当前在第几页
            for(var i=1;i<=res.list.length;i++){
                res.list[i-1]['index']=res.prePage*10+i;
                res.list[i-1]['quantity']=1;
           }
           //console.log(res.list);
           this.setState({
               dataSource:res.list,
               pageChangeFlag:1
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
      const materialType=1;
      axios({
         url:`${this.url.enterStorage.enterStorage}?materialName=${materialName}&materialType=${materialType}`,
         method:'get',
         headers:{
             'Authorization':this.url.Authorization
         },
         params:{
             size:this.pagination.pageSize,
         }
      })
      .then((data)=>{
         const res=data.data.data;
       if(res&&res.list){
            this.pagination.total=res.total;
            this.pagination.current=res.pageNum;
            for(var i=1;i<=res.list.length;i++){
                res.list[i-1]['index']=(res.pages-1)*10+i;
                res.list[i-1]['quantity']=1;
            }
            this.setState({
                dataSource:res.list,
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
                
                    <SearchCell name='请输入原材料名称'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                        fetch={this.fetch}
                        type={this.props.type}
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
                scroll={{y:400}}
                ></Table>
            </div>
        );
    }
}
export default  RowMaterialStorage;