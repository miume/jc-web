import React,{Component} from 'react'
import {Table,Input} from 'antd'
class PremixedCoulterMixed extends Component{//预混(犁刀混)
    constructor(props){
        super(props)
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'物料类型',
            dataIndex:'materialName',
            key:'materialName',
            width:'15%'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine',
            width:'15%'
        },{
            title:'次数',
            dataIndex:'value',
            key:'value',
            width:'15%',
            render:(text,record)=>{
                return(
                    <Input value={record.value} name={`${record.index-1}-${'value'}`} onChange={this.inputChange}/>
                )
            }
        },{
            title:'已混量(kg)',
            dataIndex:'mix',
            key:'mix',
            width:'15%'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance',
            width:'15%'
        }]
        this.inputChange=this.inputChange.bind(this);
    }
    inputChange(e){
        this.props.inputChange(e,this.props.processId)
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[1]&&this.props.tagTableData[1].materials?this.props.tagTableData[1].materials:[]
        this.data=[]
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                if( this.tableData[i]['flag']===true){
                    this.tableData[i]['index'] = i + 1
                    this.tableData[i]['productLine']=this.props.productLine&&this.props.productLine.name?this.props.productLine.name:undefined
                    this.data.push(this.tableData[i])
                }
            }
        }
        return(
            <div>
                 <Table
                dataSource={this.data}
                rowKey={record=>record.code}
                columns={this.columns}
                pagination={false}
                scroll={{y:'42vh'}}
                style={{flex:'1',height:'60vh'}}
                size='small'
                bordered/>
            </div>
        )
    }
}
export default PremixedCoulterMixed