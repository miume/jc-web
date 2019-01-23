import React, { Component } from 'react';
import {Modal} from 'antd';
import EditModal from './editModal';
import CancleButton from '../../BlockQuote/cancleButton';
import SaveButton from '../../BlockQuote/saveButton';
//import NewButton from '../../BlockQuote/newButton';
class Edit extends Component{
    constructor(props){
         super(props);
         this.state={
            visible:false,
        }
        this.showModal=this.showModal.bind(this);
        this.handleEditSave=this.handleEditSave.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    showModal(){
        this.setState({visible:true});
    } 
  
    handleEditSave(){
        this.setState({
            visible:false
        });
    }
    handleCancel(){
       this.setState({visible:false})
        
    }
    render(){
        return(
            <span>
                <span className='blue' onClick={this.showModal}>编辑</span>
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                        <SaveButton key='save' handleSave={this.handleEditSave}/>
                    ]}
                 >
                   <EditModal  wrappedComponentRef={(form) => this.formRef = form} url={this.props.url} record={this.props.record} supplyManufacture={this.props.supplyManufacture} repairManufacture={this.props.repairManufacture} equipmentBaseInstrument={this.props.equipmentBaseInstrument}/>
                    
                </Modal>
            </span>
        );
    }
}
export default Edit;
