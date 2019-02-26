import React, { Component } from 'react';
import {Modal} from 'antd';
import DetailSpan from './detailSpan';
import CancleButton from '../BlockQuote/cancleButton';
class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
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
        this.setState({
            visible:false
        });
    }
    render(){
        return(
            <span>
                <span className='blue' onClick={this.showModal}>详情</span>
                <Modal
                    title='入库详情'
                    visible={this.state.visible}
                    maskClosable={false}
                    closable={false}
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel} flag={1}/>
                    ]}
                    >
                     <DetailSpan record={this.props.record}/>
                </Modal>
            </span>
        );
    }
} 
export default Detail;