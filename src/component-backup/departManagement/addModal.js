import React from 'react';
import { Button, Modal, Form, Input,message } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
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
                        <FormItem label="部门名称" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('departmentName', {
                                rules: [{ required: true, message: '请输入部门名称' }],
                            })(
                                <Input placeholder='请输入部门名称'/>
                            )}
                        </FormItem>
                        <FormItem label="描述" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('extraInfo', {
                                initialValue: '',
                            })(
                                <Input placeholder='请输入部门描述' />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

/**这是个令牌，每次调用接口都将其放在header里 */
const Authorization = localStorage.getItem('Authorization');
const server = localStorage.getItem('remote');
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
            axios({
                url : `${server}/jc/department/add`,
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
                />
            </span>
        );
    }
}

export default AddModal;