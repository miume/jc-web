import React from 'react';
import { Button, Modal, Form, Input,message,Select } from 'antd';
import axios from 'axios';
import Tr from './tr';
import WhiteSpace from '../BlockQuote/whiteSpace';

const Option = Select.Option;
const FormItem = Form.Item;
const userId = localStorage.getItem('userId')
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        constructor(props){
            super(props)
            this.state={
                visible : false,
                count: 1,
                data : [1]
            }
        }
        addData() {
            const {count,data} = this.state;
            this.setState({
                count: count+1,
                data: [...data, count+1],
            })
            console.log(this.state)
        }
        /**删除一条数据 */
        deleteRow(value){
            const {count,data} = this.state;
            this.setState({
                count:count-1,
                data:data.filter(d=>d.toString()!==value)
            })
        }
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
                        <FormItem label="流程名称" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入流程名称' }],
                            })(
                                <Input placeholder='请输入菜单名称'/>
                            )}
                        </FormItem>
                        <FormItem label="是否紧急" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('isUrgent', {
                                rules: [{ required: true, message: '请选择紧急类型类型' }],
                            })(
                                <Select onChange={this.selectChange}>
                                    <Option value='-1'>不紧急</Option>
                                    <Option value='0'>紧急</Option>
                                </Select>
                            )}
                        </FormItem>
                        <table style={{width:'100%'}}>
                             <thead className='thead'>
                                 <tr>
                                     <td>负责人</td>
                                     <td>职责</td>
                                     <td>操作</td>
                                 </tr>
                             </thead>
                             <tbody>
                             {
                                this.state.data.map((m) => { return <Tr key={m.toString()} deleteRow={this.deleteRow} value={m.toString()}></Tr> })
                             }
                             </tbody>
                         </table>
                         <WhiteSpace />
                         <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/>
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
            axios({
                url : 'http://192.168.1.105:8081/jc/batchAuditTask/add',
                method:'post',
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