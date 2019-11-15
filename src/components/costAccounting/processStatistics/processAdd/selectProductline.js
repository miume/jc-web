import React,{Component} from 'react'
import {Select} from 'antd'
import '../process.css'
const {Option}=Select
class SelectLine extends Component{
    constructor(props){
        super(props)
       
    }
   
    render(){
        return(
            <span >
               
                {
                    this.props.headerData?this.props.headerData.map((data,index)=>{
                        return(
                            <span key={data.line.code}>
                                <span >{data.line.name} : </span>
                                <Select onChange={this.props.handleSelect}  placeholder='请选择产线' style={{width:'100px',marginRight:'10px'}}>
                                    {
                                        data.products.map((pro,index1)=>{
                                            return(
                                                <Option key={pro} name={data.line.code} value={pro}>{pro}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </span>
                        )
                    }):null
                }
            </span>
        )
    }
}
export default SelectLine