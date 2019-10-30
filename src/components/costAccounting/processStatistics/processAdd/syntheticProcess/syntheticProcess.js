import React,{Component} from 'react'
import {Table} from 'antd'
class SyntheticProcess extends Component{//合成工序
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'合成槽号',
            dataIndex:'SyntheticNumber',
            key:'SyntheticNumber'
        },{
            title:'体积',
            dataIndex:'volume',
            key:'volume'
        },{
            title:'含固量(g/L)',
            dataIndex:'solidContent',
            key:'solidContent'
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
export default SyntheticProcess