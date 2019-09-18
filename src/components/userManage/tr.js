import React from "react";

class Tr extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <tr>
                <td className="isDefault" style={{textAlign:"center"}}>{this.props.index+1}</td>
                <td className="isDefault" style={{textAlign:"center"}}>{this.props.value.authName}</td>
                <td className="isDefault" style={{textAlign:"center"}}><input type="checkbox" checked={this.props.checked} value={this.props.value.code} className="defaultCheck" name="defaultCheck" onChange={this.props.selectBox}/></td>
            </tr>
        )
    }
}
export default Tr