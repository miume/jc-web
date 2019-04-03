import React from 'react';
class AuthInput extends React.Component{
    render(){
        return(
            <span style={{display:'inline-block',minWidth:75}}>
                <input type='checkbox' value={this.props.value} id={this.props.id} onChange={this.props.change} checked={this.props.checked} /> &nbsp;{this.props.operationName}</span>
        );
    }
}
export default AuthInput;