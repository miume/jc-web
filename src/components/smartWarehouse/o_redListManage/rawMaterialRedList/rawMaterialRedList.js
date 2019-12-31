import React,{Component} from 'react';
import {Table, Popconfirm, Divider, message, Spin} from 'antd';
import DeleteByIds from '../../../BlockQuote/deleteByIds';
import Add from './add';
import Edit from './edit';
import SearchCell from '../../../BlockQuote/search';
import Note from './note';
import axios from 'axios';
class RawMaterialRedList extends Component{
    url;
    componentDidMount(){
        this.fetch();
        this.getAllSerialNumber();
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
            loading: true
        };
        this.pagination = {
            total: this.state.dataSource.length,
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal:(total)=>`共${total}条记录`,//显示共几条记录
            pageSizeOptions: ['10','20','50','100']
          };
        this.columns=[{
          title:'序号',
          dataIndex:'index',
          key:'id',
          sorter:(a,b)=>a.index-b.index,
          align:'center',
          width:'5%'
        },{
            title:'物料编码',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
            align:'center',
            width:'20%',
            render:(text)=>{
                return(
                    <div title={text} className='text-decoration'>{text.split("-")[0]+'-'+text.split("-")[1]+'-'+text.split("-")[2]+'...'}</div>
                )
            }
        },{
            title:'物料名称',
            dataIndex:'repoBaseSerialNumber.materialName',
            key:'repoBaseSerialNumber.materialName',
            align:'center',
            width:'10%'
        },{
            title:'物料类型',
            dataIndex:'repoBaseSerialNumber.materialClass',
            key:'repoBaseSerialNumber.materialClass',
            render:(text,record)=>{
                // console.log(text);
                // console.log(record);
                let type=record.repoBaseSerialNumber.materialClass;
                switch(`${type}`){
                     case '1':return '原材料';
                     case '3':return '成品';
                     default:return '';
                }
            },
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
            width:'10%',
            render:(text)=>{
                if(text.length>10){//给元素设置title属性会在鼠标悬停时显示
                    return <div title={text} style={{textDecoration:'underline'}} >{text.substring(0,10)}</div>
                }
                else{
                    return text
                }
            }
        },{
            title:'审核状态',
            dataIndex:'commonBatchNumber.status',
            key:'commonBatchNumber.status',
            align:'center',
            width:'11%',
        //      render:(text,record)=>{

        //          let status=record.commonBatchNumber.status;
        //          console.log(status);
        //           switch(`${status}`){
        //                 case '-1': return '已保存未提交';
        //                 case '0': return '已提交未审核';
        //                 case '1': return '审核中';
        //                 case '2': return '已通过';
        //                 case '3': return '未通过';
        //                 default: return '';
        //     }
        //   }
        render:status=>{
            //console.log(status);
                 return this.status[status.toString()];
        }
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            align:'center',
            width:'16%',
            render:(text,record)=>{
                let editFlag=this.judgeStatus(record.commonBatchNumber.status);
                //console.log(editFlag);
               return(//onConfirm是点击确认时的事件回调
                   <span>
                        <Edit record={record}  editFlag={this.judgeStatus(record.commonBatchNumber.status)} fetch={this.fetch} process={this.state.processChildren} serialNumber={this.state.serialNumberChildren} flag={this.judgeOperation(this.operation,'UPDATE')}/>
                        {this.judgeOperation(this.operation,'UPDATE')?<Divider type='vertical' />:''}
                       <span  className={this.judgeOperation(this.operation,'DELETE')?'':'hide'}>
                       {editFlag ? (
                         <span>
                           <Popconfirm title='确定删除？' onConfirm={()=>this.handleDelete(record.repoRedTable.id)} okText='确定'cancelText='再想想'>
                           <span className='blue'>删除</span>
                           </Popconfirm>
                         </span>
                       ) : (
                         <span className='notClick' >删除</span>
                       )}
                     </span>
                     {this.judgeOperation(this.operation,'DELETE')?<Divider type='vertical' />:''}
                     <Note record={record}/>

                   </span>
               );
            }
        }];
        this.onSelectChange=this.onSelectChange.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.getAllSerialNumber=this.getAllSerialNumber.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.fetch = this.fetch.bind(this);
        this.deleteCancel=this.deleteCancel.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
    }
    judgeStatus=(record_status)=>{
         //console.log(record_status);
         switch(`${record_status}`){
            case '-1':return true   //'未申请'新增时点击了保存没有点送审
            case '0':return  false      //'待审核'
            case '1':return  false     // '审核中'
            case '2':return   false     //'已通过'
            case '3':return  true      //未通过，
            default:return false
        }
    }
    handleTableChange(pagination){
        //console.log(pagination);
        this.pagination=pagination;
          this.fetch({
              size:pagination.pageSize,//当前页显示的记录数
              page:pagination.current,//当前是第几页
              orderType:'desc'
          })
    }
    fetch=(params={})=>{
        const materialType=1;
        axios({
            url:`${this.url.redList.redList}/?materialType=${materialType}`,
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
            this.pagination.total=res.total?res.total:0;
            this.pagination.current=res.pageNumber;
            for(let i=1;i<=res.list.length;i++){
                res.list[i-1]['index']=res.prePage*10+i;
           }
          }
            this.setState({
                dataSource:res.list,
                searchContent:'',
                selectedRowKeys:[],
                loading: false
            });
        });
    }

    handleDelete(id){//处理单条记录删除
        axios({
           url:`${this.url.redList.redList1}/${id}`,
           method:'Delete',
           headers:{
               'Authorization':this.url.Authorization
           },
           data:id,
           type:'json'
        })
        .then((data)=>{
               message.info(data.data.message);
               //console.log(data.data.code);
               if(data.data.code===0){
                   if(this.pagination.total%10===1){//当前页只剩一条然后删除的话，此页没有数据，则会跳到其前一页
                         this.pagination.current=this.pagination.current-1;
                   }
                this.fetch({
                    size:this.pagination.pageSize,
                    page:this.pagination.current,
                    orderField:'id',
                    orderType:'desc'
                });
               }
        })
        .catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
    }
    onSelectChange(selectedRowKeys){//checkbox变化时调用的函数
        this.setState({selectedRowKeys:selectedRowKeys});
    }
      /**批量删除弹出框确认函数 */
      deleteByIds(){
        const ids=this.state.selectedRowKeys;
        axios({
             url:`${this.url.redList.redList}`,
             method:'Delete',
             headers:{
                'Authorization' :this.url.Authorization
             },
             data:ids,
             type:'json'
        })
        .then((data)=>{
           message.info(data.data.message);
           if(data.data.code===0){//操作成功返回0
            if(this.pagination.total%10===1){//当前页只剩一条然后删除的话，此页没有数据，则会跳到其前一页
                this.pagination.current=this.pagination.current-1;
          }
            this.fetch({//在其他页删除应该留在当前页
                size:this.pagination.pageSize,
                page:this.pagination.current,
                orderField:'id',
                orderType:'desc'
            });
           }
           else{
               this.setState({
                   selectedRowKeys:[]
               });
           }

        })
        .catch(()=>{
            message.info('删除失败，请联系管理员！');
        });
      }
     deleteCancel(){//批量删除点击取消的时候，checkbox的勾勾也要没，所以调用父组件的函数
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
      const serialNumber=this.state.searchContent;
      const materialType=1;
      axios({
          url:`${this.url.redList.search}?materialType=${materialType}`,
          method:'get',
          headers:{
              'Authorization':this.url.Authorization
          },
          params:{
            serialNumber:serialNumber
          }
      })
      .then((data)=>{
              const res=data.data.data;
            // console.log(res.total);

              if(res&&res.list){
                this.pagination.total=res?res.total:0;
                this.pagination.current=res.pageNumber;
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

    getAllSerialNumber(){//获取所有编号
        axios({
                url:`${this.url.serialNumber.serialNumber}`,
                method:'get',
                headers:{
                    'Authorization':this.url.Authorization
                },
                params:{
                    materialClass:1
                }

        }).then((data)=>{
            //console.log(data);
            const res=data.data.data;
            if(res){
                this.setState({
                    serialNumberChildren:res
                });
            }
        });
 }
 judgeOperation(operation,operationCode){
    var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
    return flag.length>0?true:false
}
    render(){
        this.url=JSON.parse(localStorage.getItem('url'));
        this.status=JSON.parse(localStorage.getItem('status'));
        const current=JSON.parse(localStorage.getItem('current'));
        //获取该菜单所有权限
      this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null
        const {selectedRowKeys}=this.state;
        const rowSelection={
            selectedRowKeys,
           onChange:this.onSelectChange,
           getCheckboxProps: record => ({
            disabled: record.commonBatchNumber.status === 0|| record.commonBatchNumber.status === 1|| record.commonBatchNumber.status === 2, // Column configuration not to be checked
          }),
    };
        return(
            <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                <Add   flag={this.judgeOperation(this.operation,'SAVE')}  fetch={this.fetch} process={this.state.processChildren} serialNumber={this.state.serialNumberChildren}/>
                <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.deleteCancel}  flag={this.judgeOperation(this.operation,'DELETE')}/>

                      <SearchCell name='请输入编号'
                      searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange}
                          fetch={this.fetch}
                          type={this.props.type}
                          flag={this.judgeOperation(this.operation,'QUERY')}
                    />

                <Table
                        rowKey={record => record.repoRedTable.id}
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                        rowSelection={rowSelection}
                        pagination={this.pagination}
                        onChange={this.handleTableChange}
                        bordered
                        size='small'
                    >
                </Table>
            </Spin>
        );
    }
}
export default RawMaterialRedList;