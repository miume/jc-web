import React, { Component } from 'react';
import './block.css';
class DataPart extends Component{
  render(){
      
      return(
          <div className={this.props.flag?'rawStanstdardBlockAdd':'rawStanstdardBlock'} onClick={this.props.onBlockChange}>
                 <p id={`${this.props.id}-${this.props.name}`} ><i className={this.props.flag?'fa fa-plus':'hide'}></i> {this.props.name}</p>
          </div>
      );
  }
}
export default DataPart;//每个小块的组件