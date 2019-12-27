import React,{Component} from 'react'
import {Table} from 'antd'
class OnlineIngredients extends Component{//在线原料
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'物料种类',
            dataIndex:'materialName',
            key:'materialName'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine'
        },{
            title:'领料量',
            dataIndex:'receive',
            key:'receive'
        },]
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[0]&&this.props.tagTableData[0].materials?this.props.tagTableData[0].materials:[]
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
                rowKey={record=>record.code}
                columns={this.columns}
                size='small'
                bordered/>
            </div>
        )
    }
}
export default OnlineIngredients