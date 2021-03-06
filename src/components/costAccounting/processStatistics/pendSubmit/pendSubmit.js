import React,{Component} from 'react'
import {Table,Spin,Popconfirm,Divider,message} from 'antd'
import axios from 'axios'
import '../process.css'
class PendSubmit extends Component{//待提交
    constructor(props){
        super(props);
        this.pagination={
            showSizeChanger:true,//是否可以改变pageSize
            showTotal:(total)=>`共${total}条记录`,//显示共几条记录
            pageSizeOptions:['10','20','50','100']
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'周期类型',
            dataIndex:'period',
            key:'period'
        },{
            title:'期数',
            dataIndex:'lineName',
            key:'lineName'
        },{
            title:'开始时间',
            dataIndex:'startTime',
            key:'startTime'
        },{
            title:'结束时间',
            dataIndex:'endTime',
            key:'endTime'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.props
                return(
                    <span>
                        <span className={updateFlag?'blue':'hide'} onClick={()=>this.handleEdit(record,record.code)}>编辑</span>
                        {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={() => this.handleDelete(record.code)} okText="确定" cancelText="再想想" >
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                )
            }
        }]
        this.handleEdit=this.handleEdit.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
    }
    componentDidMount(){
        this.props.getPagination('1',this.pagination)
    }
    handleTableChange(pagination) {
        this.pagination = pagination;
        this.props.handleTableChange({
            size:pagination.pageSize,
            page:pagination.current
        })
    }
    handleEdit(record,code){
        let {process,staticPeriod}=this.props
        this.props.history.push({
            pathname:`/costProcessAdd/${code}`,
            editFlag:true,
            process:process,
            staticPeriod:staticPeriod,
            code:code
        })
    }

    handleDelete(id){
        axios({
            url:`${this.props.url.precursorGoodIn.delete}`,
            method:'delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                stasticId:id
            }
        }).then((data)=>{
            message.info(data.data.message)
            this.props.getPendSubmit({},this.props.periodCode)
        }).catch(()=>{
            message.info('删除失败!')
        })
    }
    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[]
        return flag.length?true:false
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return(
            <div>
               <Spin spinning={this.props.loadingSubmit} >
                <Table
                    dataSource={this.props.dataSubmit}
                    rowKey={record=>record.code}
                    columns={this.columns}
                    onChange={this.handleTableChange}
                    pagination={this.props.pagination}
                    size='small'
                    bordered/>
               </Spin>
            </div>
        );
    }
}
export default PendSubmit