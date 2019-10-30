import React,{Component} from 'react'
import {Table} from 'antd'
class SingleCrystal extends Component{//单晶体配置
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
            title:'本期浓度',
            dataIndex:'currentConcentration',
            key:'currentConcentration'
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
export default SingleCrystal