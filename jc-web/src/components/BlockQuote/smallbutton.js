import React from 'react';
class SmallButton extends React.Component{
    render(){
        return (
            <button style={{width:'100px',height:'40px',backgroundColor:'#ebebeb',marginRight:'10px'}} id={this.props.id} onClick={this.props.click} >{this.props.name}</button>
        );
    }
}
export default SmallButton