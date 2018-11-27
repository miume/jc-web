import React from 'react';
import { Button, Modal, Form, Input,message,Select } from 'antd';
import axios from 'axios';

const Option = Select.Option;
const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        constructor(props){
            super(props)
            this.state={
                visible1:false,
            }
        }
        selectChange= (value) =>{
            if(value=='1'){
                this.setState({
                    visible1:false
                })
            }else if(value=='2'){
                this.setState({
                    visible1:true
                })
            }
        }
        render() {
            const { visible, onCancel, onCreate, form,fatherMenu } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="新增"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form horizontal='true'>
                        <FormItem label="菜单名称" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('menuName', {
                                rules: [{ required: true, message: '请输入菜单名称' }],
                            })(
                                <Input placeholder='请输入菜单名称'/>
                            )}
                        </FormItem>
                        <FormItem label="菜单类型" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('menuType', {
                                rules: [{ required: true, message: '请选择菜单类型' }],
                                initialValue : '1'
                            })(
                                <Select onChange={this.selectChange}>
                                    <Option value='1'>父菜单</Option>
                                    <Option value='2'>子菜单</Option>
                                </Select>
                            )}
                        </FormItem>
                       {
                           this.state.visible1 === true ?  <FormItem label='父菜单选择' labelCol={{span:5}} wrapperCol={{ span: 14 }} required >
                           {getFieldDecorator('parent',{
                               initialValue: '',
                               rules: [{required: true, message: '请选择父菜单'}],
                           })(    //2、getFieldDecorator 的使用方法，
                               <Select>
                               {
                                   fatherMenu.map(de=>{
                                       return(
                                       <Option key={de.id} value={de.id}>{de.menuName}</Option>
                                       );
                                   })
                               }
                               </Select>
                               )}
                       </FormItem> :  null
                       }
                    </Form>
                </Modal>
            );
        }
    }
);

/**这是个令牌，每次调用接口都将其放在header里 */
const Authorization = localStorage.getItem('Authorization');
class AddModal extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ visible: false });
        form.resetFields();
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log(values)
            axios({
                url : 'http://192.168.1.105:8081/jc/menu/add',
                method:'post',
                headers:{
                    'Authorization': Authorization
                },
                data: values,
                type:'json'
            }).then((data) => {
                message.info(data.data.message);
                this.props.fetch(); // 重新调用分页函数
            }).catch(function (error) {
                message.info(error.data.message);
            });
            // 将value传给后台
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        return (
            <span>
                <Button type="primary" size="small" style={{marginRight:'15px'}} onClick={this.showModal}>新增</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    fatherMenu = {this.props.fatherMenu}
                />
            </span>
        );
    }
}

export default AddModal;