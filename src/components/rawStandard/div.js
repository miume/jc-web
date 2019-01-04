import React, { Component } from 'react';
import {Input,Icon} from 'antd';
import './block.css';
class DataPart extends Component{
  render(){
      
      return(
          <div className={this.props.flag?'rawStanstdardBlockAdd':'rawStanstdardBlock'} onClick={this.props.onBlockChange}>
             <div>{this.props.flag1?(<Input placeholder='请输入工厂名称' className='rawStandardInput' suffix ={<Icon type="check" style={{color:'#1890ff'}}/>}></Input>)
                      :(<p id={`${this.props.id}-${this.props.name}`} ><i className={this.props.flag?'fa fa-plus':'hide'}></i> {this.props.name}</p>)
                    }
             </div> 
          </div>
      );
  }
}
export default DataPart;//每个小块的组件