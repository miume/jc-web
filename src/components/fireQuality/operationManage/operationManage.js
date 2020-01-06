import React,{Component} from 'react'
import BlockQuote from "../../BlockQuote/blockquote"
import {Table,Spin,Divider,Popconfirm,message} from 'antd'
import DeleteByIds from "../../BlockQuote/deleteByIds";
import NewSearchCell from "../../BlockQuote/newSearchSell";
import Add from './add'
import axios from 'axios'
import {getSecondsOperations, judgeOperation} from "../../commom/getOperations";

class Operation extends Component{
    constructor(props){
        super(props);
        this.operations = [];
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'8%'
        },{
            title:'标题',
            dataIndex:'title',
            key:'title',
            width:'25%'
        },{
            title:'内容',
            dataIndex:'content',
            key:'content',
            width:'40%'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'20%',
            render:(text,record)=>{
                let {deleteFlag,updateFlag} = this.state;
                return(
                    <span>
                        <Add detailFlag={true} record={record} getTableData={this.getTableData} url={this.url}/>
                        {updateFlag || deleteFlag? <Divider type="vertical" /> : ''}
                        <Add editFlag={updateFlag} record={record} getTableData={this.getTableData} url={this.url}/>
                        {updateFlag && deleteFlag ? <Divider type="vertical" /> : ''}
                        <span className={deleteFlag ? '' : 'hide'}>
                            <Popconfirm title={'确定删除吗？'} okText={'确定'} cancelText={'再想想'} onConfirm={()=>this.handleDelete(record.code)}>
                                <span className={'blue'}>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                )
            }
        }]
        this.state={
            loading:false,
            selectedRowKeys:[],
            dataSource:[],
            searchContent:''
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
        this.searchEvent=this.searchEvent.bind(this);
        this.reset=this.reset.bind(this);
    }
    componentDidMount() {
        this.getTableData();
        let {menuId} = this.current, operations = getSecondsOperations(menuId);
        this.setState({
            addFlag: judgeOperation(operations,'SAVE'),
            updateFlag: judgeOperation(operations,'UPDATE'),
            deleteFlag: judgeOperation(operations,'DELETE')
        })
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
            url:`${this.url.fireMageOperation}/page`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params
        }).then(data=>{
            let res=data.data.data
            this.pagination.total=res&&res.total?res.total:0
            if(res&&res.list){
                for(let i=0;i<res.list.length;i++){
                    res.list[i]['index']=(res.page-1)*(res.size)+(i+1)
                }
                this.setState({
                    dataSource:res.list,
                })
            }
            this.setState({
                loading:false
            })
        })
    }

    deleteByIds(){
        let ids=this.state.selectedRowKeys
        axios({
            url:`${this.url.fireMageOperation}/${ids}`,
            method:'delete',
            headers:{
                'Authorization':this.url.Authorization
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
                'Authorization':this.url.Authorization
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
    render(){
        this.current = JSON.parse(localStorage.getItem(('current')));
        this.url=JSON.parse(localStorage.getItem('url'))
        let {loading,selectedRowKeys,dataSource,addFlag,deleteFlag}=this.state
        const rowSelection={
            selectedRowKeys,
            onChange:this.selectChange
        };
        return(
            <div>
                <BlockQuote menu={this.current.menuParent} name={this.current.menuName}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <Add flag={addFlag} url={this.url} getTableData={this.getTableData}/>
                    <DeleteByIds flag={deleteFlag} selectedRowKeys={selectedRowKeys}
                                 deleteByIds={this.deleteByIds} cancel={this.cancel}/>
                     <NewSearchCell placeholder={'请输入部门名称'}
                                searchEvent={this.searchEvent}
                                reset={this.reset}
                                flag={true}
                    />
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
