import React,{Component} from 'react';
import {Table,Popconfirm,Divider,message} from 'antd';
import DeleteByIds from '../../BlockQuote/deleteByIds';
import Add from './padd';
import Edit from './pedit';
import Note from './note';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios';


class ProductRedList extends Component{
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
          width:'5%',
        },{
            title:'编号',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:'repoBaseSerialNumber.serialNumber',
            align:'center',
            width:'15%',
            render:(text,record)=>{
                  //console.log(text);
                  if(text.length>13){
                    return <div title={text} style={{textDecoration:'underline'}}>{text.substring(0,13)}</div>
                  }
                  else{
                      return text
                  }
                  
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
                     case '3':return '产品';
                     default:return '';
                }
            },
            align:'center',
            width:'10%'
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
            width:'13%',
            render:(text)=>{
                if(text.length>10){
                    return <div title={text} style={{textDecoration:'underline'}}>{text.substring(0,10)}</div>
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
        //           switch(`${status}`){
        //                 case '-1': return '已保存未提交';
        //                 case '0': return '已提交未审核';
        //                 case '1': return '审核中';
        //                 case '2': return '已通过';
        //                 case '3': return '未通过';
        //                 // case '4': return '合格';
        //                 // case '5': return '不合格';
        //                 default: return '';
        //     }
        //   }
        render:status=>{
            return this.status[status.toString()];
         }
        },{
            title:'操作',
            dataIndex:'repoRedTable.id',
            key:'repoRedTable.id',
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
                         <span className='notClick' >删除</span>
                       )}
                     </span>
                     <Divider type='vertical'/>
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
        this.deleteCancel=this.deleteCancel.bind(this);
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
             //console.log(res);
             this.pagination.total=res?res.total:0;
             this.pagination.current=res.pageNumber;//当前是第几页，点击重置时，分页显示的是第一页,pageNUm就是内容是第几页，就显示是第几页，0和1都代表第一页
             if(res&&res.list){
                
                for(let i=1;i<=res.list.length;i++){
                    res.list[i-1]['index']=res.prePage*10+i;
               }
               this.setState({
                dataSource:res.list,
                searchContent:''
                 });
              }
        });
    }
    onSelectChange(selectedRowKeys){
        this.setState({selectedRowKeys:selectedRowKeys});
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
           // console.log(data);
           message.info(data.data.message);
           if(data.data.code===0){
            this.fetch({
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
        this.setState({
            selectedRowKeys:[]
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
        const materialType=3;
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
              if(res&&res.list){
                this.pagination.total=res.total;
                this.pagination.current=res.pageNumber;
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

    getAllSerialNumber(){//获取所有编号
        axios({
                url:`${this.url.serialNumber.serialNumber}`,
                method:'get',
                headers:{
                    'Authorizaion':this.url.Authorizaion
                },
                params:{
                    materialClass:3
                }

        }).then((data)=>{
            const res=data.data.data;
            this.setState({
                serialNumberChildren:res
            });
        });
    }
    render(){
      this.url=JSON.parse(localStorage.getItem('url'));
      this.status=JSON.parse(localStorage.getItem('status'));
        const {selectedRowKeys}=this.state;
        const rowSelection={
            selectedRowKeys,
           onChange:this.onSelectChange,
           getCheckboxProps: record => ({
            disabled: record.commonBatchNumber.status === 0|| record.commonBatchNumber.status === 1|| record.commonBatchNumber.status === 2, // Column configuration not to be checked
          }),
    };
      //console.log(this.state.batchNumberChildren);
        return(
            <div style={{paddingLeft:'15px'}}>
                <Add    fetch={this.fetch} process={this.state.processChildren} serialNumber={this.state.serialNumberChildren}/>
                <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.deleteCancel}/>
                <span style={{float:'right',paddingBottom:'8px'}}>
                      <SearchCell name='请输入编号' 
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
                        scroll={{y:400}}
                    >
                
                </Table>
            </div>
        );
    }
}
export default ProductRedList; 