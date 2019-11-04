import React,{Component} from 'react'
import {Table} from 'antd'
class OnlineIngredients extends Component{//在线原料
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'物料种类',
            dataIndex:'materialType',
            key:'materialType'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine'
        },{
            title:'领料量',
            dataIndex:'pick',
            key:'pick'
        },]
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
export default OnlineIngredients