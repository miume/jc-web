import React,{Component} from 'react'
import {Spin,Table} from 'antd'
import Detail from './detail'
const data=[{
    id:'1',
    periodType:'周',
    period:'10',
    beginTime:'2019-01-01',
    endTime:'2019-01-01',
    process:'单晶体配置',
    productLine:'F#生产线'
},{
    id:'2',
    periodType:'周',
    period:'10',
    beginTime:'2019-01-01',
    endTime:'2019-01-01',
    process:'单晶体配置',
    productLine:'F#生产线'
}]
class PositiveStatisticDone extends Component{//已统计
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
            title:'工序',
            dataIndex:'process',
            key:'process'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                return(
                    <Detail record={record}/>
                )
            }
        }]
    }
    render(){
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightContent-Div'>
                    <Table
                    rowKey={record=>record.id}
                    dataSource={this.state.data}
                    columns={this.columns}
                    size='small'
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default PositiveStatisticDone