import React from "react";
import {Input} from "antd";

class Tr extends React.Component{
    constructor(props){
        super(props);
    };
    defaultChange = (e)=>{
        this.props.getData(e)
    };
    valueChange=(e)=>{
        this.props.getValue(e);
    };
    render(){
        return(
            <tr>
                <td className="productName">{this.props.value.name}</td>
                <td className="productCheck"><input onChange={this.defaultChange} value={this.props.value.code} defaultChecked={this.props.flag} className="defaultRadio" type="checkbox" name="defaultCheck"/></td>
                <td className="productValue"><Input style={{border:'none',textAlign:'left'}} defaultValue={this.props.WeiValue} name={this.props.value.code} onChange={this.valueChange}/></td>
            </tr>
        )
    }
};
export default Tr