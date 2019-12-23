import React from "react";
import {Input} from "antd";
import "./tr.css"

class Tr extends React.Component{
    constructor(props){
        super(props)
    }
    codeChange = (e)=>{
        const {value} = this.props;
        value.ruleValue = e.target.value;
        this.props.getData(value);
    }
    desChange = (e)=>{
        const {value} = this.props;
        value.ruleDesc = e.target.value;
        this.props.getData(value);
    }
    defaultChange = (e)=>{
        const {value} = this.props;
        value.defaultFlag = false;
        this.props.getRadio(value);
    }
    render(){
        // console.log(this.props.value.defaultFlag)
        return(
            <tr><td className="isDefault"><Input onChange={this.codeChange} style={{border:'none',textAlign:'left'}} value={this.props.value.ruleValue}  placeholder={'请输入规则代码'}/></td>
                <td className="isDefault"><Input onChange={this.desChange} style={{border:'none',textAlign:'left'}} value={this.props.value.ruleDesc} placeholder={'请输入说明'} /></td>
                <td className="isDefault"><input onChange={this.defaultChange} checked={!this.props.value.defaultFlag} type="radio" className="defaultRadio" name="defaultRadio"/></td>
                <td className="isDefault"><span style={{marginLeft:"4px"}} onClick={this.props.deleteRow.bind(this,this.props.id)} className='blue'>删除</span></td>
            </tr>
        )
    }
}

export default Tr