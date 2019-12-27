import React,{Component} from 'react'
import {Table} from 'antd'
class PremixedStorageBin extends Component{//预混(暂存仓)
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'物料类型',
            dataIndex:'materialName',
            key:'materialName'
        },{
            title:'产线',
            dataIndex:'produltLine',
            key:'produltLine'
        },{
            title:'进料量(kg)',
            dataIndex:'inMat',
            key:'inMat'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance'
        }]
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[2]&&this.props.tagTableData[2].materials?this.props.tagTableData[2].materials:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
                this.tableData[i]['productLine']=this.props.productLine
            }
        }
        return(
            <div>
                <Table
                dataSource={this.tableData}
                rowKey={record=>record.id}
                columns={this.columns}
                size='small'
                bordered/>
            </div>
        )
    }
}
export default PremixedStorageBin