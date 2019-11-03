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
                <span>1#线产品型号：</span>
                <Select onChange={this.handleSelect1} placeholder='请选择产线' style={{width:'100px',marginRight:'10px'}}>
                    <Option value={1}>5503</Option>
                </Select>
                <span>2#线产品型号：</span>
                <Select onChange={this.handleSelect2} placeholder='请选择产线' style={{width:'100px',marginRight:'10px'}}>
                    <Option value={1}>5503</Option>
                </Select>
                <span>3#线产品型号：</span>
                <Select onChange={this.handleSelect3} placeholder='请选择产线' style={{width:'100px',marginRight:'10px'}}>
                    <Option value={1}>5503</Option>
                </Select>
                <span>4#线产品型号：</span>
                <Select onChange={this.handleSelect4} placeholder='请选择产线' style={{width:'100px'}}>
                    <Option value={1}>5503</Option>
                </Select>
            </span>
        )
    }
}
export default SelectLine