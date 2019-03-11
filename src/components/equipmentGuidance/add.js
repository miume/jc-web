import React from 'react';
import { Button, Modal,Select,Form, Input,message,Icon,Upload,DatePicker, Col, Row } from 'antd';
import axios from 'axios';
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from "moment";
import "./equiptment.css";
import PictureUp from './upload'

// const Option = Select.Option;
let id = 0;

class DynamicFieldSet extends React.Component{
    url
    ob
    state = {
        // approvalProcess:[],
        visible: false,
        // previewVisible:false,
        // previewImage: '',
        fileList0:[],
    };

    // previewCancel = () =>{
    //     this.setState({ previewVisible: false })
    // }

    // previewPreview = (file) =>{
    //     this.setState({
    //         previewImage: file.url || file.thumbUrl,
    //         previewVisible: true,
    //     })
    // }

    // handleChange = ({fileList}) =>{
    //     console.log({fileList})
    //     this.setState({ fileList })
    // }

    // onRemove = (e) =>{
    //     console.log(e.response.data)
    //     axios({
    //         url: `${this.url.instructor.deletePic}`,
    //         method:'delete',
    //         headers:{
    //             'Authorization': this.url.Authorization
    //         },
    //         fileNames:e.response.data,
    //         type:'json'
    //     }).then((data)=>{
    //         message.info(data.data.message);
    //     })
    // }

    remove = (k) =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const fileList = `fileList${k}`
        // console.log(fileList)
        // console.log()
        // const response = this.state[fileList] === undefined ? this.state[fileList].response.data : null
        if(this.state[fileList][0] !== undefined){
            var list = [this.state[fileList][0].response.data]
            list.push()
            if(this.state[fileList] !== []){
                axios({
                    url: `${this.url.instructor.deletePic}`,
                    method:'delete',
                    headers:{
                        'Authorization': this.url.Authorization
                    },
                    data:list,
                    type:'json'
                }).then((data)=>{
                    message.info(data.data.message);
                })
            }
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

    handleCreate = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
            //   console.log('Received values of form: ', values);
              return ;
            }
            let data = {}
            let instructorRecord = {}
            let pointRecordList = []
            instructorRecord["name"] = values.name
            instructorRecord["effectiveDate"] = values.date.format("YYYY-MM-DD HH:mm:ss")
            for(var i = 0;i<values.keys.length;i++){
                pointRecordList.push({})
            }
            for(var i = 0;i<values.keys.length;i++){
                let file = `fileList${values.keys[i]}`
                pointRecordList[i]["checkContent"]=values.content[values.keys[i]];
                pointRecordList[i]['checkFrequency']=values.frequency[values.keys[i]];
                pointRecordList[i]["checkPointPicName"]=this.state[file] === [] ? null :this.state[file][0].response.data
                pointRecordList[i]['checkStandard']=values.standard[values.keys[i]];
            }
            data["createPersonId"] = parseInt(this.ob.userId)
            data["instructorRecord"] = instructorRecord
            data["pointRecordList"] = pointRecordList
            // console.log(data)
            axios({
                url : `${this.url.instructor.instructorAll}`,
                method:'post',
                data: data,
                type:'json'
            }).then((data) => {
                if(data.data.code !== 0){
                  message.info('新增失败')
                  this.setState({
                    visible:true
                  })
                }else{
                  message.info(data.data.message);
                  this.props.fetch(); // 重新调用分页函数
                  this.props.form.resetFields();
                  this.setState({ visible: false});
                }
          })
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

    handleChange = (fileList,k) =>{
        // console.log(k)
        this.setState({
            [fileList]:k.fileList
        })
    }

    render(){
        // console.log(this.state)
        this.url = JSON.parse(localStorage.getItem('url'));
        this.ob = JSON.parse(localStorage.getItem('menuList'));
        const { getFieldDecorator, getFieldValue } = this.props.form;
        // const { previewVisible, previewImage, fileList } = this.state;
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
                    {/* var file = 'fileList' + `${k}` */}
                    {
                        <PictureUp k={k} handleChange={this.handleChange} fileList={this.state[`fileList${k}`]}/>
                    }
                {/* <Upload
                    action={this.url.instructor.uploadPic}
                    listType="picture"
                    fileList={fileList}
                    onPreview={this.previewPreview}
                    onChange={this.handleChange}
                    onRemove={this.onRemove}
                >
                    {fileList.length === 1 ? null : <Button>
                        <Icon type="upload"/>上传图片
                    </Button>}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal> */}
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