import React, { Component } from 'react';
import {Modal} from 'antd'; 
import CancleButton from '../../BlockQuote/cancleButton';
import NewButton from '../../BlockQuote/newButton';
import DetailModal from './detailModal';

class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
        }
        this.showModal=this.showModal.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        });
    }
   handleCancel(){
     this.setState({visible:false});
   }
    render(){
        return(
            <span>
                <span className='blue' onClick={this.showModal}>详情</span>
                <Modal
                   title='数据详情'
                   visible={this.state.visible}
                   maskClosable={false}
                   closable={false}
                   footer={[
                      <CancleButton key='cancel'  handleCancel={this.handleCancel} flag={1}/>,
                      <NewButton key='interate' name='迭代'/>
                   ]}
                 >
                 <DetailModal record={this.props.record} raw={this.props.raw} factory={this.props.factory} />
                 </Modal>
            </span>
        );
    }
}
export default Detail;