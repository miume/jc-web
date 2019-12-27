/**车间待处理物料*/
import React ,{Component}from 'react'
import {Table,Input} from 'antd'
import '../positiveAdd.css'
class WorkShopMaterial extends Component{//预烧(窑炉)
    constructor(props){
        super(props)
        this.inputChange=this.inputChange.bind(this);
    }
    inputChange(e){
        this.props.inputChange(e,this.props.processId)
    }
    render(){
        this.tableData = this.props.tagTableData&&this.props.tagTableData[8]&&this.props.tagTableData[8].materials?this.props.tagTableData[8].materials:[]
        return(
            <div >
                  <span className='positive-process-add-workShop'>
                      {
                        this.tableData?this.tableData.map((item,index)=>{
                            return(
                                <span className='positive-process-add-onLine-font' key={index} style={{padding:'1%'}}>
                                   <span className={'positive-process-add-span'}> {item.materialName}</span> : <Input name={`${index}-${item.materialName}`} onChange={this.inputChange} placeholder='请输入'  key={item.code} defaultValue={item.value} style={{width:'200px',marginRight:'20px'}} suffix='kg'/>
                                </span>
                            )
                        }):null
                      }
                  </span>
            </div>
        )
    }
}

export default WorkShopMaterial