import React from 'react';
import { Table, Popconfirm, Divider} from 'antd';
import BlockQuote from '../dataEntry/blockQuote';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';
import Detail from './detail';
import RecordChecking from './recordChecking';

// const data = [{
//     id:1,
//     date:'2018-11-11 11:11:11',
//     user:'张三',
//     factory:'鹅厂',
//     batchNumber:'YYYYH',
//     textItem:'ca',
//     notes:'ccc',
//     type:0,
//     receiveState:0,
//     feedback:'sss',
//     state:0,
//     isUrgent:'紧急'
// }]
const data = [];
for(var i = 1; i <= 20;i++){
    data.push({
        id:i,
        date:'2018-11-11 11:11:11',
        user:'张三',
        factory:'鹅厂',
        batchNumber:'YYYYH',
        textItem:'ca',
        notes:'ccc',
        type:0,
        receiveState:0,
        feedback:'sss',
        state:0,
        isUrgent:'紧急'
    })
}
class RawTestReport extends React.Component{
    componentDidMount(){
        document.getElementById('/rawTestReport').style.color = '#0079FE'
    }
    constructor(props){
        super(props);
        this.state ={
            selectedRowKeys : [],
            searchContent : ''
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.lastStep = this.lastStep.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'id',
            key:'id',
            align:'center',
            width:'3.5%'
        },{
            title:'送样日期',
            dataIndex:'date',
            key:'date',
            align:'center',
            width:'14%'
        },{
            title:'送样人',
            dataIndex:'user',
            key:'user',
            align:'center',
            width:'7%'
        },{
            title:'送样工厂',
            dataIndex:'factory',
            key:'factory',
            align:'center',
            width:'7%'
        },{
            title:'批号',
            dataIndex:'batchNumber',
            key:'batchNumber',
            align:'center',
            width:'7%'
        },{
            title:'检测项目',
            dataIndex:'textItem',
            key:'textItem',
            align:'center',
            width:'8%'
        },{
            title:'异常备注',
            dataIndex:'notes',
            key:'notes',
            align:'center',
            width:'7%'
        },{
            title:'类型',
            dataIndex:'type',
            key:'type',
            align:'center',
            width:'6%'
        },{
            title:'接受状态',
            dataIndex:'receiveState',
            key:'receiveState',
            align:'center',
            width:'6%'
        },{
            title:'接受反馈',
            dataIndex:'feedback',
            key:'feedback',
            align:'center',
            width:'6%'
        },{
            title:'审核状态',
            dataIndex:'state',
            key:'state',
            align:'center',
            width:'6%'
        },{
            title:'紧急',
            dataIndex:'isUrgent',
            key:'isUrgent',
            align:'center',
            width:'6%'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            align:'center',
            render:(text,record)=>{
                return (
                    <span>
                        <Detail value={record} />
                        <Divider type='vertical' />
                        <Popconfirm title='确定删除？' onConfirm={()=>this.handleDelete(record.id)} okText='确定' cancelText='取消' >
                            <a href='#'>删除</a>
                        </Popconfirm>
                        <Divider type='vertical' />
                        <RecordChecking value={record} />
                    </span>
                );
            }
        },]
    }
    /**button新增 */
    handleAdd(){

    }
    /**删除一条记录 */
    handleDelete(key){
    
    }
    /**批量删除 */
    deleteByIds(){

    }
    /**搜索功能 */
    searchEvent(){

    }
    /**实现上一步，返回数据录入页面 */
    lastStep(){
        this.props.history.push({pathname:'dataEntry'});
    }
    /**实现全选 */
   onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys:selectedRowKeys }); 
   } 
    render(){
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
        return (
            <div>
                <BlockQuote name='原料检测报告' menu='质量与流程' menu2='数据录入'></BlockQuote>
                <div style={{padding:'15px'}}>
                    {/* <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={this.handleAdd} >新增</Button> */}
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} />
                    <span style={{float:'right',paddingBottom:'8px'}} >
                        <SearchCell name='请输入什么什么' searchEvent={this.searchEvent} searchContent={this.searchContent}></SearchCell>
                    </span>
                <Table rowKey={record=>record.id} columns={this.columns} dataSource={data} rowSelection={rowSelection} pagination={pagination} scroll={{y:400}} size='small' bordered/> 
                <div style={{marginLeft:'90%', marginTop:'29%',marginRight:'80px',height:'50px',position:'absolute'}} >
                    <button style={{backgroundColor:'#30c7f5',width:'100px',height:'40px'}} onClick={this.lastStep}>上一步</button>
                </div> 
                </div>
            </div>
        );
    }
}
export default RawTestReport;