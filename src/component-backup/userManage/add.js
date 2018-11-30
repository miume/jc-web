import React from 'react';
import {Button,Modal} from 'antd';
import UserAddModal from './userAddModal';
class Add extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    /**处理新增一条记录 */
    handleAdd = () => {
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
    render() {
        return (
            <span>
                <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={this.handleAdd} >新增</Button>
                <Modal title="新增" visible={this.state.visible}
                    onCancel={this.handleCancel}  width='650px'
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>
                    ]}>
                    <UserAddModal wrappedComponentRef={(form)=>this.formRef=form}></UserAddModal>
                    
                </Modal>
            </span>
        );
    }
}
export default Add;