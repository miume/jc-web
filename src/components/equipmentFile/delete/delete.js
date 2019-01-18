import React, { Component } from 'react';
import {Modal} from 'antd';
import CancleButton from '../../BlockQuote/cancleButton';
import NewButton from '../../BlockQuote/newButton';
import '../equipmentFile.css'
class Delete extends Component{
        constructor(props){
            super(props);
            this.state={
                visible:false
            }
            this.showModal=this.showModal.bind(this);
            this.handleCancel=this.handleCancel.bind(this);
            this.handleDelete=this.handleDelete.bind(this);
        }
        showModal(){
           this.setState({
               visible:true
           })
        }
        handleDelete(){
            
            this.setState({
                visible:false
            });
        }
        handleCancel(){
            this.setState({
                   visible:false
            })
        }
         render(){
             return(
                 <span>
                     <span className='blue' onClick={this.showModal}>删除</span>
                      <Modal
                          title='确定删除?'
                          visible={this.state.visible}
                          centered
                          closable={false}
                          maskClosable={false}
                          width='360px'
                          footer={[
                              <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                              <NewButton key='new' name='确定' handleClick={this.handleDelete}/>
                          ]}
                       >
                           <p className='equipmentFile-p'>该操作无法撤销，请确定是否删除所选择的数据</p>
                      </Modal>
                 </span>
             );
         }
}
export default Delete;