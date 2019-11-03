import React,{Component} from 'react'
import {Table,Input} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const data=[{
    id:'1',
    solution:'Mn溶液',
    
}]
class SingleCrystal extends Component{//单晶体配置
    constructor(props){
        super(props);
        this.state={
            data:data
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'溶液',
            dataIndex:'solution',
            key:'solution',
            width:'25%'
        },{
            title:'体积',
            dataIndex:'volume',
            key:'volume',
            width:'25%'
        },{
            title:'本期浓度',
            dataIndex:'currentConcentration',
            key:'currentConcentration',
            render:(text,reocrd)=>{
                return(
                    <Input />
                )
            }
        }]
    }
    render(){
        return(
            <div>
                <NewButton name='获取体积值'/>
                <NewButton name='获取上期浓度'/>
                <Table 
                dataSource={this.state.data}
                rowKey={record=>record.id}
                columns={this.columns}
                size='small' 
                bordered/>
            </div>
        );
    }
}
export default SingleCrystal