import React ,{Component}from 'react'
import {Table,Input} from 'antd'
class PreBuring extends Component{//预烧(窑炉)
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
            title:'入炉排数',
            dataIndex:'intoFurnace',
            key:'intoFurnace'
        },{
            title:'出炉排数',
            dataIndex:'outFurnace',
            key:'outFurnace'
        }]
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[3]&&this.props.tagTableData[3].materials?this.props.tagTableData[3].materials:[]
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
                <div style={{marginTop:'20px'}}>预烧料 : <Input placeholder='请输入' style={{width:'120px'}} suffix="kg"/>
                </div>
            </div>
        )
    }
}

export default PreBuring