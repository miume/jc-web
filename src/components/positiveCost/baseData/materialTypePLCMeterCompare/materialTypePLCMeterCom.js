import React,{Component} from 'react'
import {Spin,Table,Popconfirm,Divider,message} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import DeleteByIds from '../../../BlockQuote/deleteByIds'
import SearchCell from '../../../BlockQuote/search'
import MaterialTypePLCMeterComAdd from './add'
import axios from 'axios'
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class MaterialTypePLCMeterCom extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            dataSource:[],
            selectedRowKeys:[],
            searchContent:''
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
            width:'5%',
            align:'center'
        },{
            title:'工序',
            dataIndex:'processName',
            key:'processName',
            width:'17%',
            align:'center'
        },{
            title:'物料种类名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'17%',
            align:'center'
        },{
            title:'DCS属性',
            dataIndex:'materialAtt',
            key:'materialAtt',
            width:'17%',
            align:'center'
        },{
            title:'PLC地址',
            dataIndex:'plcAddress',
            key:'plcAddress',
            width:'18%',
            align:'center'
        },{
            title:'产线',
            dataIndex:'name',
            key:'name',
            width:'18%',
            align:'center'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'18%',
            align:'center',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.state
                return(
                    <span>
                        <MaterialTypePLCMeterComAdd editflag={true}  updateFlag={updateFlag}  record={record} code={record.code} url={this.url} getTableData={this.getTableData}/>
                        {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.code)} okText='确定' cancelText='取消'>
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                );
            }
        }]
        this.returnBaseInfoPositive=this.returnBaseInfoPositive.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
        this.deleteByIds=this.deleteByIds.bind(this);
        this.cancel=this.cancel.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this)
    }
    componentDidMount(){
        this.getTableData()
        let {openKeys,menuId} = this.current, operations = getOperations(openKeys,menuId);
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
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
            url:this.url.positivePlcCompare.page,
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
        axios({
            url:`${this.url.positivePlcCompare.delete}`,
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
            url:this.url.positivePlcCompare.ids,
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

    //返回正极成本的基础数据部分
    returnBaseInfoPositive(){
        this.props.history.push({pathname:'/baseDataPositiveCost'});
    }
    onSelectChange(selectedRowKeys){
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    render(){
        this.current=JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        const {selectedRowKeys,deleteFlag,addFlag}=this.state
        const rowSelection={
            selectedRowKeys,
            onChange:this.onSelectChange
        }
        return(
            <div>
                <Blockquote menu={this.current.menuParent} name='物料种类PLC仪表对照表' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <MaterialTypePLCMeterComAdd addFlag={addFlag} url={this.url} getTableData={this.getTableData}/>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} deleteByIds={this.deleteByIds} cancel={this.cancel} flag={this.state.deleteFlag} />
                    <SearchCell name='请输入物料种类'   flag={true} searchEvent={this.searchEvent}
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
export default MaterialTypePLCMeterCom;