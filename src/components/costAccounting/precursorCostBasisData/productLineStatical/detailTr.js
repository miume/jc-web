import React from "react";
import {Input} from "antd";
import "./tr.css"

class Tr extends React.Component{
    constructor(props){
        super(props);
        // this.state={
        //     // flag:(function(){for(var i in this.props.weightValue){
        //     //     if(this.props.weightValue[i].lineCode == this.props.value.code){
        //     //         return "checked"
        //     //     };
        //     //     return undefined
        //     // }})(),
        //     // WeiValue:(function(){for(var i in this.props.weightValue){
        //     //     if(this.props.weightValue[i].lineCode == this.props.value.code){
        //     //         return this.props.weightValue[i].weightValue
        //     //     };
        //     //     return undefined
        //     // }})(),
        //     flag:this.props.flag,
        //     WeiValue:this.props.WeiValue
        // }
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
                <td className="productCheck"><input onChange={this.defaultChange} value={this.props.value.code} defaultChecked={this.props.flag} className="defaultRadio" type="checkbox" name="defaultCheck"/></td>
                <td className="productValue"><Input style={{border:'none',textAlign:'left'}} defaultValue={this.props.WeiValue} name={this.props.value.code} onChange={this.valueChange}/></td>
            </tr>
        )
    }
};
export default Tr