import React,{Component} from 'react'
import {Table} from 'antd'
class PremixedCoulterMixed extends Component{//预混(犁刀混)
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
            title:'已混量(kg)',
            dataIndex:'mix',
            key:'mix'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance'
        }]
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[1]&&this.props.tagTableData[1].materials?this.props.tagTableData[1].materials:[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                this.tableData[i]['index'] = i + 1
                this.tableData[i]['productLine']=this.props.productLine
            }
        }
        return(
            <div>
                <Table
                rowKey={record=>record.id}
                columns={this.columns} 
                size='small'
                bordered/>
            </div>
        )
    }
}
export default PremixedCoulterMixed