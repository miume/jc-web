import React, { Component } from 'react';
import './block.css';
class DataPart extends Component{
  render(){
      return(
          <div className='block' >
                 <p>{this.props.name}</p>
          </div>
      );
  }
}
export default DataPart;