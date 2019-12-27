import React ,{Component}from 'react'
import {Table,Input} from 'antd'
class Crush extends Component{//预烧(窑炉)
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
            width:'20%'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine',
            width:'20%'
        },{
            title:'进料量(kg)',
            dataIndex:'inMat',
            key:'inMat',
            width:'20%'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance',
            width:'20%'
        }]
        this.inputChange=this.inputChange.bind(this);
    }
    inputChange(e){
        this.props.inputChange(e,this.props.processId)
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[4]&&this.props.tagTableData[4].materials?this.props.tagTableData[4].materials:[]
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
                  <span className='positive-process-add-onLine'>
                      {
                        this.dataBottom?this.dataBottom.map((item,index)=>{
                            return(
                                <span key={index} className='positive-process-add-onLine-font'>
                                    {item.materialName} : <Input name={`${length+index}-${item.materialName}`} onChange={this.inputChange} placeholder='请输入' key={item.code} defaultValue={item.value} style={{width:'150px',marginRight:'20px'}} />
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

export default Crush