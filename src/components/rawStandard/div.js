import React, { Component } from 'react';
import './block.css';
class DataPart extends Component{
  render(){
      
      return(
          <div className='rawStanstdardBlock' onClick={this.props.onBlockChange}>
                 <p id={`${this.props.id}-${this.props.name}`} >{this.props.name}</p>
          </div>
      );
  }
}
export default DataPart;//每个小块的组件