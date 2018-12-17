//入库管理的原材料入库
import React,{Component} from 'react';
import {Table,message} from 'antd';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios';


class RowMaterialStorage extends Component{
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
             pagination:[],
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
           title:'原材料名称',
           dataIndex:'repoBaseSerialNumber.materialName',
           key:'repoBaseSerialNumber.materialName',
           width:'20%',
           align:'center'
        },{
           title:'编号',
           dataIndex:'repoBaseSerialNumber.serialNumber',
           key:'repoBaseSerialNumber.serialNumber',
           width:'10%',
           align:'center'
        },{
           title:'数量',
           dataIndex:'repoInRecord.quantity',
           key:'repoInRecord.quantity',
           width:'10%',
           align:'center'
        },{
           title:'重量',
           dataIndex:'repoInRecord.weight',
           key:'repoInRecord.weight',
           width:'10%',
           align:'center'
        },{
           title:'入库时间',
           dataIndex:'repoInRecord.createTime',
           key:'repoInRecord.createTime',
           width:'20%',
           align:'center'
        },{
           title:'入库人',
           dataIndex:'repoInRecord.createPerson',
           key:'repoInRecord.createPerson',
           width:'10%',
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
        this.fetch({
            size:pagination.pageSize,//每页条目数
            page:pagination.current,//当前是第几页
          
        });
    }

    fetch=(params={})=>{
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
           // console.log(res.list);
           // console.log(res.list[0].repoInRecord);
            this.pagination.total=res.total;
            for(var i=1;i<=res.list.length;i++){
                 res.list[i-1]['index']=(res.pages-1)*10+i;
            }
           
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
    //  console.log(this.pagination);
      axios({
         url:`${this.url.enterStorage.enterStorage}`,
         method:'get',
         headers:{
             'Authorization':this.url.Authorization
         },
         params:{
            //  size:this.pagination.pageSize,
            //  page:this.pagination.current,
             materialName:materialName,
             materialType:1
         },
        //type:'json'

      })
      .then((data)=>{
         //console.log(data.data);
         const res=data.data.data;
         this.pagination.total=res.total;
         for(var i=1;i<=res.list.length;i++){
               res.list[i-1]['index']=(res.pages-1)*10+i;
         }
         this.setState({
             dataSource:res.list
         });
      })
      .catch(()=>{
          message.info('搜索失败，请联系管理员！');
      });
    }
    render(){
      this.url=JSON.parse(localStorage.getItem('url'));
       this.Authorization=localStorage.getItem('Authorization');
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