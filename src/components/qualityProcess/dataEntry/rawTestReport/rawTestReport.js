import React from 'react';
import axios from 'axios';
import './rawTestReport.css';
import Detail from './detail';
import home from '../../../commom/fns';
import { Table, Divider} from 'antd';
import SearchCell from '../../../BlockQuote/search';
import RecordChecking from './recordChecking';
import BlockQuote from '../../../BlockQuote/blockquote';
import Loss from '../../../BlockQuote/lossStatement';
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
            searchContent : '',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                } ,
                showSizeChanger:true
              },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
        }
        this.fetch = this.fetch.bind(this);
        // this.handleAdd = this.handleAdd.bind(this);
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
            width:'9%'
        },{
            title:'送样日期',
            dataIndex:'sampleDeliveringDate',
            key:'sampleDeliveringDate',
            width:'9%',
            render:(text)=>{
                return <span title={text} className='text-decoration'>{text.substring(0,10)+'...'}</span>
            }
        },{
            title:'送样工厂',
            dataIndex:'deliveryFactoryName',
            key:'deliveryFactoryName',
            width:'9%'
        },{
            title:'批号',
            dataIndex:'batchNumber',
            key:'batchNumber',
            width:'15%'
        },{
            title:'检测项目',
            dataIndex:'testItemString',
            key:'testItemString',
            width:'11%',
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
            width:'7%',
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
                return (
                    <span>
                        <Detail value={text}  url={this.url} status={record.status} id={record.batchNumberId} allStatus={this.status}/>
                        <RecordChecking value={text} url={this.url} status={record.status} tableRecord={this.tableRecord} flag={editorFlag}/>
                        <Divider type='vertical' />
                        <Loss statement={record.exceptionComment} name='异常备注' />
                        <Divider type='vertical' />
                        <Loss statement={record.handleComment} name='接受反馈' />
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
                batchNumber:e.commonBatchNumber?e.commonBatchNumber.batchNumber:'无',
                testItemString:e.testItemString?e.testItemString:'无',
                exceptionComment:e.sampleDeliveringRecord.exceptionComment,
                type:e.sampleDeliveringRecord.type,
                acceptStatus:'接受',
                // acceptStatus:e.sampleDeliveringRecord.acceptStatus,
                handleComment:e.sampleDeliveringRecord.handleComment,
                status:e.commonBatchNumber?e.commonBatchNumber.status:0,
                isUrgent:e.commonBatchNumber?e.commonBatchNumber.isUrgent:0,
                batchNumberId:e.commonBatchNumber?e.commonBatchNumber.id:'无',
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
                <div style={{padding:'15px'}}>
                    <SearchCell name='请输入工厂名称' searchEvent={this.searchEvent} searchContentChange={this.searchContentChange}
                    fetch={this.fetch} flag={home.judgeOperation(this.operation,'QUERY')}></SearchCell>
                    <div className='clear'></div>
                <Table rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource}
                onChange={this.handleTableChange} pagination={this.state.pagination} scroll={{y:400}}
                size='small' bordered rowClassName={(record)=>record.flag?'table-recorcd':''}/>
                </div>
            </div>
        );
    }
}
export default RawTestReport;
