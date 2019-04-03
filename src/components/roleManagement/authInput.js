import React from 'react';
class AuthInput extends React.Component{
    render(){
        return(
            <span className='displayBlock'>
                <input type='checkbox' value={this.props.value} id={this.props.id} onChange={this.props.change} defaultChecked={this.props.checked} /> &nbsp;{this.props.operationName}</span>
        );
    }
}
export default AuthInput;