import React from "react";
import {Input} from "antd";
import "./tr.css"

class Tr extends React.Component{
    constructor(props){
        super(props)
    };
    defaultChange = (e)=>{//监听复选框
        this.props.getData(e)
        //console.log(e.target.value) //code
        //console.log(e.target.checked)//true false
    };
    valueChange=(e)=>{//监听输入框
        this.props.getValue(e);
        //console.log(e.target.value)//输入框填的值
        //console.log(e.target.name)//code
    };
    render(){
        return(
            <tr>
                <td className="productName">{this.props.value.name}</td>
                <td className="productCheck"><input onChange={this.defaultChange} defaultChecked={this.props.flag} value={this.props.value.code}  type="checkbox" name="defaultCheck"/></td>
                <td className="productValue"><Input style={{border:'none',textAlign:'left',padding:0}} defaultValue={this.props.weightVal}name={this.props.value.code} onChange={this.valueChange} placeholder={'请输入权重'}/></td>
            </tr>
        )
    }
};
export default Tr