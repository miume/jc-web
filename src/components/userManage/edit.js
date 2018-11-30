import React from 'react';
import {Button,Modal} from 'antd';
import UserEditModal from './userEditModal';
class Edit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false
        }
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    /**处理新增一条记录 */
    showModal = () => {
        this.setState({
          visible: true
        });
      }
    handleOk() {
        console.log(this.formRef.getItemsValue());
        this.setState({
        visible: false
        });
    }
    handleCancel() {
        this.setState({
        visible: false
        });
    }
    //部门管理的下拉框改变
    handleChange(value){
        console.log(`selected:${value}`);
    }
    render() {
        return (
          <span>  
            <a onClick={() => this.showModal()}>编辑</a>
            <Modal title="编辑" visible={this.state.visible}
                 onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}
                 footer={[
                    <Button key="submit" type="primary" size="large" onClick={() => this.handleOk()}>确 定</Button>,
                    <Button key="back" type="ghost" size="large" onClick={() => this.handleCancel()}>返 回</Button>]}>
                    <UserEditModal    wrappedComponentRef={(form) => this.formRef = form}></UserEditModal>
            </Modal>
          </span> 
        );
    }
}
export default Edit;