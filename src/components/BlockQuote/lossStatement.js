import React from 'react';
import {Modal,Input} from 'antd';
import CancleButton from "../BlockQuote/cancleButton";

class Loss extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
        };
    this.showModal=this.showModal.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    }
    handleCancel = () => {
        this.setState({ visible: false });
    };
    showModal = ()=>{
        this.setState({
            visible:true
        })
    }
    render(){
        var statement = this.props.statement
        if(statement === null){
            statement='无'
        }
        return(
            <span>
            <span onClick={this.showModal} className='blue'>{this.props.name}</span>
            <Modal title={this.props.name} visible={this.state.visible}
                closable={false}
                width='360px'
                maskClosable={false}
                centered={true}
                footer={[
                    <CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>
                ]}
            >
                <div className='redListDiv' >
                    {statement}
                </div>
            </Modal>
            </span>
        )
    }
}

export default Loss