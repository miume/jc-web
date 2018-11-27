import React from 'react';
import axio from 'axios';
import BlockQuote from '../dataEntry/blockQuote'
import {Table,Popconfirm,Divider } from 'antd';
import '../Home/page.css';
import DeleteByIds from '../roleManagement/deleteByIds';
import Add from './add';
import Detail from './detail';
import Editor from './editor';
import SearchCell from '../BlockQuote/search';
const data = [
  {
    id : 1,
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
  },
  {
    id : 2,
    operate:2,
    batchNumber:'SDER',
    creatPerson:{
        id:1,
        userName:'李四'
    },
    creatTime:'2018-10-12 00:11:11',
    updatePerson:{
      id:1,
      userName:'张傻'
  },
    updateTime:'2018-10-18 00:11:11',
    type:2,
    state:2,
    isUrgent:0
  },
]
const server = localStorage.getItem('remote1');
const server1 = localStorage.getItem('remote');
const Authorization = localStorage.getItem('Authorization');
class ProcessInspection extends React.Component{
    componentDidMount(){
        this.getAllProductLine();
        this.getAllProductionProcess();
        this.getAllSamplePoint();
        this.getAllTestItem();
        // this.getAllUser();
        document.getElementById('/processInspection').style.color = '#0079FE'
    }
    componentWillMount(){
        this.setState = (state,callback)=>{
          return;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource : data,
            selectedRowKeys : [],     //存取所选中checkbox的ids
            allProductLine : [],      //存取所有产品线
            allProductionProcess : [],//存取所有产品工序
            allSamplePoint : [],      //存取所有取样点
            allTestItem : [],         //存取所有检测项目
            allUser : [],             //存取所有用户
        }
        this.deleteByIds = this.deleteByIds.bind(this);
        this.cancle = this.cancle.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.lastStep = this.lastStep.bind(this);
        this.getAllProductLine = this.getAllProductLine.bind(this);
        this.getAllSamplePoint = this.getAllSamplePoint.bind(this);
        this.getAllTestItem = this.getAllTestItem.bind(this);
        // this.getAllUser = this.getAllUser.bind(this);
        this.getAllProductionProcess = this.getAllProductionProcess.bind(this);
    }
    /**批量删除弹出框确认函数 */
    deleteByIds() {
      const ids = this.state.selectedRowKeys.toString();
      console.log(ids)
   }
    cancle() {

    }
   /**实现全选 */
   onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys:selectedRowKeys }); 
   } 
    /**处理单条记录删除 */
    handleDelete(key){
      const dataSource = this.state.dataSource;
      this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    /**返回数据录入的页面 */
    lastStep(){
      this.props.history.push({pathname:'dataEntry'})
    }
    /**获取所有产品线 */
    getAllProductLine(){
        axio({
          url:`${server}/jc/productLine/getAll`,
          method:'get',
          headers:{
            'Authorization':Authorization
          }
        }).then(data=>{
          const res = data.data.data;
          this.setState({
              allProductLine : res
          })
      })
    }
    /**获取所有产品工序 */
    getAllProductionProcess(){
      axio({
        url:`${server}/jc/productionProcess/getAll`,
        method:'get',
        headers:{
          'Authorization':Authorization
        }
      }).then(data=>{
        const res = data.data.data;
        this.setState({
          allProductionProcess : res
      })
    })   
    }
    /**获取所有取样点 */
    getAllSamplePoint(){
      axio({
        url:`${server}/jc/samplePoint/getAll`,
        method:'get',
        headers:{
          'Authorization':Authorization
        }
      }).then(data=>{
        const res = data.data.data;
        this.setState({
          samplePoint : res
      })
    })   
    }
    /**获取所有检测项目 */
    getAllTestItem(){
      axio({
        url:`${server}/jc/testItem/getAll`,
        method:'get',
        headers:{
          'Authorization':Authorization
        }
      }).then(data=>{
        const res = data.data.data;
        this.setState({
          allTestItem : res
      })
    })   
    }
    /**获取所有用户 */
    getAllTestItem(){
      axio({
        url:`${server1}/jc/user/getAll`,
        method:'get',
        headers:{
          'Authorization':Authorization
        }
      }).then(data=>{
        const res = data.data.data;
        this.setState({
          allUser : res
      })
    })   
    }
    render() {
        const rowSelection = {
          onChange:this.onSelectChange,
          onSelect() {},
          onSelectAll() {},
        };
        const pagination = {
            total: data.length,
            showSizeChange(current,pageSize) {
            },
            onChange(current) {}
        };
        const columns = [{
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
          render: (text,record) => {
              return (
                  <span>
                      <Detail value={record} />
                      <Divider type="vertical" />
                      <Editor value={record} />
                      <Divider type="vertical" />
                      <Popconfirm title="确定删除?" onConfirm={()=>this.handleDelete(record.key)} okText="确定" cancelText="取消" >
                          <a href="#">删除</a>
                      </Popconfirm>
                  </span>
                  );
          }
        }];
        return (
            <div>
                <BlockQuote name='制程检测' menu='质量与流程' menu2='数据录入' returnDataEntry={this.returnDataEntry}/>
                <div style={{padding:'15px'}}>
                    <Add />
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} />
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell name='请输入批号'/>
                    </span>
                  <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns} dataSource={this.state.dataSource}  pagination={pagination} size="small" bordered  scroll={{ y: 400 }}/>
                  <div style={{marginLeft:'90%', marginTop:'29%',marginRight:'80px',height:'50px',position:'absolute'}} >
                  <button style={{backgroundColor:'#30c7f5',width:'100px',height:'40px'}} onClick={this.lastStep}>上一步</button>
                </div> 
                </div> 
            </div>

        );
    }
}
export default ProcessInspection;