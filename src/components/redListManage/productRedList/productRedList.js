import React,{Component} from 'react';
import {Table,Popconfirm,Divider,message} from 'antd';
import DeleteByIds from '../../BlockQuote/deleteByIds';
import Add from './padd';
import Edit from './pedit';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios';


class ProductRedList extends Component{
    server;
    Authorization;
    componentDidMount(){
        this.fetch();
        this.getAllSerialNumber();
        this.getAllProcess();
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            selectedRowKeys:[],
            searchContent:'',
            processChildren:[],//送审流程（对应那个下拉框）
            serialNumberChildren:[],//编号下拉框
            Authorization:this.Authorization,
        };
        this.pagination={
            total:this.state.dataSource.length,
            showTotal:(total)=>`共${total}条记录`,
            showSizeChanger:true,
        }
        this.columns=[{
          title:'序号',
          dataIndex:'index',
          key:'index',
          sorter:(a,b)=>a.index-b.index,
          align:'center',
          width:'6%'
        },{
            title:'编号',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
            align:'center',
            width:'10%'
        },{
            title:'物料名称',
            dataIndex:'repoBaseSerialNumber.materialName',
            key:'repoBaseSerialNumber.materialName',
            align:'center',
            width:'8%'
        },{
            title:'物料类型',
            dataIndex:'repoBaseSerialNumber.materialClass',
            key:'repoBaseSerialNumber.materialClass',
            align:'center',
            width:'8%'
        },{
            title:'损失数量',
            dataIndex:'repoRedTable.quantityLoss',
            key:'repoRedTable.quantityLoss',
            align:'center',
            width:'8%'
        },{
            title:'损失重量',
            dataIndex:'repoRedTable.weightLoss',
            key:'repoRedTable.weightLoss',
            align:'center',
            width:'8%'
        },{
            title:'申请人',
            dataIndex:'createPersonName',
            key:'createPersonName',
            align:'center',
            width:'8%'
        },{
            title:'申请日期',
            dataIndex:'commonBatchNumber.createTime',
            key:'commonBatchNumber.createTime',
            align:'center',
            width:'11%'
        },{
            title:'审核状态',
            dataIndex:'commonBatchNumber.status',
            key:'commonBatchNumber.status',
            align:'center',
            width:'8%',
             render:(text,record)=>{
                 let status=record.commonBatchNumber.status;
                  switch(`${status}`){
                        case '-1': return '未申请';
                        case '0': return '待审核';
                        case '1': return '审核中';
                        case '2': return '已通过';
                        case '3': return '未通过';
                        // case '4': return '合格';
                        // case '5': return '不合格';
                        default: return '';
            }
          }
        },{
            title:'备注',
            dataIndex:'repoRedTable.note',
            key:'repoRedTable.note',
            align:'center',
            width:'10%'
        },
        {
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            align:'center',
            //width:'',
            render:(text,record)=>{
                //console.log(record.commonBatchNumber.status);
                let editFlag=this.judgeStatus(record.commonBatchNumber.status);
                //console.log(editFlag);
               return(//onConfirm是点击确认时的事件回调
                   <span>
                        <Edit record={record}  editFlag={this.judgeStatus(record.commonBatchNumber.status)} fetch={this.fetch} process={this.state.processChildren} serialNumber={this.state.serialNumberChildren}/>
                        <Divider type='vertical'/>
                       <span >
                       {editFlag ? (
                         <span>
                           <Popconfirm title='确定删除？' onConfirm={()=>this.handleDelete(record.repoRedTable.id)} okText='确定'cancelText='再想想'>
                           <span className='blue'>删除</span>
                           </Popconfirm>
                         </span>
                       ) : (
                         <span className='grey' >删除</span>
                       )}
                     </span>
                   </span>
               );
            }
        }];
        this.onSelectChange=this.onSelectChange.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.getAllProcess=this.getAllProcess.bind(this);
        this.getAllSerialNumber=this.getAllSerialNumber.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.cancel=this.cancel.bind(this);
        this.fetch = this.fetch.bind(this);
    }
   
  
    judgeStatus=(record_status)=>{
         //console.log(record_status);
         switch(`${record_status}`){
            case '-1':return true   //'未申请'
            case '0':return  false      //'待审核'
            case '1':return  false     // '审核中'
            case '2':return   true     //'已通过'
            case '3':return  true      //未通过，新增时点击了保存没有点送审
            default:return false
        }
    }

    handleTableChange(pagination){
          this.fetch({
              size:pagination.pageSize,//当前页显示的记录数
              page:pagination.current,//当前是第几页
            
          })
    }
    fetch=(params={})=>{
        const materialType=3;
        axios({
            url:`${this.server}/jc/common/repoRedTables/?materialType=${materialType}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                ...params,
               
            },

        })
        .then((data)=>{
            // console.log(data);
             const res=data.data.data;
            
             if(res&&res.list){
                this.pagination.total=res.total;
                for(let i=1;i<=res.list.length;i++){
                    res.list[i-1]['index']=res.prePage*10+i;
               }
               this.setState({
                dataSource:res.list
                 });
              }
        });
    }
    onSelectChange(selectedRowKeys){
        this.setState({selectedRowKeys:selectedRowKeys});
     }
    
    handleDelete(id){//处理单条记录删除
        //   const dataSource=this.state.dataSource;
        //   this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
        axios({
           url:`${this.server}/jc/common/repoRedTable/${id}`,
           method:'Delete',
           headers:{
               'Authorization':this.Authorization
           },
           data:id,
           type:'json'
        })
        .then((data)=>{
            
               message.info(data.data.message);
               this.fetch();
        })
        .catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }
      /**批量删除弹出框确认函数 */
      deleteByIds(){
        const ids=this.state.selectedRowKeys;
        axios({
             url:`${this.server}/jc/common/repoRedTables`,
             method:'Delete',
             headers:{
                'Authorization' :this.Authorization
             },
             data:ids,
             type:'json'
        })
        .then((data)=>{
           // console.log(data);
           message.info(data.data.message);
           this.fetch();
        })
        .catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
        this.setState({
            selectedRowKeys:[]
        });
      }
     cancel(){//批量删除点击取消的时候，checkbox的勾勾也要没，所以调用父组件的函数
       this.setState({
           selectedRowKeys:[]
       });
     }

       //监控搜索框的输入变化
    searchContentChange(e){
        //console.log(e.target.value);
          const value=e.target.value;//搜索框输入的内容
          this.setState({
                 searchContent:value
          });
    }
    //根据名称进行搜索
    searchEvent(){
      const anyField=this.state.searchContent;
      axios({
          url:`${this.server}/jc/common/repoRedTable/getByAnyFiledLikeByPage`,
          method:'get',
          headers:{
              'Authorization':this.Authorization
          },
          params:{
            materialType:3,
            anyField:anyField

          }
      })
      .then((data)=>{
         // console.log(data);
              const res=data.data.data;
              
              if(res&&res.list){
                this.pagination.totlal=res.total;
                for(let i=1;i<=res.list.length;i++){
                    res.list[i-1]['index']=res.prePage*10+i;
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
  
    getAllProcess(){
        axios({
            url:`${this.server}/jc/common/batchAuditTask/validTasks`,
            method:'get',
            headers:{
                'Authorizaion':this.Authorizaion
            },

        })
        .then((data)=>{
            //console.log(data);
             const res=data.data.data;
             //  console.log(res);
              this.setState({
                  processChildren:res
              });
        });
 }
 getAllSerialNumber(){//获取所有编号
      axios({
            url:`${this.server}/jc/common/repoBaseSerialNumber`,
            method:'get',
            headers:{
                'Authorizaion':this.Authorizaion
            },
            params:{
                materialClass:3
            }

      }).then((data)=>{
         //console.log(data);
         const res=data.data.data;
         this.setState({
             serialNumberChildren:res
         });
      });
 }
    render(){
        this.Authorization=localStorage.getItem('Authorization');
        this.server=localStorage.getItem('remote');
        const {selectedRowKeys}=this.state;
        const rowSelection={
            selectedRowKeys,
           onChange:this.onSelectChange,
    };
      //console.log(this.state.batchNumberChildren);
        return(
            <div style={{padding:'15px'}}>
                <Add    fetch={this.fetch} process={this.state.processChildren} serialNumber={this.state.serialNumberChildren}/>
                <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} />
                <span style={{float:'right',paddingBottom:'8px'}}>
                      <SearchCell name='请输入搜索内容' 
                      searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange} 
                          fetch={this.fetch}
                          type={this.props.type}
                    />
                    </span>
                <Table
                        rowKey={record => record.repoRedTable.id}
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                        rowSelection={rowSelection}
                        pagination={this.pagination}
                        onChange={this.handleTableChange}
                        bordered
                        size='small'
                        scroll={{y:400,x:800}}
                    >
                
                </Table>
            </div>
        );
    }
}
export default ProductRedList; 