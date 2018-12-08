import React from 'react';
import { Button, Modal, Form, Input,Select,DatePicker,TimePicker  } from 'antd';
import CancleButton from "../BlockQuote/cancleButton";
import axios from "axios";
import NewButton from '../BlockQuote/newButton'
// import WhiteSpace from '../BlockQuote/whiteSpace';
// import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const CollectionCreateForm = Form.create()(
    class extends React.Component{
        server
        Authorization
        constructor(props){
            super(props)
            this.state = {
                visible : false,
                person : [],
                factor : [],
                items : [],
                serialNumber : [],
            }
        }
        fetch = () =>{
            axios({
                url: `${this.server}/jc/common/authUser/getAll`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    person:res
                  })
            })

            axios({
                url: `${this.server}/jc/common/deliveryFactory/getAll`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    factor:res
                  })
            })

            axios({
                url: `${this.server}/jc/common/testItem/getAll`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    items:res
                  })
            })

            axios({
                url: `${this.server}/jc/common/repoBaseSerialNumber/getAll`,
                method : 'get',
                headers:{
                    'Authorization': this.Authorization
                },
            }).then((data) =>{
                const res = data.data.data;
                this.setState({
                    serialNumber:res
                  })
            })
        }
        onChange = (date, dateString) => {
            console.log(date, dateString);
          }
        render(){
            this.Authorization = localStorage.getItem("Authorization")
            this.server = localStorage.getItem('remote');
            const {visible,form,onCancel,onCreate} = this.props;
            const { getFieldDecorator } = form;
            return(
                <Modal
                    visible={visible}
                    closable={false}
                    title="新增"
                    footer={[
                        <CancleButton key='back' handleCancel={onCancel}/>,
                        <NewButton key="submit" handleClick={onCreate} name='确定' style='button' className='fa fa-check' />
                      ]}
                >
                    <Form horizontal='true'>
                        <FormItem label="送检日期" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('date', {
                                rules: [{ required: true, message: '请选择送样日期' }],
                            })(
                                <DatePicker onChange={this.onChange}/>
                            )}
                        </FormItem>
                        <FormItem label="送检时间" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('time', {
                                rules: [{ required: true, message: '请选择送样时间' }],
                            })(
                                <TimePicker />
                            )}
                        </FormItem>
                        <FormItem label="送检人" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('id', {
                                rules: [{ required: true, message: '请选择送样人' }],
                            })(
                                <Select>
                                    {
                                        this.state.person.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="送检工厂" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('deliveryFactoryId', {
                                rules: [{ required: true, message: '请选择送样工厂' }],
                            })(
                                <Select>
                                    {
                                        this.state.person.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="检测项目" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('item', {
                                rules: [{ required: true, message: '请选择检测项目' }],
                            })(
                                <Select>
                                    {
                                        this.state.person.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="批号" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('serialNumberId', {
                                rules: [{ required: true, message: '请输入批号' }],
                            })(
                                <Select>
                                    {
                                        this.state.person.map(pe=>{
                                            return(
                                                <Option key={pe.id} value={pe.id}>{pe.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="异常备注" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
                            {getFieldDecorator('exceptionComment', {
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
                <NewButton handleClick={this.showModal} name='新增' className='fa fa-plus' />&nbsp;&nbsp;&nbsp;
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