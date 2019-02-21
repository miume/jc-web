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
            align:'center'
        },{
           title:'原材料名称',
           dataIndex:'repoBaseSerialNumber.materialName',
           key:'repoBaseSerialNumber.materialName',

           align:'center'
        },{
            title:'编号',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
   
            align:'center'
         },{
            title:'物料编码',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
   
            align:'center'
         },{
            title:'批次',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
   
            align:'center'
         },{
            title:'车间',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
   
            align:'center'
         },{
            title:'物料类别',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
   
            align:'center'
         },{
           title:'物料名称',
           dataIndex:'repoBaseSerialNumber.serialNumber',
           key:'repoBaseSerialNumber.serialNumber',
  
           align:'center'
        },{
            title:'袋号',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
   
            align:'center'
         },{
            title:'重量',
            dataIndex:'repoInRecord.weight',
            key:'repoInRecord.weight',

            align:'center'
         },{
            title:'厂商',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
   
            align:'center'
         },{
            title:'物料名称',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
   
            align:'center'
         },{
            title:'操作员',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
   
            align:'center'
         },{
           title:'数量',
           dataIndex:'repoInRecord.quantity',
           key:'repoInRecord.quantity',
 
           align:'center'
        },{
           title:'入库时间',
           dataIndex:'repoInRecord.createTime',
           key:'repoInRecord.createTime',
           
           align:'center'
        },{
           title:'入库人',
           dataIndex:'repoInRecord.createPerson',
           key:'repoInRecord.createPerson',

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
            //console.log(res);
            this.pagination.total=res.total;
            this.pagination.current=res.pageNum;//当前在第几页
          if(res&&res.list){
            for(var i=1;i<=res.list.length;i++){
                res.list[i-1]['index']=res.prePage*10+i;
                res.list[i-1].repoInRecord.quantity=1;//将数量写死为1
           }
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
    //  console.log(this.pagination);
      axios({
         url:`${this.url.enterStorage.enterStorage}?materialName=${materialName}&materialType=${materialType}`,
         method:'get',
         headers:{
             'Authorization':this.url.Authorization
         },
         params:params
      })
      .then((data)=>{
         const res=data.data.data;
         this.pagination.total=res.total?res.total:0;
         this.pagination.current=res.pageNum;
       if(res){
        for(var i=1;i<=res.list.length;i++){
            res.list[i-1]['index']=(res.pages-1)*10+i;
        }
        this.setState({
            dataSource:res.list
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
                    <SearchCell name='请输入原材料名称'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                        fetch={this.fetch}
                        type={this.props.type}
                    >
                    </SearchCell>
                </span>
                <div className='clear'  ></div>
                <Table
                rowKey={record=>record.repoInRecord.id}
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
export default  RowMaterialStorage;