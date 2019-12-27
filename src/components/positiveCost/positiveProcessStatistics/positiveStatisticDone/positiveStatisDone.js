import React,{Component} from 'react'
import {Spin,Table} from 'antd'
import Detail from './detail'

class PositiveStatisticDone extends Component{//已统计
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
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
        this.pagination={
            showSizeChanger:true,
            showTotal:(total)=>`共${total}条记录`,
            pageSizeOptions:['10','20','50','100']
        }
        this.handleTableChange=this.handleTableChange.bind(this);
    }
    componentDidMount(){
        this.props.getPagination('2',this.pagination)
    }
    handleTableChange(pagination){
        this.pagination=pagination
        this.pagination.handleTableChange(pagination)
    }
    render(){
        return(
            <div>
                <Spin spinning={this.props.loadingStatis}>
                    <Table
                    rowKey={record=>record.index}
                    dataSource={this.props.dataStatistic}
                    columns={this.columns}
                    onChange={this.handleTableChange}
                    pagination={this.pagination}
                    size='small'
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default PositiveStatisticDone