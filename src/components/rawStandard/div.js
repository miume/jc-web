import React, { Component } from 'react';
import './block.css';
class DataPart extends Component{
    constructor(props){
     super(props);
     this.state={
         blockChange:''
     }
    // this.onBlockChange=this.onBlockChange.bind(this);
    }
    
  render(){
      
      return(
          <div className='rawStanstdardBlock' onClick={this.props.onBlockChange}>
                 <p id={this.props.id}>{this.props.name}</p>
          </div>
      );
  }
}
export default DataPart;