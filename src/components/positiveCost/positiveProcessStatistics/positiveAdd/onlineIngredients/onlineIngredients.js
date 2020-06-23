import React,{Component} from 'react'
import {Table,Input} from 'antd'
import '../positiveAdd.css'
class OnlineIngredients extends Component{//在线原料
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'物料种类',
            dataIndex:'materialName',
            key:'materialName',
            width:'18%'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine',
            width:'18%'
        },{
            title:'领料量',
            dataIndex:'receive',
            key:'receive',
            width:'18%',
            render:(text,record)=>{
                return(
                    <Input value={record.receive} name={`${record.index-1}-${'receive'}`} onChange={this.inputChange}/>
                )
            }
        },{
            title:'消耗量',
            dataIndex:'consume',
            key:'consume',
            width:'18%',
            render:(text,record)=>{
                return(
                    <Input value={record.consume} name={`${record.index-1}-${'consume'}`} onChange={this.inputChange}/>
                )
            }
        }]
        this.inputChange=this.inputChange.bind(this);
    }
    inputChange(e){
        this.props.inputChange(e,this.props.processId)
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[0]&&this.props.tagTableData[0].materials?this.props.tagTableData[0].materials:[]
        this.data=[]
        this.dataBottom=[]
        let length=0
        if (this.tableData && this.tableData.length) {
            for (let i = 0; i < this .tableData.length; i++) {
                if( this.tableData[i]['flag']===true){
                    this.tableData[i]['index'] = i + 1
                    this.tableData[i]['productLine']=this.props.productLine&&this.props.productLine.name?this.props.productLine.name:undefined
                    this.data.push(this.tableData[i])
                }
                else{
                    this.dataBottom.push(this.tableData[i])
                }
            }
            length=this.data.length
        }
        return(
            <div>
                <Table
                    dataSource={this.data}
                    rowKey={record=>record.code}
                    columns={this.columns}
                    pagination={false}
                    scroll={{y:'42vh'}}
                    size='small'
                    bordered
                />
                <div style={{marginTop:'20px'}}>
                   <span  className='positive-process-add-onLine'>
                          {
                            this.dataBottom?this.dataBottom.map((item,index)=>{
                                return(
                                    <span className='positive-process-add-onLine-font' key={index}>
                                        {item.materialName} : <Input placeholder='请输入' name={`${length+index}-${'value'}`} onChange={this.inputChange} key={item.code} defaultValue={item.value} style={{width:'150px',marginRight:'20px'}} suffix="kg"/>
                                    </span>
                                )
                            }):null
                          }
                   </span>
                </div>
            </div>
        )
    }
}
export default OnlineIngredients