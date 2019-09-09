import React from "react";

class Tr extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <tr>
                <td className="isDefault" style={{textAlign:"center"}}>{this.props.index}</td>
                <td className="isDefault" style={{textAlign:"center"}}>{this.props.value.authName}</td>
                <td className="isDefault" style={{textAlign:"center"}}><input type="checkbox" className="defaultCheck" name="defaultCheck"/></td>
            </tr>
        )
    }
}
export default Tr