import React,{Component} from 'react'
import {Table,Spin} from 'antd'
class PendSubmit extends Component{//待提交
    constructor(props){
        super(props);
        this.state={
            loading:false
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
            key:'operation'
        }]
    }
    render(){
        return(
            <div>
               <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                <Table
                    rowKey={record=>record.id}
                    columns={this.columns}
                    size='small'
                    bordered/>
               </Spin>
            </div>
        );
    }
}
export default PendSubmit