import React from 'react';
import { Table, Popconfirm, Divider} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
import DeleteByIds from '../BlockQuote/deleteByIds';
import SearchCell from '../BlockQuote/search';
import Detail from './detail';
import RecordChecking from './recordChecking';
import './rawTestReport.css';
import axios from 'axios';

// const data = [];
// for(var i = 1; i <= 20;i++){
//     data.push({
//         id:i,
//         date:'2018-11-11 11:11:11',
//         user:'张三',
//         factory:'鹅厂',
//         batchNumber:'YYYYH',
//         textItem:'ca',
//         notes:'ccc',
//         type:0,
//         receiveState:0,
//         feedback:'sss',
//         state:0,
//         isUrgent:'紧急'
//     })
// }
class RawTestReport extends React.Component{
    server
    Authorization
    componentDidMount(){
        this.fetch();
    }
    componentWillUnmount(){
        this.setState = () => {
            return ;
          }
    }
    constructor(props){
        super(props);
        this.state ={
            dataSource:[],
            selectedRowKeys : [],
            searchContent : ''
        }
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.deleteByIds = this.deleteByIds.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.fetch = this.fetch.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total) {
              return `共${total}条记录`
            } ,
          }
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=> a.index-b.index,
            align:'center',
            width:'5%'
        },{
            title:'送样日期',
            dataIndex:'sampleDeliveringDate',
            key:'sampleDeliveringDate',
            align:'center',
            width:'13%'
        },{
            title:'送样人',
            dataIndex:'deliverer',
            key:'deliverer',
            align:'center',
            width:'6%'
        },{
            title:'送样工厂',
            dataIndex:'deliveryFactory.id',
            key:'deliveryFactory.id',
            align:'center',
            width:'6%'
        },{
            title:'批号',
            dataIndex:'batchNumber',
            key:'batchNumber',
            align:'center',
            width:'13%'
        },{
            title:'检测项目',
            dataIndex:'testItemString',
            key:'testItemString',
            align:'center',
            width:'6%',
            render:(text)=>{ 
                const items = text.split(',');
                var testItems = '';
                if(items.length>3){
                    testItems = items[0]+','+items[1]+','+items[2]+','+items[3]+'...';
                    return <abbr title={text}>{testItems}</abbr>;
                }else{
                  testItems = text;
                  return text;
                }
               },
        },{
            title:'异常备注',
            dataIndex:'exceptionComment',
            key:'exceptionComment',
            align:'center',
            width:'6%'
        },{
            title:'类型',
            dataIndex:'type',
            key:'type',
            align:'center',
            width:'6%'
        },{
            title:'接受状态',
            dataIndex:'acceptStatus',
            key:'acceptStatus',
            align:'center',
            width:'6%'
        },{
            title:'接受反馈',
            dataIndex:'handleComment',
            key:'handleComment',
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
            dataIndex:'id',
            key:'id',
            align:'center',
            render:(text,record)=>{
                return (
                    <span>
                        <Detail value={text} server={this.server} Authorization={this.Authorization} />
                        <Divider type='vertical' />
                        <Popconfirm title='确定删除？' onConfirm={()=>this.handleDelete(text)} okText='确定' cancelText='取消' >
                            <span className='blue'>删除</span>
                        </Popconfirm>
                        <Divider type='vertical' />
                        <RecordChecking value={record} />
                    </span>
                );
            }
        },]
    }
    handleTableChange(pagination){
        this.fetch({
            size:pagination.pageSize,
            page:pagination.current,
        })
    }
    fetch(params){
        axios.get(`${this.server}/jc/common/rawTestReport/getAllByPage`,{
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                params,
                // deliverer : this.state.searchContent
            }
        }).then((data)=>{
            const res = data.data.data.list;
            const da = [];
            for(var i = 1; i <= res.length; i++){
                var e = res[i-1];
                da.push({
                    index:i,
                    id:e.commonBatchNumber.id,
                    sampleDeliveringDate:e.details.sampleDeliveringRecord.sampleDeliveringDate,
                    deliverer:e.details.deliverer,
                    deliveryFactory:e.details.deliveryFactory.id,
                    batchNumber:e.commonBatchNumber.batchNumber,
                    testItemString:e.details.testItemString,
                    exceptionComment:e.details.sampleDeliveringRecord.exceptionComment,
                    type:e.details.sampleDeliveringRecord.type,
                    acceptStatus:e.details.sampleDeliveringRecord.acceptStatus,
                    handleComment:e.details.sampleDeliveringRecord.handleComment,
                    status:e.commonBatchNumber.status,
                    isUrgent:e.commonBatchNumber.isUrgent

                })
            }
            console.log(da)
            this.setState({
                dataSource:da
            })
        })
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
    searchEvent(value){
        console.log(value)
        this.setState({
            searchContent:value
        })
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
        this.server = localStorage.getItem('remote');
        this.Authrization = localStorage.getItem('Authorization');
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange,
          };
        return (
            <div>
                <BlockQuote name='原料检测报告' menu='质量与流程' menu2='返回' flag={1} returnDataEntry={this.returnDataEntry}></BlockQuote>
                <div style={{padding:'15px'}}>
                    {/* <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={this.handleAdd} >新增</Button> */}
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds}/>
                    <span style={{float:'right',paddingBottom:'8px'}} >
                        <SearchCell name='请输入搜索内容' searchEvent={this.searchEvent} searchContent={this.searchContent} fetch={this.fetch}></SearchCell>
                    </span>
                <Table rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource} handleTableChange={this.handleTableChange} rowSelection={rowSelection} pagination={this.pagination} scroll={{y:400,x:1500}} size='small' bordered/> 
                </div>
            </div>
        );
    }
}
export default RawTestReport;