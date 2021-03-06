import React,{Component} from 'react'
import {Select,Button} from 'antd'
import '../process.css'
import ReadRecipe from './readRecipe'
const {Option}=Select
class SelectLine extends Component{
    constructor(props){
        super(props)
    }
 
    render(){
        return(
            <span style={{float:'right'}}>
                {
                    this.props.headerData?this.props.headerData.map((data,index)=>{
                        return(
                            <span key={data.line.code}>
                                <span >{data.line.name} : </span>
                                {/* <Select  onChange={this.props.handleSelect} defaultValue={this.props.headerData[index].product?this.props.headerData[index].product:undefined} placeholder='产品型号' style={{width:'120px',marginRight:'10px',}}>
                                    {
                                        data.products.map((pro)=>{
                                            return(
                                                <Option key={pro} name={data.line.code} value={pro}>{pro}</Option>
                                            )
                                        })
                                    }
                                </Select> */}

                                <ReadRecipe/>
                            </span>
                        )
                    }):null
                }
            </span>
        )
    }
}
export default SelectLine