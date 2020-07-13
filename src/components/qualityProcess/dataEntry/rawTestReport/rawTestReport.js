import React from 'react';
import axios from 'axios';
import './rawTestReport.css';
import Detail from './detail';
import home from '../../../commom/fns';
import { Table, Divider,Spin} from 'antd';
import SearchCell from '../../../BlockQuote/search';
import RecordChecking from './recordChecking';
import BlockQuote from '../../../BlockQuote/blockquote';
import Loss from '../../../BlockQuote/lossStatement';
import Print from "./print";

class RawTestReport extends React.Component{
    url
    status
    componentDidMount(){
        this.fetch({
            pageSize:10,
            pageNumber:1,
            sortField: 'sample_delivering_date',
            sortType: 'desc'
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
            searchContent : '',
            pageChangeFlag : 0,   //0表示分页 1 表示查询
            loading: true
        }
        this.pagination = {
            showTotal(total) {
                return `共${total}条记录`
            } ,
            showSizeChanger:true,
                pageSizeOptions: ["10","20","50","100"]
        }
        this.fetch = this.fetch.bind(this);
        this.tableRecord = this.tableRecord.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
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
            width:'10%'
        },{
            title:'送样日期',
            dataIndex:'sampleDeliveringDate',
            key:'sampleDeliveringDate',
            width:'10%',
            render:(text)=>{
                return <span title={text} className='text-decoration'>{text.substring(0,10)+'...'}</span>
            }
        },{
            title:'送样工厂',
            dataIndex:'deliveryFactoryName',
            key:'deliveryFactoryName',
            width:'10%'
        },{
            title:'编号',
            dataIndex:'batch',
            key:'batch',
            width:'10%'
        },{
            title:'批号',
            dataIndex:'batchNumber',
            key:'batchNumber',
            width:'10%'
        },{
            title:'检测项目',
            dataIndex:'testItemString',
            key:'testItemString',
            width:'10%',
            render:(text)=>{
                const items = text.split(',');
                var testItems = '';
                if(items.length>5){
                    testItems = items[0]+','+items[1]+','+items[2]+','+items[3]+','+items[4]+'...';
                    return <span title={text} className='text-decoration'>{testItems}</span>;
                }else{
                  testItems = text;
                  return <span>{testItems}</span>
                }
               },
        }, {
            title:'接受状态',
            dataIndex:'acceptStatus',
            key:'acceptStatus',
            align:'center',
            width:'5%',
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
                const editorFlag = home.judgeOperation(this.operation,'UPDATE')
                const printGrantFlag = home.judgeOperation(this.operation,'PRINT')
                let printFlag = this.judgeprintOperation(record.status);
                return (
                    <span>
                        <Detail value={text}  url={this.url} status={record.status} id={record.batchNumberId} allStatus={this.status}/>
                        <RecordChecking title='录检' value={text} url={this.url} status={record.status} tableRecord={this.tableRecord} flag={editorFlag}/>
                        <span className={printGrantFlag?'':'hide'}>
                            <Divider type="vertical" />
                            {printFlag?(
                                <Print
                                    record={record}
                                    batchNumberId={record.batchNumberId}
                                />
                            ):(
                                <span  className="notClick">打印</span>
                            )}
                        </span>
                        <Divider type='vertical' />
                        <Loss statement={record.exceptionComment} name='异常备注' />
                        <Divider type='vertical' />
                        <Loss statement={record.handleComment} name='接受反馈' />
                    </span>
                );
            }
        },]
    }
    judgeprintOperation = (isPublished) => {
        if(isPublished===2){
            return true;
        }else{
            return false;
        }
    };

    handleTableChange(pagination){
        this.pagination = pagination;
        /**分页查询 */
        this.fetch({
            pageSize:pagination.pageSize,
            pageNumber:pagination.current,
            factoryName:this.state.searchContent,
            sortField: 'sample_delivering_date',
            sortType: 'desc'
        })
    }
    /**?factoryName=${this.state.searchContent} */
    /**flag表示为1时重置pageChangeFlag */
    fetch(params,flag){
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            this.setState({
                searchContent:''
            })
        }
        this.setState({
            loading: true
        })
        axios.get(`${this.url.rawTestReport.getAllByPage}`,{
            headers:{
                'Authorization':this.url.Authorization
            },
            params:params
        }).then((data)=>{
            const res = data.data.data?data.data.data:[];
            if(res&&res.list){
                this.dataProcessing(res)
            } else {
                this.setState({
                    dataSource:[],
                    loading: false
                })
            }
        })
    }
    /**数据处理 */
    dataProcessing(res){
        var da = [];
        for(var i = 1; i <= res.list.length; i++){
            var e = res.list[i-1];
            da.push({
                index:i+res.prePage*10,
                id:e.sampleDeliveringRecord.id,
                sampleDeliveringDate:e.sampleDeliveringRecord.sampleDeliveringDate,
                deliverer:e.deliverer,
                deliveryFactoryId:e.sampleDeliveringRecord.deliveryFactoryId,
                deliveryFactoryName:e.deliveryFactoryName,
                batchNumber:e.commonBatchNumber?e.commonBatchNumber.batchNumber:'无',
                testItemString:e.testItemString?e.testItemString:'无',
                exceptionComment:e.sampleDeliveringRecord.exceptionComment,
                type:e.sampleDeliveringRecord.type,
                acceptStatus:'接受',
                handleComment:e.sampleDeliveringRecord.handleComment,
                status:e.commonBatchNumber?e.commonBatchNumber.status:0,
                isUrgent:e.commonBatchNumber?e.commonBatchNumber.isUrgent:0,
                batchNumberId:e.commonBatchNumber?e.commonBatchNumber.id:'无',
                batch: e.batch
            })
        }
        this.setState({
            dataSource:da,
            loading: false
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
    searchEvent() {
        let {searchContent} = this.state;
        if(searchContent) {
            this.fetch({
                factoryName: searchContent,
                sortField: 'sample_delivering_date',
                sortType: 'desc'
            })
        }
    }
   /**返回数据录入页面 */
   returnDataEntry(){
       this.props.history.push({pathname:'/dataEntry'});
   }

   /**录检完成后，提示用户刚才录检的数据 */
   tableRecord(id){
       var {dataSource} = this.state;
       var data = dataSource.map(m=>{
           if(m.id===id) m['flag']=1;
           else m['flag']=0;
           return m;
       })
       var $this = this;
       /**实现录检数据显示，并在一秒之后消失 */
       new Promise((resolve, reject) => {
            $this.setState({
                dataSource:data
            });
            setTimeout(() => {
                var data = dataSource.map(m=>{
                    m['flag']=0;
                    return m;
                })
                $this.setState({
                    dataSource:data
                });
                resolve("done!");
            }, 1000)

       })
   }

    render(){
        const current = JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        this.status = JSON.parse(localStorage.getItem('status'));
        /** 先获取数据录入的所有子菜单，在筛选当前子菜单的所有操作权限*/
        const operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.menuName===current.menuParent)[0].menuList:null;
        this.operation = operation.filter(e=>e.path === current.path)[0].operations;
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2='返回' flag={1} returnDataEntry={this.returnDataEntry}></BlockQuote>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <SearchCell name='请输入工厂名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}
                                fetch={this.fetch} flag={home.judgeOperation(this.operation,'QUERY')}></SearchCell>
                    <div className='clear'></div>
                    <Table rowKey={record=>record.id} columns={this.columns}
                           dataSource={this.state.dataSource} onChange={this.handleTableChange}
                           pagination={this.pagination} size='small' bordered
                           rowClassName={(record)=>record.flag?'table-recorcd':''}/>
                </Spin>
            </div>
        );
    }
}
export default RawTestReport;
