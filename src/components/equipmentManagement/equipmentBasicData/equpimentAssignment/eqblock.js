import React from "react";

class Eqblock extends React.Component{
constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)
}
handleClick=(e)=>{
    this.props.changeEqname(e.target.id,this.props.deviceName)
}
    render() {
        return (
            <div className={this.props.colorFlag} id={this.props.id} onClick={this.handleClick}>
                {this.props.deviceName}
            </div>
        );
    }
}
export default Eqblock
