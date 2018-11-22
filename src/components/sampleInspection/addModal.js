// import React from 'react';
// import { Button, Modal, Form, Input,message,Select } from 'antd';

// const Authorization = localStorage.getItem('Authorization');
// const FormItem = Form.Item;
// const Option = Select.Option;

// const CollectionCreateForm = Form.create()(
//     class extends React.Component{
//         constructor(props){
//             super(props)
//         }
//         render(){
//             const {visible,form} = this.props;
//             const { getFieldDecorator } = form;
//             return(
//                 <Modal
//                     visible={visible}
//                     title="新增"
//                     okText="确定"
//                     cancelText="取消"
//                     onCancel={onCancel}
//                     onOk={onCreate}
//                     >
//                     <Form horizontal='true'>

//                     </Form>

//                 </Modal>
//             )
//         }
//     }
// )

// class addModal extends React.Component{
//     state = {
//         visible: false,
//     };
//     render(){
//         return (
//             <span>
//                 <Button type="primary" size="small" style={{marginRight:'15px'}} onClick={this.showModal}>新增</Button>
//                 <CollectionCreateForm
//                     wrappedComponentRef={this.saveFormRef}
//                     visible={this.state.visible}
//                     onCancel={this.handleCancel}
//                     onCreate={this.handleCreate}
//                     fatherMenu = {this.props.fatherMenu}
//                 />
//             </span>
//         )
//     }
// }