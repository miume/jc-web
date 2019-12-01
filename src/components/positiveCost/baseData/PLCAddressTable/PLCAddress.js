import React,{Component} from 'react'
import {Spin,Table,Popconfirm,Divider,message} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import DeleteByIds from '../../../BlockQuote/deleteByIds'
import  PLCAddressAdd from './add'
import SearchCell from '../../../BlockQuote/search'
import axios from 'axios'
class PLCAddress extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            dataSource:[],
            searchContent:'',
            selectedRowKeys:[]
        }
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'15%',
            align:'center'
        },{
            title:'PLC地址',
            dataIndex:'plcAddress',
            key:'plcAddress',
            width:'28%',
            align:'center'
        },{
            title:'地址说明',
            dataIndex:'description',
            key:'description',
            width:'28%',
            align:'center'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'28%',
            align:'center',
            render:(text,record)=>{
                return(
                    <span>
                        < PLCAddressAdd editflag={true} record={record} url={this.url} code={record.code}/>
                        <Divider type='vertical'></Divider>
                        <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.code)} okText='确定' cancelText='取消'>
                        <span className='blue'>删除</span>
                        </Popconfirm>
                    </span>
                );
            }
        }]
        this.returnBaseInfoPositive=this.returnBaseInfoPositive.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.cancel=this.cancel.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this)
    }
    componentDidMount(){
        this.getTableData()
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    handleTableChange(pagination){
        this.pagination=pagination
        this.getTableData()
    }
    getTableData=(params={})=>{
        let {searchContent}=this.state,
            {pageSize,current}=this.pagination;
        params={
            condition:searchContent,
            size:pageSize,
            page:current
        }

        this.setState({
            loading:true
        })
        axios({
            url:this.url.positivePlcSddress.page,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then(data=>{
            let res=data.data.data
            if(res&&res.list){
                this.pagination.total = res.total ? res.total : 0;
                for(let i=0;i<res.list.length;i++){
                    res.list[i]['index']=(res.page-1)*res.size+(i+1);
                }
                this.setState({
                    dataSource:res.list
                })
            }
            this.setState({
                loading:false,
                searchContent:''
            })
        })
    }
    handleDelete = (id)=>{
        // console.log(id)
        axios({
            url:`${this.url.positivePlcSddress.delete}`,
            method:"delete",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{id:id}
        }).then((data)=>{
            message.info(data.data.message);
            this.getTableData();
        }).catch((error)=>{
            message.info(error.data)
        });
    };
    onSelectChange(selectedRowKeys){//监听复选框是否被选中
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    deleteByIds(){
        const ids=this.state.selectedRowKeys
        axios({
            url:this.url.positivePlcSddress.ids,
            method:'delete',
            headers:{
                'Authorization':this.url.Authorization
            },
            data:ids
            
        }).then(data=>{
            if(data.data.code===0){
                this.getTableData()
            }
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
        this.cancel()
    }
    cancel(){
        this.setState({
            selectedRowKeys:[],
            loading:false
        })
    }
    searchContentChange(e){
        this.setState({
            searchContent:e.target.value
        })
    }
    searchEvent(){
        this.getTableData()
    }
    /*用来判断改用户有哪些操作权限*/
    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
     }
    //返回正极成本的基础数据部分
    returnBaseInfoPositive(){
        this.props.history.push({pathname:'/baseDataPositiveCost'});
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'));
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null 
        this.url=JSON.parse(localStorage.getItem('url'))
        const {selectedRowKeys}=this.state
        const rowSelection={
            selectedRowKeys,
            onChange:this.onSelectChange
        }
        return(
            <div>
                <Blockquote menu={current.menuParent} name='PLC地址表' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    < PLCAddressAdd url={this.url} getTableData={this.getTableData}/>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} flag={true} deleteByIds={this.deleteByIds}
                            cancel={this.cancel}/>
                    <SearchCell name='请PLC地址' flag={true} searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange} fetch={this.getTableData}/>
                    <Table
                    rowKey={record=>record.code}
                    dataSource={this.state.dataSource}
                    pagination={this.pagination}
                    onChange={this.handleTableChange}
                    size='small'
                    columns={this.columns}
                    rowSelection={rowSelection}
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default PLCAddress;