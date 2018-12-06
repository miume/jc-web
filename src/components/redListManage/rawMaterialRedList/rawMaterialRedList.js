import React,{Component} from 'react';
import {Table,Popconfirm,Divider} from 'antd';
import DeleteByIds from '../../BlockQuote/deleteByIds';
import RawMaterialRedListAddModal from './redListAddModal';
import RawMaterialRedListEditModal from './rawMaterialRedListEdit';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios';

const data=[];
for(let i=0;i<20;i++){
  data.push({
      //index:i,
      id:i+1,//序号
      lotNumber:'EcT/300',//批号
      name:'钴锰矿',//货品名称
      model:'钴锰矿一号',//货品型号
      number:'5袋',//损失数量
      weight:'10千克',//损失重量
      person:'周月',//申请人
      date:'2018年11月29日',//申请日期
      status:'已通过',//审核状态
  });
}
data.push({
    //index:i,
    id:21,//序号
    lotNumber:'EcT/300',//批号
    name:'钴锰矿',//货品名称
    model:'钴锰矿一号',//货品型号
    number:'5袋',//损失数量
    weight:'10千克',//损失重量
    person:'周月',//申请人
    date:'2018年11月29日',//申请日期
    status:'未申请',//审核状态
});
class RawMaterialRedList extends Component{
    server;
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
            dataSource:data,
            selectedRowKeys:[],
            searchContent:'',
            Authorization:this.Authorization,
        };
        this.pagination={
            total:this.state.dataSource.length,
            showTotal:(total)=>`共${total}条记录`,
            showSizeChanger:true,
        }
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.columns=[{
          title:'序号',
          dataIndex:'id',
          key:'id',
          sorter:(a,b)=>a.id-b.id,
          align:'center',
          width:'6%'
        },{
            title:'编号',
            dataIndex:'lotNumber',
            key:'lotNumber',
            align:'center',
            width:'10%'
        },{
            title:'货品名称',
            dataIndex:'name',
            key:'name',
            align:'center',
            width:'10%'
        },{
            title:'货品型号',
            dataIndex:'model',
            key:'model',
            align:'center',
            width:'10%'
        },{
            title:'损失数量',
            dataIndex:'number',
            key:'number',
            align:'center',
            width:'10%'
        },{
            title:'损失重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'10%'
        },{
            title:'申请人',
            dataIndex:'person',
            key:'person',
            align:'center',
            width:'10%'
        },{
            title:'申请日期',
            dataIndex:'date',
            key:'date',
            align:'center',
            width:'13%'
        },{
            title:'审核状态',
            dataIndex:'status',
            key:'status',
            align:'center',
            width:'8%',
            // render:(status)=>{
            //       switch(`${status}`){
            //         case '1':return '审核中'
            //         case '2':return '待审核'
            //         case '3':return '已通过'
            //         case '4':return '未通过'
                     //case '5':return '未申请'
                     //case '5':return '合格'
                     //case '5':return '不合格'
            //       }
            // }
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            align:'center',
            render:(text,record)=>{
               // console.log(record.status);
                let editFlag=this.judgeStatus(record.status);
               return(//onConfirm是点击确认时的事件回调
                   <span>
                        <RawMaterialRedListEditModal editFlag={editFlag}/>
                        <Divider type='vertical'/>
                       <Popconfirm title='确定删除？' onConfirm={()=>this.handleDelete(record.id)} okText='确定'cancelText='取消'>
                       <span className={editFlag?'blue':'grey'}>删除</span>
                       </Popconfirm>
                      
                   </span>
               );
            }
        }];
        this.onSelectChange=this.onSelectChange.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }
    handleDelete(id){//处理单条记录删除
          const dataSource=this.state.dataSource;
          this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
    }
    onSelectChange(selectedRowKeys){
       this.setState({selectedRowKeys:selectedRowKeys});
    }
    judgeStatus(record_status){
         //console.log(record_status);
         switch(`${record_status}`){
            case '审核中':return false   //'审核中'
            case '待审核':return  false      //'待审核'
            case '已通过':return  false     // '已通过'
            case '未通过':return   true     //'未通过'
            case '未申请':return  true      //未申请，新增时点击了保存没有点送审
         }
    }

    handleTableChange=(pagination)=>{
          this.fetch={
              page:this.pagination.pageSize,//当前页显示的记录数
              size:this.pagination.current,//当前是第几页
             // orderField:,//
              orderType:'desc'//
          }
    }
    fetch=(params={})=>{
        axios({
            url:`${this.server}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                ...params
            },

        })
        .then((data)=>{
             console.log(data);
        });
    }
    searchEvent(){
       // const username=this.state.searchContent;
        //console.log(username);
        // axios({
        //   url:`${this.server}/jc/auth/user/getUserByNameByPage`,//${variable}是字符串模板，es6使用反引号``创建字符串
        //   method:'get',
        //   headers:{
        //     'Authorization':this.Authorization
        //   },
        //   params:{
        //     size:this.pagination.pageSize,
        //     page:this.pagination.current,
        //     name:username
        //   },
        // })
        // .then((data)=>{
         
        //   const res=data.data.data;
        //   this.pagination.total=res.total;
        //   for(var i=1;i<=res.list.length;i++){
        //      res.list[i-1]['index']=(res.pages-1)*10+i;
        //   }
        //   this.setState({
        //     dataSource:res.list//list取到的是所有符合要求的数据
        //   });
        // })
        // .catch(()=>{
        //  message.info('查询失败，请联系管理员！')
        // });
    }
    searchContentChange(e){
           const value=e.target.value;
           this.setState({searchContent:value});
    }
    render(){
        this.Authorization=localStorage.getItem('Authorization');
        this.server=localStorage.getItem('remote');
        const rowSelection={
         onChange:this.onSelectChange,
    };
      
        return(
            <div style={{padding:'15px'}}>
                <RawMaterialRedListAddModal />
                <DeleteByIds selectedRowKeys={this.state.selectedRowKeys}/>
                <span style={{float:'right',paddingBottom:'8px'}}>
                      <SearchCell name='请输入搜索内容' 
                      searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange} 
                        //   fetch={this.fetch}
                    />
                    </span>
                <Table
                        rowKey={record => record.id}
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                        rowSelection={rowSelection}
                        pagination={this.pagination}
                        bordered
                        size='small'
                        scroll={{y:400}}
                    >
                
                </Table>
            </div>
        );
    }
}
export default RawMaterialRedList; 