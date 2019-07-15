import React from 'react';
import { Button, Modal,Form, Input,message,Icon,DatePicker, Col, Row } from 'antd';
import axios from 'axios';
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import "./equiptment.css";
import PictureUp from './upload';
import Submit from '../BlockQuote/checkSubmit';

let id = 0;

class DynamicFieldSet extends React.Component{
    url
    ob
    state = {
        visible: false,
        fileList0:[],
    };

    remove = (k) =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const fileList = `fileList${k}`
        if(this.state[fileList][0] !== undefined){
            var list = []
            list.push(this.state[fileList][0].response.data)
            if(this.state[fileList] != false){
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
              return ;
            }
            if(values.date === undefined){
                message.info("请选择时间")
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
                pointRecordList[i]["checkPointPicName"]=this.state[file].length === 0 ? null :this.state[file][0].response.data
                pointRecordList[i]['checkStandard']=values.standard[values.keys[i]];
            }
            data["createPersonId"] = parseInt(this.ob.userId)
            data["instructorRecord"] = instructorRecord
            data["pointRecordList"] = pointRecordList
            
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
                const keys = this.props.form.getFieldValue('keys');
                for(var i =0;i<keys.length;i++){
                    let file = `fileList${keys[i]}`
                    this.setState({
                        [file]:[]
                    })
                }
                  message.info(data.data.message);
                  this.props.fetch({sortField: 'id',
                  sortType: 'desc',}); // 重新调用分页函数
                  this.props.form.resetFields();
                  this.setState({ visible: false});
                }
          })
          });
    }

    handleCancel = () => {
        const keys = this.props.form.getFieldValue('keys');
        for(var i =0;i<keys.length;i++){
            let file = `fileList${keys[i]}`
            var list = []
            if(this.state[file].length === 0){
                continue;
            }else{
                list.push(this.state[file][0].response.data)
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
            this.setState({
                [file]:[]
            })
        }
        this.setState({ visible: false });
        this.props.form.resetFields();
    };

    onChange = (date, dateString) =>{
        // console.log(moment(date).format('YYYY-MM-DD HH:mm:ss'))
    }

    handleChange = (fileList,k) =>{
        // console.log(k.fileList)
        this.setState({
            [fileList]:k.fileList
        })
    }

    getCheck = (dataId,taskId,urgent) => {//调用代办事项接口
        axios({
            url:`${this.url.toDoList}/${taskId}?dataId=${dataId}&isUrgent=${urgent}`,
            method:'post',
            headers:{
                'Authorization':this.url.Authorization
            },
            type:'json'
         }).then((data)=>{
             message.info(data.data.message);
             this.props.fetch({sortField: 'id',
             sortType: 'desc',});
         }).catch(()=>{
             message.info('审核失败，请联系管理员！');
         });
    }

    handleSongShenOk = (process,urgent) => {
        this.props.form.validateFields((err, values) => {
            if (err) {
              return ;
            }
            if(values.date === undefined){
                message.info("请选择时间")
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
                pointRecordList[i]["checkPointPicName"]=this.state[file].length === 0 ? null :this.state[file][0].response.data
                pointRecordList[i]['checkStandard']=values.standard[values.keys[i]];
            }
            data["createPersonId"] = parseInt(this.ob.userId)
            data["instructorRecord"] = instructorRecord
            data["pointRecordList"] = pointRecordList

            console.log("-------------")
            console.log(data)


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
                    const res=data.data.data;
                    const dataId=res.instructorRecord.batchNumberId;//返回的batchnumberId
                    const taskId=process;//选择的流程id
                    this.getCheck(dataId,taskId,urgent);
                    const keys = this.props.form.getFieldValue('keys');
                    for(var i =0;i<keys.length;i++){
                        let file = `fileList${keys[i]}`
                        this.setState({
                            [file]:[]
                        })
                    }
                    this.props.form.resetFields();
                    this.setState({ visible: false});
                }
          })
          });
    }

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.ob = JSON.parse(localStorage.getItem('menuList'));
        const { getFieldDecorator, getFieldValue } = this.props.form;
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
                    {
                        <PictureUp k={k} handleChange={this.handleChange} fileList={this.state[`fileList${k}`]}/>
                    }
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
            <span className={this.props.flag?'':'hide'}>
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
                        <Submit  key='submit' applySaveAndReview={this.handleSongShenOk}  url={this.url} />
                    ]}
                >
                    <Form>
                        <Form.Item wrapperCol={{ span: 21 }} style={{float:'left'}}>
                        {getFieldDecorator('name',{
                        })(
                            <Input placeholder='请输入指导书名称' style={{width:'250px'}}/>
                        )
                        }
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 20 }}>
                            {getFieldDecorator('date',{
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