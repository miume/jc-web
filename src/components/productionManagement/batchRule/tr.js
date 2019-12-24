import React from "react";
import {Input,Radio} from "antd";
import "./tr.css"

class Tr extends React.Component{
    constructor(props){
        super(props)
    }
    codeChange = (e)=>{
        this.props.getData(this.props.index,"ruleValue",e.target.value);
    }
    desChange = (e)=>{
        this.props.getData(this.props.index,"ruleDesc",e.target.value);
    }

    defaultChange = (e)=>{
        this.props.getRadio(this.props.index,e.target.checked);
    }
    render(){
        return(
            <tr><td className="isDefault"><Input onChange={this.codeChange} style={{border:'none',textAlign:'left'}} value={this.props.value.ruleValue}  placeholder={'请输入规则代码'}/></td>
                <td className="isDefault"><Input onChange={this.desChange} style={{border:'none',textAlign:'left'}} value={this.props.value.ruleDesc} placeholder={'请输入说明'} /></td>
                <td className="isDefault"><Radio onChange={this.defaultChange} checked={!this.props.value.defaultFlag} className="defaultRadio" style={{marginLeft:'20px'}}/></td>
                <td className="isDefault"><span style={{marginLeft:"4px"}} onClick={this.props.deleteRow.bind(this,this.props.index)} className='blue'>删除</span></td>
            </tr>
        )
    }
}

export default Tr