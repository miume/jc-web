import React from 'react';
import axios from 'axios';
import BlockQuote from '../BlockQuote/blockquote'
import {Table,Popconfirm,Divider,message } from 'antd';
import '../Home/page.css';
import DeleteByIds from '../BlockQuote/deleteByIds';
import Add from './add';
import Detail from './detail';
import Editor from './editor';
import SearchCell from '../BlockQuote/search';
const data = [];
for(var i = 1; i<=15;i++){
    data.push({
        id : `${i}`,
        operate:1,
        batchNumber:'SDERER',
        creatPerson:{
            id:1,
            userName:'张三'
        },
        creatTime:'2018-10-12 00:11:11',
        updatePerson:{
          id:1,
          userName:'张三'
      },
        updateTime:'2018-10-18 00:11:11',
        type:1,
        state:1,
        isUrgent:0
        })
  }

class ProcessInspection extends React.Component{
    server
    Authorization
    componentDidMount(){
        this.fetch();
        
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
            searchContent:''
        }
        this.fetch = this.fetch.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.cancle = this.cancle.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
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
          width: '8%',
          align:'center',
        }, {
          title: '创建时间',
          dataIndex: 'commonBatchNumber.createTime',
          key: 'commonBatchNumber.createTime',
          width: '20%',
          align:'center',
        }, 
        // {
        //   title: '修改人',
        //   dataIndex: 'updatePerson',
        //   key: 'updatePerson',
        //   width: '8%',
        //   align:'center',
        // }, {
        //   title: '修改时间',
        //   dataIndex: 'updateTime',
        //   key: 'updateTime',
        //   width: '14%',
        //   align:'center',
        // }, 
        {
          title: '类型',
          dataIndex: 'commonBatchNumber.dataType',
          key: 'commonBatchNumber.dataType',
          render: type => {
              switch(`${type}`) {
                case '1': return '制成检测数据';
                case '2': return '样品送检数据';
                case '3': return '样品报告单数据';
                default: return '';
              }
          },
          width: '12%',
          align:'center',
        }, {
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
          width: '9%',
          align:'center',
        }, {
          title: '操作',
          dataIndex: 'commonBatchNumber.id',
          key:'commonBatchNumber.id',
          align:'center',
          render: (text) => {
              return (
                  <span>
                      <Detail value={text} />
                      <Divider type="vertical" />
                      <Editor value={text} />
                      <Divider type="vertical" />
                      <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(text)} okText="确定" cancelText="取消" >
                          <span className='blue'>删除</span>
                      </Popconfirm>
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
        axios.get(`${this.server}/jc/common/procedureTestRecord/getAllByPage`,{
            headers:{
               'Authorization':this.Authorization
            },
            params:params,
        }).then((data)=>{
            const res = data.data.data;
            this.pagination.total = res.total;
            for(var i = 1; i <= res.list.length;i++){
                var e = res.list[i-1];
                e['index'] = res.prePage*10+i
            }
            this.setState({
                dataSource:res.list
            })
            // console.log(res.list)
        })
    }
    /**批量删除弹出框确认函数 */
    deleteByIds() {
      const ids = this.state.selectedRowKeys;
        // console.log(ids)
        axios({
          url:`${this.server}/jc/common/procedureTestRecord/deleteByBatchNumberIds
          `,
          method:'Delete',
          headers:{
            'Authorization':this.Authorization
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
      axios({
          url:`${this.server}/jc/common/role/procedureTestRecord/{${key}}`,
          method:'Delete',
          headers:{
            'Authorization':this.Authorization
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
    console.log(this.state.searchContent)
      this.fetch({
        personName:this.state.searchContent
      });
  }
    render() {
        this.server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem('Authorization');
        const {selectedRowKeys} = this.state; 
        const rowSelection = {
          selectedRowKeys,
          onChange:this.onSelectChange,
        };
        return (
            <div>
                <BlockQuote name='制程检测' menu='质量与流程' menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}/>
                <div style={{padding:'15px'}}>
                    <Add server={this.server} Authorization={this.Authorization} fetch={this.fetch} />&nbsp;&nbsp;&nbsp;
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