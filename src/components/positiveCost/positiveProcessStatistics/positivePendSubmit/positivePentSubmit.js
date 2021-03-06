import React,{Component} from 'react'
import {Table,Spin,Popconfirm,Divider,message} from 'antd'
import axios from 'axios'

class PositivePendSubmit extends Component{//待提交
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'8%'
        },{
            title:'周期类型',
            dataIndex:'periodName',
            key:'periodName',
            width:'10%'
        },{
            title:'期数',
            dataIndex:'head.periods',
            key:'head.periods',
            width:'10%'
        },{
            title:'产线',
            dataIndex:'lineNama',
            key:'lineNama',
            width:'10%'
        },{
            title:'开始时间',
            dataIndex:'head.beginTime',
            key:'head.beginTime',
            width:'20%'
        },{
            title:'结束时间',
            dataIndex:'head.endTime',
            key:'head.endTime',
            width:'20%'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                let {deleteFlag,updateFlag}=this.props
                return(
                    <span>
                        <span className={updateFlag?'blue':'hide'} onClick={()=>this.handleEdit(record.head.code)}>编辑</span>
                        {updateFlag&&deleteFlag?<Divider type='vertical'/>:''}
                        <span className={deleteFlag?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={() => this.handleDelete(record.head.code)} okText="确定" cancelText="再想想" >
                                <span className='blue'>删除</span>
                            </Popconfirm>
                        </span>
                    </span>
                )
            }
        }]
        this.pagination={
            showSizeChanger:true,//是否可以改变pageSize
            showTotal:(total)=>`共${total}条记录`,//显示共几条记录
            pageSizeOptions:['10','20','50','100']
        }
        this.handleEdit=this.handleEdit.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
    }
    componentDidMount(){
        this.props.getPagination('1',this.pagination)
    }
    handleEdit(code){
        this.props.history.push({
            pathname:'/positiveAdd',
            editFlag:true,
            code:code,
            periodStatis:this.props.periodStatis,
            line:this.props.line,
        })
    }
    handleDelete(id){
        axios({
            url:`${this.props.url.positiveProcessStatis.delete}`,
            method:'delete',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                id:id
            }
        }).then((data)=>{
            message.info(data.data.message)
            this.props.getPendSubmit(this.props.head,this.pagination)
        }).catch(()=>{
            message.info('删除失败!')
        })
    }
    handleTableChange(pagination){
        this.pagination=pagination
        this.props.handleTableChange(pagination)
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
                    rowKey={record=>record.head.code}
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
export default PositivePendSubmit