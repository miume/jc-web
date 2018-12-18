import React from 'react';
class SmallButton extends React.Component{
    render(){
        return (
            <button style={{width:'80px',height:'40px',backgroundColor:'#e4e4e4',marginRight:'10px',borderRadius:'3px'}} id={this.props.id} onClick={this.props.click} >{this.props.name}</button>
        );
    }
}
export default SmallButton
