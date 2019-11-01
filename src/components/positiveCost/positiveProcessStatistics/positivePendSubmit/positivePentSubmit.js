import React,{Component} from 'react'
import {Table,Spin,Popconfirm,Divider} from 'antd'

const data=[{
    id:'1',
    periodType:'周',
    period:'10',
    beginTime:'2019-01-01',
    endTime:'2019-01-01',

},{
    id:'2',
    periodType:'周',
    period:'10',
    beginTime:'2019-01-01',
    endTime:'2019-01-01',

}]
class PositivePendSubmit extends Component{//待提交
    constructor(props){
        super(props);
        this.state={
            loading:false,
            data:data
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'周期类型',
            dataIndex:'periodType',
            key:'periodType'
        },{
            title:'期数',
            dataIndex:'period',
            key:'period'
        },{
            title:'开始时间',
            dataIndex:'beginTime',
            key:'beginTime'
        },{
            title:'结束时间',
            dataIndex:'endTime',
            key:'endTime'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                return(
                    <span>
                        <span className={this.judgeOperation(this.operation,'UPDATE')?'blue':'hide'} onClick={this.handleEdit}>编辑</span>
                        {this.judgeOperation(this.operation,'DELETE')?<Divider type='vertical'/>:''}
                        <span className={this.judgeOperation(this.operation,'DELETE')?'':'hide'}>
                            <Popconfirm title='确定删除?' onConfirm={() => this.handleDelete(record.id)} okText="确定" cancelText="再想想" >
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
    }
    handleEdit(){
        this.props.history.push({pathname:'/costProcessAdd'})
    }
    handleDelete(id){

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
               <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                <Table
                    dataSource={this.state.data}
                    rowKey={record=>record.id}
                    columns={this.columns}
                    size='small'
                    bordered/>
               </Spin>
            </div>
        );
    }
}
export default PositivePendSubmit