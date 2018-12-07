import React from 'react';
import { Button, Modal, Form, Input,message,Select } from 'antd';
import axios from 'axios';
import AddButton from '../BlockQuote/addButton'

const Option = Select.Option;
const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        server
        render() {
            this.server= localStorage.getItem("remote")
            const { visible, onCancel, onCreate, form,fatherMenu } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    closable={false}
                    title="新增"
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={() => onCreate()}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={() => onCancel()}>返 回</Button>
                      ]}>
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
                                <Select onChange={this.props.selectChange}>
                                    <Option value='1'>父菜单</Option>
                                    <Option value='2'>子菜单</Option>
                                </Select>
                            )}
                        </FormItem>
                       {
                           this.props.visible1 === true ?  <FormItem label='父菜单选择' labelCol={{span:5}} wrapperCol={{ span: 14 }} required >
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

class AddModal extends React.Component {
    server
    state = {
        visible: false,
        visible1:false,
        Authorization : localStorage.getItem('Authorization')
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ visible: false,visible1:false });
        form.resetFields();
    };

    selectChange= (value) =>{
        if(value==='1'){
            this.setState({
                visible1 : false
            })
        }else if(value==='2'){
            this.setState({
                visible1 : true
            })
        }
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log(values)
            
            axios({
                url : `${this.server}/jc/auth/menu/add`,
                method:'post',
                headers:{
                    'Authorization': this.state.Authorization
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
            this.setState({ visible: false,visible1:false });
        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        this.server = localStorage.getItem("remote")
        return (
            <span>
                < AddButton handleAdd={this.showModal}/>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    fatherMenu = {this.props.fatherMenu}
                    visible1={this.state.visible1}
                    selectChange={this.selectChange}
                />
            </span>
        );
    }
}

export default AddModal;