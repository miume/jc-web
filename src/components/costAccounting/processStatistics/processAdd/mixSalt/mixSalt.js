import React,{Component} from 'react'
import {Table} from 'antd'
class MixSalt extends Component{//混合盐配置
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'溶液',
            dataIndex:'solution',
            key:'solution'
        },{
            title:'体积',
            dataIndex:'volume',
            key:'volume'
        },{
            title:'Ni(g/L)',
            dataIndex:'Ni',
            key:'Ni'
        },{
            title:'Co(g/L)',
            dataIndex:'Co',
            key:'Co'
        },{
            title:'Mn(g/L)',
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
export default MixSalt