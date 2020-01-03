import React,{Component} from 'react'
import Blockquote from '../../../BlockQuote/blockquote'
import MaterialTypeAdd from './add'
import {Spin,Table,Popconfirm,Divider,message} from 'antd'
import DeleteByIds from '../../../BlockQuote/deleteByIds'
import SearchCell from '../../../BlockQuote/search'
import axios from 'axios'
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class MaterialTypePositive extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            dataSource:[],
            selectedRowKeys:[],
            searchContent:''
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%',
        },{
            title:'物料种类名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'15%',
        },{
            title:'所属工序',
            dataIndex:'processName',
            key:'processName',
            width:'15%',
        },{
            title:'数据类型',
            dataIndex:'dataType',
            key:'dataType',
            width:'18%',
            render:(text,record)=>{
                if(record.types===0){
                    return 'DCS读取数据'
                }
                else if(record.types===1){
                    return '手工输入数据'
                }
                else{
                    return '智能仓库'
                }
            }
        },{
            title:'产线',
            dataIndex:'lineName',
            key:'lineName',
            width:'20%',
            render:(text,record)=>{
                let data=record.weightDTOS
                return(
                    data.map(item=>{
                        return(
                            <span key={item.lineCode}>{item.lineName}&nbsp;</span>
                        )
                    })
                )
            }
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'18%',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.state
                let data=record.weightDTOS,line=[]
                for(let i=0;i<data.length;i++){
                    line.push(`${data[i].lineCode}-${data[i].lineName}`)
                }
                return(
                    <span>
                        <MaterialTypeAdd updateFlag={updateFlag} editflag={true} line={line} record={record}  getTableData={this.getTableData} url={this.url}/>
                        
                        {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={()=>this.handleDelete(record.materialCode)} okText='确定' cancelText='取消'>
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                );
            }
        }]
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total){
                return `共${total}条记录`
            },
            showSizeChanger: true,
        };
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
            url:this.url.positiveMaterialType.page,
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
            url:`${this.url.positiveMaterialType.delete}`,
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
    //返回正极成本的基础数据部分
    returnBaseInfoPositive(){
        this.props.history.push({pathname:'/baseDataPositiveCost'});
    }
    onSelectChange(selectedRowKeys){//监听复选框是否被选中
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    deleteByIds(){
        let {selectedRowKeys}=this.state
        axios({
            url:this.url.precursorRawmaterialLineWeight.ids,
            method:'delete',
            params:selectedRowKeys
        }).then(data=>{
            if(data.data.code===0){
                this.getTableData()
            }
            else{
                message.error('操作失败，请联系管理员!')
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

    render(){
        this.current=JSON.parse(localStorage.getItem('postiveBase'));
        this.url = JSON.parse(localStorage.getItem('url'));
        const {selectedRowKeys}=this.state;
        const rowSelection={
            selectedRowKeys,
            onChange:this.onSelectChange
        }
        return(
            <div>
                <Blockquote menu={this.current.menuParent} name='物料种类' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <MaterialTypeAdd addFlag={this.state.addFlag} getTableData={this.getTableData} url={this.url}/>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} flag={true} deleteByIds={this.deleteByIds}
                            cancel={this.cancel}/>
                    <SearchCell name='请输入物料种类' flag={true} searchEvent={this.searchEvent}
                      searchContentChange={this.searchContentChange} fetch={this.getTableData}/>
                    <Table
                    rowKey={record=>record.materialCode}
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
export default MaterialTypePositive;