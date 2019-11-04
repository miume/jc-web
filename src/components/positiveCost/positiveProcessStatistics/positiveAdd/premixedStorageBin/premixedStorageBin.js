import React,{Component} from 'react'
import {Table} from 'antd'
class PremixedStorageBin extends Component{//预混(暂存仓)
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'物料类型',
            dataIndex:'materialType',
            key:'materialType'
        },{
            title:'产线',
            dataIndex:'produltLine',
            key:'produltLine'
        },{
            title:'进料量(kg)',
            dataIndex:'feedAmount',
            key:'feedAmount'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance'
        }]
    }
    render(){
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
export default PremixedStorageBin