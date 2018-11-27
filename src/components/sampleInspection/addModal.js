import React from 'react';
import { Button, Modal, Form, Input,message,Select,DatePicker,TimePicker  } from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const CollectionCreateForm = Form.create()(
    class extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                visible : false,
            }
        }
        onChange = (date, dateString) => {
            console.log(date, dateString);
          }
        render(){
            const {visible,form,onCancel,onCreate} = this.props;
            const { getFieldDecorator } = form;
            return(
                <Modal
                    visible={visible}
                    title="新增"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form horizontal='true'>
                        <FormItem label="送样日期" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('date', {
                                rules: [{ required: true, message: '请选择送样日期' }],
                            })(
                                <DatePicker onChange={this.onChange}/>
                            )}
                        </FormItem>
                        <FormItem label="送样时间" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('time', {
                                rules: [{ required: true, message: '请选择送样时间' }],
                            })(
                                <TimePicker />
                            )}
                        </FormItem>
                        <FormItem label="送样人" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('person', {
                                rules: [{ required: true, message: '请选择送样人' }],
                            })(
                                <Select>
                                    <Option value='-1'>张三</Option>
                                    <Option value='0'>李四</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="送样工厂" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('factory', {
                                rules: [{ required: true, message: '请选择送样工厂' }],
                            })(
                                <Select>
                                    <Option value='-1'>兵工厂</Option>
                                    <Option value='0'>食品厂</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="检测项目" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('item', {
                                rules: [{ required: true, message: '请选择检测项目' }],
                            })(
                                <Select>
                                    <Option value='-1'>铅</Option>
                                    <Option value='0'>硫</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="批号" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('number', {
                                rules: [{ required: true, message: '请输入批号' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="异常备注" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('remarks', {
                                rules: [{ required: true, message: '请输入异常备注' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    }
);

class AddModal extends React.Component{
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

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    onCreate = () =>{
        this.setState({ visible: false });
    }

    render(){
        return(
            <span>
                <Button type="primary" size="small" style={{marginRight:'15px'}} onClick={this.showModal}>新增</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.onCreate}
                />
            </span>
        )
    }
}

export default AddModal