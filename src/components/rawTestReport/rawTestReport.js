import React from 'react';
import { Table, Popconfirm, Divider} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';
import Detail from './detail';
import RecordChecking from './recordChecking';
import './rawTestReport.css';

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
    constructor(props){
        super(props);
        this.state ={
            dataSource:data,
            selectedRowKeys : [],
            searchContent : ''
        }
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total) {
              return `共${total}条记录`
            } ,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
            },
            onChange(current) {
            }
          }
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
            width:'6%',
            render:state => {
                switch(`${state}`) {
                  case '1': return '审核中';
                  case '2': return '不通过';
                  case '3': return '已通过';
                  default: return '';
                }
            },
        },{
            title:'紧急',
            dataIndex:'isUrgent',
            key:'isUrgent',
            align:'center',
            width:'6%',
            render:isUrgent=>isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
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
                            <span className='blue'>删除</span>
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
        // const ids = this.state.selectedRowKeys;
    }
    /**搜索功能 */
    searchEvent(){

    }
    /**实现全选 */
   onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys:selectedRowKeys }); 
   } 
   /**返回数据录入页面 */
   returnDataEntry(){
    this.props.history.push({pathname:'/dataEntry'});
}
    render(){
        const rowSelection = {
            onChange:this.onSelectChange,
            onSelect() {},
            onSelectAll() {},
          };
        return (
            <div>
                <BlockQuote name='原料检测报告' menu='质量与流程' menu2='返回'  returnDataEntry={this.returnDataEntry}></BlockQuote>
                <div style={{padding:'15px'}}>
                    {/* <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={this.handleAdd} >新增</Button> */}
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds}/>
                    <span style={{float:'right',paddingBottom:'8px'}} >
                        <SearchCell name='请输入搜索内容' searchEvent={this.searchEvent} searchContent={this.searchContent}></SearchCell>
                    </span>
                <Table rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource} rowSelection={rowSelection} pagination={this.pagination} scroll={{y:400}} size='small' bordered/> 
                </div>
            </div>
        );
    }
}
export default RawTestReport;