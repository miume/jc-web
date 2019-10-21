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
                <td className="productName">{this.props.value.name}</td>
                <td className="productCheck"><input onChange={this.defaultChange} value={this.props.value.code} className="defaultRadio" type="checkbox" name="defaultCheck"/></td>
                <td className="productValue"><Input style={{border:'none',textAlign:'left'}} name={this.props.value.code} onChange={this.valueChange}/></td>
            </tr>
        )
    }
};
export default Tr