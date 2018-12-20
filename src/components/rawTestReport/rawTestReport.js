import React from 'react';
import { Table, Divider,message} from 'antd';
import BlockQuote from '../BlockQuote/blockquote';
// import DeleteByIds from '../BlockQuote/deleteByIds';
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
    url
    status
    componentDidMount(){
        this.fetch({
            pageSize:10,
            pageNumber:1,
        });
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
            searchContent : ''
        }
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        // this.deleteByIds = this.deleteByIds.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        // this.onSelectChange = this.onSelectChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
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
            width:'70px'
        },{
            title:'送样人',
            dataIndex:'deliverer',
            key:'deliverer',
            align:'center',
            width:'100px'
        },{
            title:'送样日期',
            dataIndex:'sampleDeliveringDate',
            key:'sampleDeliveringDate',
            align:'center',
            width:'15%'
        },{
            title:'送样工厂',
            dataIndex:'deliveryFactoryName',
            key:'deliveryFactoryName',
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
            width:'8%',
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
        },
        // {
        //     title:'类型',
        //     dataIndex:'type',
        //     key:'type',
        //     align:'center',
        //     width:'6%'
        // },
        {
            title:'接受状态',
            dataIndex:'acceptStatus',
            key:'acceptStatus',
            align:'center',
            width:'6%',
            render: acceptStatus => {
                switch(`${acceptStatus}`) {
                  case '-1': return '保存';
                  case '0': return '等待接受';
                  case '1': return '接受';
                  case '2': return '拒绝';
                  default:return '';
                }
            }
        },{
            title:'接受反馈',
            dataIndex:'handleComment',
            key:'handleComment',
            align:'center',
            width:'6%'
        },{
            title:'审核状态',
            dataIndex:'status',
            key:'status',
            align:'center',
            width:'10%',
            render: status => {
                return this.status[status.toString()]
            }
        },{
            title:'紧急',
            dataIndex:'isUrgent',
            key:'isUrgent',
            align:'center',
            width:'6%',
            render:isUrgent=>!isUrgent?<span><i className="fa fa-circle" aria-hidden="true"></i>正常</span>:<span className='urgent'><i className="fa fa-circle" aria-hidden="true"></i> 紧急</span>,
        },{
            title:'操作',
            dataIndex:'id',
            key:'id',
            align:'center',
            render:(text,record)=>{
                return (
                    <span>
                        <Detail value={text} url={this.url} />
                        {/* <Divider type='vertical' />
                        <Popconfirm title='确定删除？' onConfirm={()=>this.handleDelete(text)} okText='确定' cancelText='取消' >
                            <span className='blue'>删除</span>
                        </Popconfirm> */}
                        <Divider type='vertical' />
                        <RecordChecking value={record} />
                    </span>
                );
            }
        },]
    }
    handleTableChange(pagination){
        this.fetch({
            pageSize:pagination.pageSize,
            pageNumber:pagination.current,
            factoryName:this.state.searchContent
        })
    }
    /**?factoryName=${this.state.searchContent} */
    fetch(params){
        axios.get(`${this.url.rawTestReport.getAllByPage}`,{
            headers:{
                'Authorization':this.url.Authorization
            },
            params:params
        }).then((data)=>{
            const res = data.data.data?data.data.data.list:[];
            const da = [];
            if(res&&res.length>0){
                for(var i = 1; i <= res.length; i++){
                    var e = res[i-1];
                    da.push({
                        index:i,
                        id:e.sampleDeliveringRecord.id,
                        sampleDeliveringDate:e.sampleDeliveringRecord.sampleDeliveringDate,
                        deliverer:e.deliverer,
                        deliveryFactoryId:e.sampleDeliveringRecord.deliveryFactoryId,
                        deliveryFactoryName:e.deliveryFactoryName,
                        batchNumber:e.commonBatchNumber?e.commonBatchNumber.batchNumber:'',
                        testItemString:e.testItemString?e.testItemString:'',
                        exceptionComment:e.sampleDeliveringRecord.exceptionComment,
                        type:e.sampleDeliveringRecord.type,
                        acceptStatus:e.sampleDeliveringRecord.acceptStatus,
                        handleComment:e.sampleDeliveringRecord.handleComment,
                        status:e.commonBatchNumber?e.commonBatchNumber.status:0,
                        isUrgent:e.commonBatchNumber?e.commonBatchNumber.isUrgent:0
                    })
                }
            }
            this.setState({
                dataSource:da
            })
        })
    }
    /**button新增 */
    handleAdd(){

    }
    /**删除一条记录 */
    // handleDelete(key){
    //     axios({
    //         url:`${this.url.rawTestReport.rawTestReport}/${key}`,
    //         method:'Delete',
    //         headers:{
    //             'Authorization':this.url.Authorization
    //         }
    //     }).then((data)=>{
    //         message.info(data.data.message);
    //     }).catch(()=>{
    //         message.info('删除失败，请联系管理员！')
    //     })
    // }
    /**批量删除 */
    // deleteByIds(){
    //     const ids = this.state.selectedRowKeys;
    // }
    /**监控搜索框的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({
            searchContent:value
        })
    }
    /**搜索功能 */
    searchEvent(){
        this.fetch({
            pageSize:10,
            pageNumber:1,
            factoryName:this.state.searchContent
        })
    }
    /**实现全选 */
//    onSelectChange(selectedRowKeys) {
//     this.setState({ selectedRowKeys:selectedRowKeys }); 
//    } 
   /**返回数据录入页面 */
   returnDataEntry(){
    this.props.history.push({pathname:'/dataEntry'});
}
    render(){
        const current = JSON.parse(localStorage.getItem('current'));
        this.url = JSON.parse(localStorage.getItem('url')); 
        this.status = JSON.parse(localStorage.getItem('status'));
        console.log(this.status)
        return (
            <div>
                <BlockQuote name='原材料录检' menu={current.menuParent} menu2='返回' flag={1} returnDataEntry={this.returnDataEntry}></BlockQuote>
                <div style={{padding:'15px'}}>
                    {/* <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={this.handleAdd} >新增</Button> */}
                    {/* <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds}/> */}
                    <span style={{float:'right',paddingBottom:'8px'}} >
                        <SearchCell name='请输入搜索内容' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.fetch}></SearchCell>
                    </span>
                <Table rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource} handleTableChange={this.handleTableChange} pagination={this.pagination} scroll={{y:400}} size='small' bordered/> 
                </div>
            </div>
        );
    }
}
export default RawTestReport;