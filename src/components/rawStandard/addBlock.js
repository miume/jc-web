import React, { Component } from 'react';
import {Input} from 'antd';
import './block.css';
class AddBlock extends Component{
  render(){
      return(
         <div>
             <div>{this.props.flag?(<div className='rawStanstdardBlockAdd' onClick={this.props.onBlockChange}><p id={`${this.props.id}-${this.props.name}`} ><i className='fa fa-plus'></i> {this.props.name}</p></div>)
                  :(<div><Input placeholder='请输入工厂名称' className='rawStandardInput'></Input></div>)}
             </div>         
         </div>
      );
  }
}
export default AddBlock;