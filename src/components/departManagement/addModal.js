import React from 'react';
import { Modal, Form, Input,message } from 'antd';
import NewButton from '../BlockQuote/newButton';
import CancleButton from '../BlockQuote/cancleButton';
import axios from 'axios';

const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, handleCancel, handleOk, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="新增"
                    closable={false}
                    footer={[
                        <CancleButton key='back' handleCancel={handleCancel}/>,
                        <NewButton key="submit" handleClick={handleOk} name='确定' style='button' className='fa fa-check' />
                    ]}
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

class AddModal extends React.Component {
    Authorization;
    server;
    constructor(props){
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
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
    handleOk = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            axios({
                url : `${this.server}/jc/auth/department/add`,
                method:'post',
                headers:{
                    'Authorization': this.Authorization
                },
                data: values,
                type:'json'
            }).then((data) => {
                message.info(data.data.message);
                this.props.fetch(); // 重新调用分页函数
            }).catch(function () {
                message.info('新增失败，请联系管理员！');
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
        /**这是个令牌，每次调用接口都将其放在header里 */
        this.Authorization = localStorage.getItem('Authorization');
        /**这是服务器网址及端口 */
        this.server = localStorage.getItem('remote');
        return (
            <span>
                <NewButton handleClick={this.showModal} name='新增' style='button' className='fa fa-plus' />
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    handleCancel={this.handleCancel}
                    handleOk={this.handleOk}
                />
            </span>
        );
    }
}

export default AddModal;