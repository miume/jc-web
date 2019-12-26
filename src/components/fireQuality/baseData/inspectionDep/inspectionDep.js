import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Divider, Popconfirm, Spin, Table,message} from "antd";
import DeleteByIds from "../../../BlockQuote/deleteByIds";
import NewSearchCell from "../../../BlockQuote/newSearchSell";
import Add from './add'
import axios from "axios";
class FireInspecDep extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            selectedRowKeys:[],
            dataSource:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'部门名称',
            dataIndex:'deptName',
            key:'deptName'
        },{
            title:'描述',
            dataIndex:'descr',
            key:'descr'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                return(
                    <span>
                        <Add url={this.url} record={record} getTableData={this.getTableData} editflag={true}/>
                        <Divider type={'vertical'}/>
                        <Popconfirm title={'确定删除吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.handleDelete(record.code)}>
                            <span className={'blue'}>删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
        this.pagination={
            showSizeChanger:true,
            showTotal:(total)=>`共${total}条记录`,
            pageSizeOptions: ["10","20","50","100"]
        }
        this.back=this.back.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.deleteCancel=this.deleteCancel.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.reset=this.reset.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
    }
    componentDidMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.setState=()=>{
            return
        }
    }

    getTableData(searchContent){
        let {current,pageSize}=this.pagination,
            params={
                condition:searchContent?searchContent:'',
                page:current?current:1,
                size:pageSize?pageSize:10
            }
        this.setState({
            loading:true
        })
        axios({
            url:this.url.fireMageDept.page,
            method:'get',
            headers:{
                'Authorizaion':this.url.Authorizaion
            },
            params
        }).then(data=>{
            let res=data.data.data
            this.pagination.total=res&&res.total?res.total:0
            if(res&&res.list){
                for(let i=0;i<res.list.length;i++){
                    res.list[i]['index']=(res.page-1)*res.size+(i+1)
                }
                this.setState({
                    dataSource:res.list,
                    loading:false,
                    searchContent:''
                })
            }
        })
    }
    handleDelete(id){
             axios({
                 url:`${this.url.fireMageDept.add}/${id}`,
                 method:'delete',
                 headers: {
                     'Authorizaion':this.url.Authorizaion
                 }
             }).then(data=>{
                    if(data.data.code===0){
                        message.info('删除成功!')
                        this.getTableData()
                    }
                    else{
                        message.error('操作失败，请联系管理员!')
                    }
             }).catch(()=>{
                 message.error('操作失败，请联系管理员!')
             })
    }
    deleteByIds(){
        let {selectedRowKeys}=this.state,ids=selectedRowKeys
        axios({
            url:`${this.url.fireMageDept.add}/${ids}`,
            method:'delete',
            headers: {
                'Authorizaion':this.url.Authorizaion
            }
        }).then(data=>{
            if(data.data.code===0){
                message.info('删除成功!')
                this.getTableData()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        }).catch(()=>{
            message.error('操作失败，请联系管理员!')
        })
    }
    deleteCancel(){
        this.setState({
            selectedRowKeys:[]
        })
    }
    /**复选框变化*/
    onSelectChange(selectedRowKeys){
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    searchEvent(searchContent){//搜索内容通过子组件传过来,以修改父组件值
        this.setState({
            searchContent:searchContent
        })
        this.getTableData(searchContent)
    }
   /**重置*/
    reset(){
       this.setState({
           searchContent:''
       })
       this.getTableData('')
    }
    back(){
        this.props.history.push({pathname:"/fireBasicData"})
    }
    handleTableChange(pagination){
        this.pagination=pagination
        this.getTableData()
    }
    render() {
        const current=JSON.parse(localStorage.getItem('current'));
        this.url=JSON.parse(localStorage.getItem('url'));
        let {loading,selectedRowKeys}=this.state;
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange:this.onSelectChange,
        };
        return(
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <Add url={this.url} getTableData={this.getTableData}/>
                    <DeleteByIds selectedRowKeys={selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.deleteCancel} flag={true}/>
                    <NewSearchCell placeholder={'请输入部门名称'}
                                searchEvent={this.searchEvent}
                                reset={this.reset}
                                flag={true}
                    />
                    <Table dataSource={this.state.dataSource} rowSelection={rowSelection} rowKey={record => record.code}
                     pagination={this.pagination} columns={this.columns} onChange={this.handleTableChange} bordered size={'small'} />
                </Spin>
            </div>
        )
    }
}
export default FireInspecDep
