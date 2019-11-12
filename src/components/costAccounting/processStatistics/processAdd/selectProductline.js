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
                    this.props.headerData?this.props.headerData.map((data)=>{
                        return(
                            <span key={data.line.code}>
                                <span >{data.line.name} : </span>
                                <Select onChange={this.props.handleSelect} placeholder='请选择产线' style={{width:'100px',marginRight:'10px'}}>
                                    <Option name={1} key={data.line.code} value={1}>5505</Option>
                                    <Option name={2} key={data.line.code} value={2}>5505</Option>
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