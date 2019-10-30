import React,{Component} from 'react'
import {Table} from 'antd'
class AgingProcess extends Component{//陈化工序
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'物料点名称',
            dataIndex:'materialPointName',
            key:'materialPointName'
        },{
            title:'体积(m³)/重量(T)',
            dataIndex:'volume',
            key:'volume'
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
            title:'含固量(g/L)',
            dataIndex:'solidContent',
            key:'solidContent'
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
        );
    }
}
export default AgingProcess