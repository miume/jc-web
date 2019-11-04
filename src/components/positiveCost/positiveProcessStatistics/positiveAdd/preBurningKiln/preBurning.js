import React ,{Component}from 'react'
import {Table,Input} from 'antd'
class PreBuring extends Component{//预烧(窑炉)
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
            title:'入炉排数',
            dataIndex:'enterFurnace',
            key:'enterFurnace'
        },{
            title:'出炉排数',
            dataIndex:'outFurnace',
            key:'outFurnace'
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
                <div style={{marginTop:'20px'}}>预烧料 : <Input placeholder='请输入' style={{width:'120px'}} suffix="kg"/>
                </div>
            </div>
        )
    }
}

export default PreBuring