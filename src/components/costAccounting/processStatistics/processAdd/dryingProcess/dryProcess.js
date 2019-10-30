import React,{Component} from 'react'
import {Table} from 'antd'
class DryProcess extends Component{//烘干工序
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'物料点',
            dataIndex:'SyntheticNumber',
            key:'SyntheticNumber'
        },{
            title:'重量',
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
export default DryProcess