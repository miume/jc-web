import React from 'react';
import axios from 'axios';
import './rawTestReport.css';
import Detail from './detail';
import { Table, Divider} from 'antd';
import SearchCell from '../BlockQuote/search';
import RecordChecking from './recordChecking';
import BlockQuote from '../BlockQuote/blockquote';
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
    // componentWillUnmount(){
    //     this.setState = () => {
    //         return ;
    //       }
    // }
    constructor(props){
        super(props);
        this.state ={
            dataSource:[],
            searchContent : '',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                } 
              },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
        }
        this.returnDataEntry = this.returnDataEntry.bind(this);
        // this.handleAdd = this.handleAdd.bind(this);
        // this.deleteByIds = this.deleteByIds.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.fetch = this.fetch.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b)=> a.index-b.index,
            width:'5%'
        },{
            title:'送样人',
            dataIndex:'deliverer',
            key:'deliverer',
            width:'9%'
        },{
            title:'送样日期',
            dataIndex:'sampleDeliveringDate',
            key:'sampleDeliveringDate',
            width:'9%',
            render:(text)=>{
                return <span title={text} className='text-decoration'>{text.substring(0,10)}</span>
            }
        },{
            title:'送样工厂',
            dataIndex:'deliveryFactoryName',
            key:'deliveryFactoryName',
            width:'10%'
        },{
            title:'批号',
            dataIndex:'batchNumber',
            key:'batchNumber',
            width:'15%'
        },{
            title:'检测项目',
            dataIndex:'testItemString',
            key:'testItemString',
            width:'7%',
            render:(text)=>{ 
                const items = text.split(',');
                var testItems = '';
                if(items.length>3){
                    testItems = items[0]+','+items[1]+','+items[2];
                    return <span title={text} className='text-decoration'>{testItems}</span>;
                }else{
                  testItems = text;
                  return <span className='text-decoration'>{testItems}</span>
                }
               },
        },{
            title:'异常备注',
            dataIndex:'exceptionComment',
            key:'exceptionComment',
            align:'center',
            width:'7%'
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
            width:'7%',
            // render: acceptStatus => {
            //     switch(`${acceptStatus}`) {
            //       case '-1': return '保存';
            //       case '0': return '等待接受';
            //       case '1': return '接受';
            //       case '2': return '拒绝';
            //       default:return '';
            //     }
            // }
        },{
            title:'接受反馈',
            dataIndex:'handleComment',
            key:'handleComment',
            align:'center',
            width:'7%'
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
                        <Detail value={text}  url={this.url} status={record.status} id={record.batchNumberId} allStatus={this.status}/>
                        <Divider type='vertical' />
                        <RecordChecking value={text} url={this.url} status={record.status}/>
                    </span>
                );
            }
        },]
    }
    handleTableChange(pagination){
        this.setState({
            pagination:pagination
        })
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
                factoryName:this.state.searchContent
            })
        }else{
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
            })
        }
        
    }
    /**?factoryName=${this.state.searchContent} */
    /**flag表示为1时重置pageChangeFlag */
    fetch(params,flag){
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            var {pagination} = this.state;
            pagination.current = 1;
            pagination.total = 0;
            this.setState({
                pageChangeFlag:0,
                searchContent:'',
                pagination:pagination
            })
        }
        axios.get(`${this.url.rawTestReport.getAllByPage}`,{
            headers:{
                'Authorization':this.url.Authorization
            },
            params:params
        }).then((data)=>{
            const res = data.data.data?data.data.data:[];
            if(res&&res.list){
                this.dataProcessing(res)
            }else{
                this.setState({
                    dataSource:[]
                })
            }
        })
    }
    /**数据处理 */
    dataProcessing(res){
        var da = [];
        const {pagination} = this.state;
        pagination.total = res.total;
        for(var i = 1; i <= res.list.length; i++){
            var e = res.list[i-1];
            da.push({
                index:i+res.prePage*10,
                id:e.sampleDeliveringRecord.id,
                sampleDeliveringDate:e.sampleDeliveringRecord.sampleDeliveringDate,
                deliverer:e.deliverer,
                deliveryFactoryId:e.sampleDeliveringRecord.deliveryFactoryId,
                deliveryFactoryName:e.deliveryFactoryName,
                batchNumber:e.commonBatchNumber?e.commonBatchNumber.batchNumber:'',
                testItemString:e.testItemString?e.testItemString:'',
                exceptionComment:e.sampleDeliveringRecord.exceptionComment,
                type:e.sampleDeliveringRecord.type,
                acceptStatus:'接受',
                // acceptStatus:e.sampleDeliveringRecord.acceptStatus,
                handleComment:e.sampleDeliveringRecord.handleComment,
                status:e.commonBatchNumber?e.commonBatchNumber.status:0,
                isUrgent:e.commonBatchNumber?e.commonBatchNumber.isUrgent:0,
                batchNumberId:e.commonBatchNumber?e.commonBatchNumber.id:'',
            })
        }
        this.setState({
            dataSource:da,
            pagination:pagination
        })
    }
    /**监控搜索框的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({
            searchContent:value
        })
    }
    /**搜索功能 */
    searchEvent(){
        this.setState({
            pageChangeFlag:1
        })
        this.fetch({
            factoryName:this.state.searchContent
        })
    }
   /**返回数据录入页面 */
   returnDataEntry(){
    this.props.history.push({pathname:'/dataEntry'});
}
    render(){
        const current = JSON.parse(localStorage.getItem('current'));
        this.url = JSON.parse(localStorage.getItem('url')); 
        this.status = JSON.parse(localStorage.getItem('status'));
        return (
            <div>
                <BlockQuote name='原材料录检' menu={current.menuParent} menu2='返回' flag={1} returnDataEntry={this.returnDataEntry}></BlockQuote>
                <div style={{padding:'15px'}}>
                    {/* <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={this.handleAdd} >新增</Button> */}
                    {/* <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds}/> */}
                    <span style={{float:'right',paddingBottom:'8px'}} >
                        <SearchCell name='请输入工厂名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange} fetch={this.fetch}></SearchCell>
                    </span>
                    <div className='clear'></div>
                <Table rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource} onChange={this.handleTableChange} pagination={this.state.pagination} scroll={{y:400}} size='small' bordered/> 
                </div>
            </div>
        );
    }
}
export default RawTestReport;