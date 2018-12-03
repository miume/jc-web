import React from 'react';
// import axios from 'axios';
import BlockQuote from '../BlockQuote/blockquote'
import {Table,Popconfirm,Divider } from 'antd';
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
    // componentDidMount(){
    //     document.getElementById('/processInspection').style.color = '#0079FE'
    // }
    // componentWillMount(){
    //     this.setState = ()=>{
    //       return;
    //     }
    // }
    constructor(props){
        super(props);
        this.state = {
            dataSource : data,
            selectedRowKeys : [],     //存取所选中checkbox的ids
        }
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.cancle = this.cancle.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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
          dataIndex: 'id',
          key: 'id',
          width: '5%',
          align:'center',
        }, {
          title: '批号',
          dataIndex: 'batchNumber' ,
          key: 'batchNumber',
          width: '8%',
          align:'center',
        }, {
          title: '创建人',
          dataIndex: 'creatPerson',
          key:  'creatPerson.id',
          render:creatPerson => `${creatPerson.userName}`,
          width: '8%',
          align:'center',
        }, {
          title: '创建时间',
          dataIndex: 'creatTime',
          key: 'creatTime',
          width: '15%',
          align:'center',
        }, {
          title: '修改人',
          dataIndex: 'updatePerson',
          key: 'updatePerson.id',
          render:updatePerson => `${updatePerson.userName}`,
          width: '9%',
          align:'center',
        }, {
          title: '修改时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
          width: '15%',
          align:'center',
        }, {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          render: type => {
              switch(`${type}`) {
                case '1': return '制成检测数据';
                case '2': return '样品送检数据';
                case '3': return '样品报告单数据';
                default: return '';
              }
          },
          width: '10%',
          align:'center',
        }, {
          title: '状态',
          dataIndex: 'state',
          key:'state',
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
          width: '10%',
          align:'center',
        }, {
          title: '操作',
          dataIndex: 'operate',
          key:'operate',
          width: '15%',
          align:'center',
          render: (record) => {
              return (
                  <span>
                      <Detail value={record} />
                      <Divider type="vertical" />
                      <Editor value={record} />
                      <Divider type="vertical" />
                      <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.key)} okText="确定" cancelText="取消" >
                          <span className='blue'>删除</span>
                      </Popconfirm>
                  </span>
                  );
          }
        }];
    }
    /**批量删除弹出框确认函数 */
    deleteByIds() {
      // const ids = this.state.selectedRowKeys;
        // console.log(ids)
        // axios({
        //   url:`${this.server}/jc/auth/role/deleteByIds`,
        //   method:'Delete',
        //   headers:{
        //     'Authorization':this.Authorization
        //   },
        //   data:ids,
        //   type:'json'
        // }).then((data)=>{
        //   message.info(data.data.message);
        //   this.fetch();
        // }).catch(()=>{
        //   message.info('删除错误，请联系管理员！')
        // })
        
     }
    cancle() {

    }
   /**实现全选 */
   onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys:selectedRowKeys }); 
   } 
    /**处理单条记录删除 */
    handleDelete(key){
      const dataSource = this.state.dataSource;
      this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    /**返回数据录入页面 */
    returnDataEntry(){
      this.props.history.push({pathname:'/dataEntry'});
  }
    render() {
        this.server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem('Authorization');
        const rowSelection = {
          onChange:this.onSelectChange,
          onSelect() {},
          onSelectAll() {},
        };
        return (
            <div>
                <BlockQuote name='制程检测' menu='质量与流程' menu2='返回' returnDataEntry={this.returnDataEntry}/>
                <div style={{padding:'15px'}}>
                    <Add/>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} />
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell name='请输入批号'/>
                    </span>
                  <Table rowKey={record => record.id} rowSelection={rowSelection} columns={this.columns} dataSource={this.state.dataSource}  pagination={this.pagination} size="small" bordered  scroll={{ y: 400 }}/>
                </div> 
            </div>

        );
    }
}
export default ProcessInspection;