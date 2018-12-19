import React from 'react';
import axios from 'axios';
import BlockQuote from '../BlockQuote/blockquote'
import {Table,Popconfirm,Divider,message } from 'antd';
import DeleteByIds from '../BlockQuote/deleteByIds';
import Add from './add';
import Detail from './detail';
import Editor from './editor';
import './editor.css';
import SearchCell from '../BlockQuote/search';
// const data = [];
// for(var i = 1; i<=15;i++){
//     data.push({
//         id : `${i}`,
//         operate:1,
//         batchNumber:'SDERER',
//         creatPerson:{
//             id:1,
//             userName:'张三'
//         },
//         creatTime:'2018-10-12 00:11:11',
//         updatePerson:{
//           id:1,
//           userName:'张三'
//       },
//         updateTime:'2018-10-18 00:11:11',
//         type:1,
//         state:1,
//         isUrgent:0
//         })
//   }

class ProcessInspection extends React.Component{
    url
    // server
    componentDidMount(){
        this.fetch();
        this.getAllProductionProcess();
    }
    componentWillUnmount(){
        this.setState = ()=>{
          return;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
            selectedRowKeys : [],     //存取所选中checkbox的ids
            searchContent:'',
            allProductionProcess:[],
            detailData:[]
        }
        this.fetch = this.fetch.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.cancle = this.cancle.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getAllProductionProcess = this.getAllProductionProcess.bind(this);
        this.pagination = {
          total: this.state.dataSource.length,
          showTotal(total) {
            return `共${total}条记录`
          } ,
          showSizeChanger: true,
          onShowSizeChange() {
          },
          onChange() {
          }
        }
        this.columns = [{
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          width: '8%',
          align:'center',
        }, {
          title: '批号',
          dataIndex: 'commonBatchNumber.batchNumber' ,
          key: 'commonBatchNumber.batchNumber',
          width: '15%',
          align:'center',
        }, {
          title: '创建人',
          dataIndex: 'createPersonName',
          key:  'createPersonName',
          width: '15%',
          align:'center',
        }, {
          title: '创建时间',
          dataIndex: 'commonBatchNumber.createTime',
          key: 'commonBatchNumber.createTime',
          width: '15%',
          align:'center',
         },{
          title:'紧急',
          dataIndex:'commonBatchNumber.isUrgent',
          key:'commonBatchNumber.isUrgent',
          align:'center',
          width:'10%',
          render:isUrgent=>!isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
      },
         //,{
        //   title: '类型',
        //   dataIndex: 'commonBatchNumber.dataType',
        //   key: 'commonBatchNumber.dataType',
        //   render: type => {
        //       switch(`${type}`) {
        //         case '1': return '流程管理数据';
        //         case '2': return '制成检测数据';
        //         case '3': return '样品检测数据';
        //         case '4': return '原材料出库申请数据';
        //         case '5': return '成品出库申请数据';
        //         case '6': return '红单申请数据';
        //         case '7': return '进货检验数据';
        //         case '8': return '成品检验数据';
        //         case '9': return '原材料检验数据';
        //         case '10': return '中间品检验数据';
        //         default: return '';
        //       }
        //   },
        //   width: '12%',
        //   align:'center',
        // }, 
        {
          title: '状态',
          dataIndex: 'commonBatchNumber.status',
          key:'commonBatchNumber.status',
          render: state => {
            switch(`${state}`) {
              case '-1': return '已保存未提交';
              case '0': return '已提交未未审核';
              case '1': return '审核中';
              case '2': return '审核通过';
              case '3': return '审核未通过';
              case '4': return '合格';
              case '5': return '不合格';
              default:return '';
            }
          },
          width: '15%',
          align:'center',
        }, {
          title: '操作',
          dataIndex: 'commonBatchNumber.id',
          key:'commonBatchNumber.id',
          align:'center',
          render: (text,record) => {
              const status = record.commonBatchNumber.status;
              return (
                  <span>
                      <Detail value={text} status={status} allProductionProcess={this.state.allProductionProcess} url={this.url} fetch={this.fetch}/>
                      <Divider type="vertical" />
                      <Editor value={text} status={status} url={this.url} fetch={this.fetch}/>
                      <Divider type="vertical" />
                      {
                        status === -1?
                          <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(text)} okText="确定" cancelText="取消" >
                              <span className='blue'>删除</span>
                          </Popconfirm>:<span className='notClick'>删除</span>
                      }
                  </span>
                  );
          }
        }];
    }
    /**table变化时 */
    handleTableChange(pagination){
        this.fetch({
            size:pagination.pageSize,
            page:pagination.current,
            personName:this.state.searchContent
        })
    }
    /**分页查询 getAllByPage */
    fetch(params){
        axios.get(`${this.url.procedure.getAllByPage}`,{
            headers:{
               'Authorization':this.url.Authorization
            },
            params:params,
        }).then((data)=>{
            const res = data.data.data;
            this.pagination.total = res?res.total:0;
            if(res&&res.list)
            {
              for(var i = 1; i <= res.list.length;i++){
                var e = res.list[i-1];
                e['index'] = res.prePage*10+i
            }
            this.setState({
                dataSource:res.list
            })
            }
            
        })
    }
    /**批量删除弹出框确认函数 */
    deleteByIds() {
      const ids = this.state.selectedRowKeys;
        // console.log(ids)
        axios({
          url:`${this.url.procedure.procedureTestRecord}`,
          method:'Delete',
          headers:{
            'Authorization':this.url.Authorization
          },
          data:ids,
          type:'json'
        }).then((data)=>{
          message.info(data.data.message);
          this.fetch();
        }).catch(()=>{
          message.info('删除错误，请联系管理员！')
        })
     }
    /**取消批量删除 */
    cancle() {
        this.setState({
            selectedRowKeys:[]
        })
    }
   /**实现全选 */
   onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys:selectedRowKeys }); 
   } 
    /**处理单条记录删除 */
    handleDelete(key){
      console.log(key)
      axios({
          url:`${this.url.procedure.procedureTestRecord}/${key}`,
          method:'Delete',
          headers:{
            'Authorization':this.url.Authorization
          }
      }).then((data)=>{
          message.info(data.data.message);
          this.fetch();
      }).catch(()=>{
          message.info('删除失败，请联系管理员！');
      })
    }
    /**返回数据录入页面 */
    returnDataEntry(){
      this.props.history.push({pathname:'/dataEntry'});
  }
  /**实时跟踪搜索框内容的变化 */
  searchContentChange(e){
    const value = e.target.value;
      this.setState({
          searchContent:value
      })
  }
  /**绑定搜索事件 */
  searchEvent(){
    //console.log(this.state.searchContent)
      this.fetch({
        personName:this.state.searchContent
      });
  }
  /**获取所有产品工序 */
  getAllProductionProcess(){
    axios({
      url:`${this.url.productionProcess.productionProcess}`,
      method:'get',
      headers:{
        'Authorization':this.url.Authorization
      }
    }).then(data=>{
      const res = data.data.data;
      this.setState({
        allProductionProcess : res
    })
  })  
  }
  /**通过id查询详情 */
