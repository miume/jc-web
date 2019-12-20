import React,{Component} from 'react'
import BlockQuote from "../../BlockQuote/blockquote"
import {Table,Spin,Divider,Popconfirm,message} from 'antd'
import DeleteByIds from "../../BlockQuote/deleteByIds";
import SearchCell from "../../BlockQuote/search";
import Add from './add'
import axios from 'axios'

class Operation extends Component{
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'15%'
        },{
            title:'标题',
            dataIndex:'title',
            key:'title',
            width:'25%'
        },{
            title:'内容',
            dataIndex:'content',
            key:'content',
            width:'25%'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'30%',
            render:(text,record)=>{
                return(
                    <span>
                        <Add detailFlag={true} record={record} getTableData={this.getTableData} url={this.url}/>
                        <Divider type={'vertical'}/>
                        <Add editflag={true} record={record} getTableData={this.getTableData} url={this.url}/>
                        <Divider type={'vertical'}/>
                        <Popconfirm title={'确定删除吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.handleDelete(record.code)}>
                            <span className={'blue'}>删除</span>
                        </Popconfirm>
                    </span>
                )
            }
        }]
        this.state={
            loading:false,
            selectedRowKeys:[],
            dataSource:[]
        }
        this.pagination={
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal:(total)=>`共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        }
        this.getTableData=this.getTableData.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.cancel=this.cancel.bind(this);
        this.selectChange=this.selectChange.bind(this);
    }
    componentDidMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.setState=()=>{
            return
        }
    }

    getTableData(){
        this.setState({
            loading:true
        })
        axios({
            url:`${this.url.fireMageOperation}/page`,
            method:'get',
            headers:{
                'Authorizaion':this.url.Authorizaion
            }
        }).then(data=>{
            let res=data.data.data
            if(res&&res.list){
                for(let i=0;i<res.list.length;i++){
                    res.list[i]['index']=(res.page-1)*(res.size)+(i+1)
                }
                this.setState({
                    dataSource:res.list,
                    loading:false
                })
            }
        })
    }

    deleteByIds(){
        let ids=this.state.selectedRowKeys
        axios({
            url:`${this.url.fireMageOperation}/${ids}`,
            method:'delete',
            headers:{
                'Authorizaion':this.url.Authorizaion
            }
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.getTableData()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        })
    }
    /**删除取消*/
    cancel(){
        this.setState({
            selectedRowKeys:[]
        });
    }
    handleDelete(id){
        axios({
            url:`${this.url.fireMageOperation}/${id}`,
            method:'delete',
            headers:{
                'Authorizaion':this.url.Authorizaion
            }
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.getTableData()
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        })
    }
    selectChange(selectedRowKeys){
        this.setState({ selectedRowKeys: selectedRowKeys});
    }
    render(){
        const current=JSON.parse(localStorage.getItem(('current')))
        this.url=JSON.parse(localStorage.getItem('url'))
        let {loading,selectedRowKeys,dataSource}=this.state
        const rowSelection={
            selectedRowKeys,
            onChange:this.selectChange
        }
        return(
            <div>
                <BlockQuote menu={current.menuParent} name={current.menuName}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <Add url={this.url} getTableData={this.getTableData}/>
                    <DeleteByIds flag={true} selectedRowKeys={selectedRowKeys}
                                 deleteByIds={this.deleteByIds} cancel={this.cancel}/>
                    <SearchCell flag={true} name={'请输入手册标题'}/>
                    <Table dataSource={dataSource}
                           columns={this.columns} bordered size={'small'}
                           rowKey={record => record.code}
                           rowSelection={rowSelection}
                           pagination={this.pagination}
                    />
                </Spin>
            </div>
        )
    }

}
export default Operation