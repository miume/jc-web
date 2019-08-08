import React from 'react';
import {Button, DatePicker, Form, Icon, Input, message, Modal} from 'antd';
import axios from 'axios';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import "./equiptment.css";
import Submit from '../BlockQuote/checkSubmit';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Tr from './editTr';
import moment from "moment";

const timeFormat = "YYYY-MM-DD HH:mm:ss"

class Editor extends React.Component{
    url
    state = {
        visible: false,
        content: [],
        instructorName: '',
        effectiveDate: '',
        id:'',
        batchNumberId:this.props.batchNumberId,
    }

    onChange = (date, dateString) =>{
        // console.log(moment(date).format('YYYY-MM-DD HH:mm:ss'))
    }

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

    componentDidMount = () =>{
        this.fetch();
    }

    add = () =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++this.state.content.length-1);
        this.state['fileList'+`${this.state.content.length-1}`] = []
        form.setFieldsValue({
            keys: nextKeys,
          });
      }

    handleDetail = () =>{
       
        this.setState({
            visible:true
        })
    }

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
            instructorRecord['id'] = this.state.id
            instructorRecord['obsolete'] = 0
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
            // data["id"] = this.state.id
            data["instructorRecord"] = instructorRecord
            data["pointRecordList"] = pointRecordList
            
            // console.log(data)
            axios({
                url : `${this.url.instructor.instructorAll}`,
                method:'put',
                data: data,
                type:'json'
            }).then((data) => {
                // console.log(data)
                if(data.data.code !== 0){
                  message.info('更新失败')
                  this.setState({
                    visible:true
                  })
                }else{
                // const keys = this.props.form.getFieldValue('keys');
                // for(var i =0;i<keys.length;i++){
                //     let file = `fileList${keys[i]}`
                //     this.setState({
                //         [file]:[]
                //     })
                // }
                  message.info(data.data.message);
                  this.props.fetch({sortField: 'id',
                  sortType: 'desc',}); // 重新调用分页函数
                //   this.props.form.resetFields();
                  this.setState({ visible: false});
                }
          })
          });
    }

    handleCancel = () => {
        const keys = this.props.form.getFieldValue('keys');
        for(var i = this.state.content.length;i<keys.length;i++){
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
        // this.props.form.resetFields();
    };

    fetch = ()=>{
        axios({
            url:`${this.url.instructor.instructorAll}/${this.state.batchNumberId}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                const instructorName = res.instructorName
                const effectiveDate = res.effectiveDate
                const content = res.content
                this.setState({
                    instructorName:instructorName,
                    effectiveDate:effectiveDate,
                    content:content,
                    id:res.id
                })
                for(var i=0;i<content.length;i++){
                    var fileList = `fileList${i}`
                    let data = [{response:{}}]
                    data[0].uid = content[i].checkPointPicName
                    data[0].url = `http://2p277534k9.iok.la:58718/jc/common/equipmentInstructor/pic/${content[i].checkPointPicName}`
                    data[0].name = content[i].checkPointPicName
                    data[0].response.data = content[i].checkPointPicName
                    this.setState({
                        [fileList]:data,
                    })
                }
            }
        })
    }

    handleChange = (fileList,k) =>{
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
            instructorRecord['id'] = this.state.id
            instructorRecord['obsolete'] = 0
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
            // data["createPersonId"] = parseInt(this.ob.userId)
            data["instructorRecord"] = instructorRecord
            data["pointRecordList"] = pointRecordList
            
            axios({
                url : `${this.url.instructor.instructorAll}`,
                method:'put',
                data: data,
                type:'json'
            }).then((data) => {
                if(data.data.code !== 0){
                  message.info('新增失败')
                  this.setState({
                    visible:true
                  })
                }else{
                    // const res=data.data.data;
                    // console.log(res,process,urgent)
                    // const dataId=res.instructorRecord.batchNumberId;//返回的batchnumberId
                    const taskId=process;//选择的流程id
                    this.getCheck(this.props.batchNumberId,taskId,urgent);
                    // const keys = this.props.form.getFieldValue('keys');
                    // for(var i =0;i<keys.length;i++){
                    //     let file = `fileList${keys[i]}`
                    //     this.setState({
                    //         [file]:[]
                    //     })
                    // }
                    // this.props.form.resetFields();
                    this.setState({ visible: false});
                }
          })
          });
    }

    render(){
        // console.log(this.state.id)
        this.url = JSON.parse(localStorage.getItem('url'));
        const { getFieldDecorator } = this.props.form;
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
            },
        };
        return(
            <span className={this.props.flag?'':'hide'}>
                {this.props.status === -1?<span className='blue' onClick={this.handleDetail}>编辑</span>:<span className="notClick">编辑</span>}
                <Modal 
                    title='编辑' visible={this.state.visible}
                    closable={false} centered={true}
                    maskClosable={false}
                    width='600px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                        <Submit  key='submit' applySaveAndReview={this.handleSongShenOk}  url={this.url} />
                    ]}
                >
                    <Form>
                        <Form.Item wrapperCol={{ span: 21 }} style={{float:'left'}}>
                        {getFieldDecorator('name',{
                            // rules: [{ required: true, message: '请输入流程名称' }],
                            initialValue:this.state.instructorName
                        })(
                            <Input placeholder='请输入指导书名称' style={{width:'250px'}}/>
                        )
                        }
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 20 }}>
                            {getFieldDecorator('date',{
                                // rules: [{ required: true, message: '请选择时间' }],
                                initialValue:moment(this.state.effectiveDate,timeFormat)
                            })(
                                <DatePicker format="YYYY-MM-DD HH:mm:ss" locale={locale} showTime={true} style={{width:'275px'}} onChange={this.onChange} placeholder="请选择时间"/>
                            )}
                        </Form.Item>
                        <div id="edit" style={{height:'360px'}}>
                            <Tr form={this.props.form} content={this.state.content} state = {this.state} handleChange={this.handleChange} remove={this.remove}/>
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

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(Editor);

export default WrappedDynamicFieldSet