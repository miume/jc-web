import React, { Component } from 'react';
import {Modal,message} from 'antd';
import EditModal from './editModal';
import CancleButton from '../../BlockQuote/cancleButton';
import SaveButton from '../../BlockQuote/saveButton';
//import NewButton from '../../BlockQuote/newButton';
import axios from 'axios';
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
  
    handleEditSave(){//点击编辑的保存事件
        this.setState({
            visible:false
        });
        const value=this.formRef.getItemsValue();
       console.log(value.get('file'));
        axios({
            url:`${this.props.url.equipmentArchiveRecord.get}`,
            method:'put',
            headers:{
                'Authorization' :this.props.url.Authorization
            },
            data:value,
            type:'json'
        }).then((data)=>{
             //console.log(data);
             message.info(data.data.message);
             this.props.fetch();
        }).catch(()=>{
            message.info('编辑失败，请联系管理员！');
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
