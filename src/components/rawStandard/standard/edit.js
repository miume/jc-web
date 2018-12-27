import React, { Component } from 'react';
import {Modal} from 'antd';
import CancleButton from '../../BlockQuote/cancleButton';

class  Edit extends Component{
    constructor(props){
        super(props);
        this.state={
              visible:false,
        }
        this.showModal=this.showModal.bind(this);
        this.notShowModal=this.notShowModal.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        });
    }
    notShowModal(){
        this.setState({
            visible:false
        });
    }
    handleCancel(){
        this.setState({
            visible:false
        });
    }
    handleOk(){
        this.setState({
            visible:false
        });
    }
    render(){
        return(
            <span>
                <span className={this.props.editFlag?'blue':'notClick'} onClick={this.props.editFlag?this.showModal:this.notShowModal}>编辑</span>
                <Modal
                    visible={this.state.visible}
                    maskClosable={false}
                    closable={false}
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel} flag={1}/>,
                        
                    ]}
                />
            </span>
        );
    }
}
export default Edit;
