import React, { Component } from 'react';
import {Input} from 'antd';
class Block extends Component{
  render(){
      return(
          <div  className={this.props.flag?'block-add block-width':'block block-width block-div'} onClick={this.props.onBlockChange}>
          {
              this.props.add?<Input className='block-input' placeholder='请输入产品名称' addonAfter={<i className='fa fa-check block-input-i' onClick={this.props.clickI}/>} />:<p id={`${this.props.id}`}><i className={this.props.flag?'fa fa-plus':'hide'}></i> {this.props.name}</p>
          }
          </div>
               
      );
  }
}
export default Block;//每个小块的组件