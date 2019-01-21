import React, { Component } from 'react';
import {Modal,message} from 'antd';
import axios from 'axios';
import AddModal from './addModal';
import CancleButton from '../../BlockQuote/cancleButton';
import SaveButton from '../../BlockQuote/saveButton';
import NewButton from '../../BlockQuote/newButton';
class Add extends Component{
    constructor(props){
         super(props);
         this.state={
            title:'',
            visible:false,
            reset:false
        }
        this.showModal=this.showModal.bind(this);
        this.handleAddSave=this.handleAddSave.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    showModal(){
        this.setState({visible:true});
      
    } 
    handleAddSave(){
        const value=this.formRef.getItemsValue();//获取新增的表单内容
        //console.log(value);
        //console.log(value.get('file'));
        axios({
             url:`${this.props.url.equipmentArchiveRecord.get}`,
             method:'post',
             headers:{
                 'Authorization':this.props.url.Authorization
             },
             data:value,
             type:'json'
        })
        .then((data)=>{
           //console.log(data);
           message.info(data.data.message);
           this.fetch();
           this.pagination.current=1;//新增的记录要显示在第一页，
        })
        .catch(()=>{
            message.info('新增失败，请联系管理员!')
        });
        this.setState({
            visible:false
        }); 
        /**清空新增form组件的内容*/
        //this.formRef.resetField();
    } 
  
    handleCancel(){
       this.setState({visible:false})
       /**清空新增form组件的内容*/
     // this.formRef.resetField();
    }
    render(){
        return(
            <span>
                <NewButton className='fa fa-plus' name='新增' handleClick={this.showModal}/>
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                        <SaveButton key='save' handleSave={this.handleAddSave}/>
                    ]}
                 >
                    {
                        <AddModal  wrappedComponentRef={(form) => this.formRef = form} reset={this.state.reset} url={this.props.url} supplyManufacture={this.props.supplyManufacture} repairManufacture={this.props.repairManufacture} equipmentBaseInstrument={this.props.equipmentBaseInstrument}/>
                    }
                </Modal>
            </span>
        );
    }
}
export default Add;
