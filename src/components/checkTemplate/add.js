import React from 'react';
import { Button, Modal,Select,Form, Input,message,Icon,Col, Row,Upload } from 'antd';
import axios from 'axios';
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import "./checkTemplate.css";

let id = 0;

class AddBut extends React.Component{
    url
    ob
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
    };

    remove = (k) =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const fileList = `fileList${k}`
        if(this.state[fileList][0] !== undefined){
            var list = []
            list.push(this.state[fileList][0].response.data)
            // if(this.state[fileList] != false){
            //     axios({
            //         url: `${this.url.instructor.deletePic}`,
            //         method:'delete',
            //         headers:{
            //             'Authorization': this.url.Authorization
            //         },
            //         data:list,
            //         type:'json'
            //     }).then((data)=>{
            //         message.info(data.data.message);
            //     })
            // }
        }
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
        this.state['fileList'+`${id}`] = []
        form.setFieldsValue({
            keys: nextKeys,
        });
    };
    
    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
    // const form = this.formRef.props.form;
    this.setState({ visible: false });
    // this.props.form.resetFields();
    // form.resetFields();
    };
    handleCreate = () => {
    // const form = this.formRef.props.form;
    this.setState({ visible: false });
    // this.props.form.resetFields();
    // form.resetFields();
    };

    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k,index)=>(
            <div key={index}>
                <Row gutter={24}>
                <Col span={6}>
                <Form.Item >
                    {getFieldDecorator(`content[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                    })(
                        <Input placeholder='项目名称' style={{width:'130px'}}/>
                    )}
                </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item>
                    {getFieldDecorator(`standard[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                    })(
                        <Input placeholder='点检标准' style={{width:'130px'}}/>
                    )}
                </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item>
                    {getFieldDecorator(`frequency[${k}]`,{
                        validateTrigger: ['onChange', 'onBlur'],
                    })(
                        <Input placeholder='点检周期' style={{width:'120px'}}/>
                    )}
                </Form.Item>
                </Col>
                {/* <Form.Item style={{marginRight: 4 }}>
                    {
                        <Upload />
                    }
                </Form.Item> */}
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
        ))
        return(
            <span>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus' />
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="新增"
                    width='500px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                    ]}
                >
                    <Form>
                        <div className="checkName">制造一部</div>
                        <div className="checkName">酸溶槽</div>
                        <div className="checkName">1993-12-01</div>
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

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(AddBut);

export default WrappedDynamicFieldSet