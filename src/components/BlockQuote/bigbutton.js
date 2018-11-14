import React from 'react';
class DataButton extends React.Component{
    render(){
        return (
            <button style={{width:'280px',height:'120px' ,backgroundColor:'#ebebeb', margin:'25px', border:'solid 1px black',fontSize:'17px'}} id={this.props.id} onClick={this.props.click} value={this.props.path}>{this.props.name}</button>
        );
    }
}
export default DataButton;