import React,{Component} from 'react'
import {Table} from 'antd'
class Other extends Component{//烘干工序
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'名称',
            dataIndex:'name',
            key:'name'
        },{
            title:'重量(T)',
            dataIndex:'weight',
            key:'weight'
        },{
            title:'Ni(%)',
            dataIndex:'Ni',
            key:'Ni'
        },{
            title:'Co(%)',
            dataIndex:'Co',
            key:'Co'
        },{
            title:'Mn(%)',
            dataIndex:'Mn',
            key:'Mn'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation'
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
        );
    }
}
export default Other