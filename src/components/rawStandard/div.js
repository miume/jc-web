import React, { Component } from 'react';
import {Input,Icon} from 'antd';
import './block.css';
class DataPart extends Component{
  render(){
      
      return(
          <div className={this.props.flag?'rawStanstdardBlockAdd':'rawStanstdardBlock'} onClick={this.props.onBlockChange}>
             <div>{this.props.flag1?(<Input placeholder={`请输入${this.props.name1}名称`} onChange={this.props.addChange}  className='rawStandardInput' addonAfter ={<i className='fa fa-check block-input-i' onClick={this.props.addEvent}/>}></Input>)
                      :(<p id={`${this.props.id}-${this.props.name}`} ><i className={this.props.flag?'fa fa-plus':'hide'}></i> {this.props.name}</p>)
                    }
             </div> 
          </div>
      );
  }
}
export default DataPart;//每个小块的组件