//   getDetailData(value){
//     axios.get(`${this.server}/jc/common/procedureTestRecord/${value}`,{
//         headers:{
//             'Authorization':this.Authorization
//         }
//     }).then((data)=>{
      
//         const details = data.data.data.details;
//         this.setState({
//             detailData:details,
//         })
//     })
//     let self = this;   
//     let result
//     var interval = setInterval(function() {
//       console.log(self.state.detailData)
//       if(self.state.detailData !== undefined) {
//         result = self.state.detailData
//         console.log(result)
//         clearInterval(interval);
//       }
//     }, 300)  
// }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.server = localStorage.getItem('remote');
        const {selectedRowKeys} = this.state; 
        const rowSelection = {
          selectedRowKeys,
          onChange:this.onSelectChange,
        };
        const current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <BlockQuote  name='制程检测' menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding:'15px'}}>
                    <Add server={this.server} url={this.url} fetch={this.fetch}  />&nbsp;&nbsp;&nbsp;
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancle}/>
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell name='请输入批号' searchContentChange={this.searchContentChange} searchEvent={this.searchEvent} fetch={this.fetch}/>
                    </span>
                  <Table rowKey={record => record.index} rowSelection={rowSelection} columns={this.columns} dataSource={this.state.dataSource}  pagination={this.pagination} onChange={this.handleTableChange} size="small" bordered  scroll={{ y: 400 }}/>
                </div> 
            </div>

        );
    }
}
export default ProcessInspection;