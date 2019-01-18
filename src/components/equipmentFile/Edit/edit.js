import React, { Component } from 'react';
import {Modal} from 'antd';
import EditModal from './editModal';
import CancleButton from '../../BlockQuote/cancleButton';
import SaveButton from '../../BlockQuote/saveButton';
import NewButton from '../../BlockQuote/newButton';
class Edit extends Component{
    constructor(props){
         super(props);
         this.state={
            title:'',
            visible:false,
        }
        this.showModal=this.showModal.bind(this);
        this.handleAddSave=this.handleAddSave.bind(this);
        this.handleEditSave=this.handleEditSave.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    showModal(){
        this.setState({visible:true});
        if(this.props.flag){//为真的话显示编辑
            this.setState({
                title:'编辑数据'
            })
        }
        else{
            this.setState({
                title:'新增数据'
            })
        }
    } 
    handleAddSave(){
        this.setState({
            visible:false
        });   
        
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
                {this.props.flag?(<span className='blue' onClick={this.showModal}>编辑</span>)
                :(<NewButton className='fa fa-plus' name='新增' handleClick={this.showModal}/>)}
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                        <SaveButton key='save' handleSave={this.props.flag?this.handleEditSave:this.handleAddSave}/>
                    ]}
                 >
                    <EditModal  wrappedComponentRef={(form) => this.formRef = form} url={this.props.url}/>
                </Modal>
            </span>
        );
    }
}
export default Edit;
