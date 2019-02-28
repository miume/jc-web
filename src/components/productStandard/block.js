import React, { Component } from 'react';
import axios from 'axios';
import {Popover,Switch,Button,Input,message} from 'antd';
class Block extends Component{
    constructor(props){
        super(props);
        this.state = {
            serialNumber : -1
        }
        this.addProduct = this.addProduct.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }
    selectChange(value){
        console.log(value)
        if(value===-1){
            message.info('请选择成品！');
            return
        }
        else{
            this.addProduct(value);
        }
    }
     /**成品新增事件 */
     addProduct(value){
        axios.post(`${this.url.serialNumber.serialNumber}`,{
            materialName:value,
            materialClass:3,
            manufacturerName:'',
            serialNumber:''
        },{
            headers:{
                Authorization:this.url.Authorization
            }
        }).then((data)=>{
            message.info(data.data.message);
            if(data.data.code===0){
                this.getAllProduct();
                this.setState({
                    add:0
                })
            }
        }).catch(()=>{
            message.info('新增失败，请联系管理员！')
        })
    }
  render(){
      /**判断是否存在子型号 */
      if(this.props.isLeaf){
        return(
            <div className='block-overlap block-width'>
                <div id={`${this.props.id}-${this.props.isLeaf?1:0}`} className='block-div' onClick={this.props.onBlockChange}>
                  {this.props.name}
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
                    placement='bottomRight' visible={this.props.visible}> 
                   {/* <div className='block1'>
                    <Select size='large' className='block-input'showArrow={false} placeholder={`请选择${this.props.name}名称`} onChange={this.selectChange} >
                        {this.props.serialNumberChildren}
                    </Select>
                    <Button type="default" size='large' icon='check' onClick={this.props.searchEvent} className='block-button' onClick={this.props.clickI}></Button>
                    </div> */}
                    <Input className='block-input' size='large' placeholder={`请输入${this.props.name}名称`} addonAfter={<i className='fa fa-check block-input-i' onClick={this.props.clickI}  id={`${this.props.id}`} />} />
                </Popover>
                :<div id={`${this.props.id}`}><i className={this.props.flag?'fa fa-plus':'hide'}></i> {this.props.name}</div>
            }
            </div>
                 
        );
      }
      
  }
}
export default Block;//每个小块的组件