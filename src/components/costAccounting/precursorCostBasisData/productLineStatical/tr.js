import React from "react";
import {Input} from "antd";
import "./tr.css"

class Tr extends React.Component{
    constructor(props){
        super(props)
    };
    defaultChange = (e)=>{
        this.props.getData(e)
        // console.log(e.target.value)
        // console.log(e.target.checked)
    };
    valueChange=(e)=>{
        this.props.getValue(e);
        // console.log(e.target.value)
        // console.log(e.target.name)
    };
    render(){
        return(
            <tr>
                <td >{this.props.value.name}</td>
                <td ><input onChange={this.defaultChange} value={this.props.value.code}  type="checkbox" name="defaultCheck"/></td>
                <td ><Input style={{border:'none',textAlign:'left',padding:0}} name={this.props.value.code} onChange={this.valueChange} placeholder={'请输入权重'}/></td>
            </tr>
        )
    }
};
export default Tr