import React, { Component } from 'react';
import {Input,Popover,Switch,Button} from 'antd';
class Block extends Component{
  render(){
      if(this.props.isLeaf){
        return(
            <div className='block-overlap block-width'>
                <div className='block-div' onClick={this.props.onBlockChange}>
                  <span id={`${this.props.id}`}>{this.props.name}</span>
            </div>
            </div>   
        );
      }else{
        return(
            <div className={this.props.flag?'block-add block-width':'block block-width block-div'} onClick={this.props.add?null:this.props.onBlockChange} id={`${this.props.id}`}>
            {
                this.props.add?
                <Popover title='该项是否存在子型号？'
                    content={
                    <div className='modal-popover'>
                        <div><span>无子型号</span><Switch onChange={this.props.onChange}/></div>
                        <div className='fr'>
                            <Button key='back' type='ghost' size='small' onClick={this.props.handleCancel} className='button' >取消</Button>
                            <Button key='submit' type='primary' size='small' onClick={this.props.handleOk} className='button' >确定</Button>
                        </div>
                    </div>
                } 
                    placement='bottomRight' visible={this.props.visible} 
                >
                     <Input className='block-input' placeholder={`请输入${this.props.name}名称`} addonAfter={<i className='fa fa-check block-input-i' onClick={this.props.clickI}  id={`${this.props.id}`} />} />
                </Popover>
                :<p id={`${this.props.id}`}><i className={this.props.flag?'fa fa-plus':'hide'}></i> {this.props.name}</p>
            }
            </div>
                 
        );
      }
      
  }
}
export default Block;//每个小块的组件