import React from 'react';
import { Button, Modal,Select,Form, Input,message,Icon,Upload,DatePicker, Col, Row } from 'antd';
import axios from 'axios';
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from "moment";

const Option = Select.Option;
let id = 0;

class DynamicFieldSet extends React.Component{
    url
    ob
    state = {
        approvalProcess:[],
        visible: false,
        previewVisible:false,
        previewImage: '',
        fileList:[],
    };

    previewCancel = (file) =>{
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        })
    }

    handleChange = ({fileList}) =>{
        this.setState({ fileList })
    }

    remove = (k) =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        if(keys.length === 1){
            return;
        }
        form.setFieldsValue({
            keys:keys.filter(key => key!==k),
        })
    };

    add = () =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCreate = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
          });
    }

    handleCancel = () => {
        // const form = this.formRef.props.form;
        this.setState({ visible: false });
        this.props.form.resetFields();
        // form.resetFields();
    };

    onChange = (date, dateString) =>{
        // console.log(moment(date).format('YYYY-MM-DD HH:mm:ss'))
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.ob = JSON.parse(localStorage.getItem('menuList'));
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k,index) => (
            <div key={index}>
                <Row gutter={24}>
                <Col span={6}>
                <Form.Item >
                    {getFieldDecorator(`content[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                    })(
                        <Input placeholder='每日点检内容' style={{width:'130px'}}/>
                    )}
                </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item>
                    {getFieldDecorator(`standard[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                    })(
                        <Input placeholder='检查标准' style={{width:'130px'}}/>
                    )}
                </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item>
                    {getFieldDecorator(`frequency[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                    })(
                        <Input placeholder='频次' style={{width:'120px'}}/>
                    )}
                </Form.Item>
                </Col>
                <Form.Item style={{marginRight: 4 }}>
                <Upload>
                    <Button>
                        <Icon type="upload"/>上传图片
                    </Button>
                </Upload>
                </Form.Item>
                <Form.Item>
                {keys.length > 1 ? (
                    <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    disabled={keys.length === 1}
                    onClick={() => this.remove(k)}
                    />
                ) : null}
                </Form.Item>
                </Row>
            </div>
        ));
        return(
            <span>
                <AddButton handleClick={this.showModal}  name='新增' className='fa fa-plus' />
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title='新增'
                    width='600px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate}/>,
                        <AddButton key="submit" handleClick={this.handleCreate} name='提交' className='fa fa-check' />
                    ]}
                >
                    <Form>
                        <Form.Item wrapperCol={{ span: 21 }} style={{float:'left'}}>
                        {getFieldDecorator('name',{
                            // rules: [{ required: true, message: '请输入流程名称' }],
                        })(
                            <Input placeholder='请输入指导书名称' style={{width:'250px'}}/>
                        )
                        }
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 20 }}>
                            {getFieldDecorator('date',{
                                // rules: [{ required: true, message: '请选择时间' }],
                            })(
                                <DatePicker format="YYYY-MM-DD HH:mm:ss" locale={locale} showTime={true} style={{width:'275px'}} onChange={this.onChange} placeholder="请选择时间"/>
                            )}
                        </Form.Item>
                        <div id="edit" style={{height:'360px'}}>
                            {formItems}
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                <Icon type="plus" /> 添加一行
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
            </span>
        )
    }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

export default WrappedDynamicFieldSet