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
            dataIndex:'periodName',
            key:'periodName'
        },{
            title:'期数',
            dataIndex:'head.periods',
            key:'head.periods'
        },{
            title:'开始时间',
            dataIndex:'head.beginTime',
            key:'head.beginTime'
        },{
            title:'结束时间',
            dataIndex:'head.endTime',
            key:'head.endTime'
        },{
            title:'工序',
            dataIndex:'processName',
            key:'processName'
        },{
            title:'产线',
            dataIndex:'lineName',
            key:'lineName'
        },{
            title:'在制品小计（kg）',
            dataIndex:'comment1',
            key:'comment1'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                return(
                    <Detail record={record} url={this.props.url}/>
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
        this.props.handleTableChange(pagination)
    }
    render(){
        return(
            <div>
                <Spin spinning={this.props.loadingStatis}>
                    <Table
                    rowKey={record=>record.totals.code}
                    dataSource={this.props.dataStatistic}
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
export default PositiveStatisticDone