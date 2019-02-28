import React from 'react';
import { Button, Modal,Select,Form, Input,message,Icon } from 'antd';
import axios from 'axios';
import AddButton from '../BlockQuote/newButton';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import Edtr from './edTr';

class Edit extends React.Component{
      url
      constructor(props){
        super(props);
        this.state = {
          approvalProcess:[],
          dataSource:[],
          visible : false,
          id:this.props.value,
          detail:[],
          name:'',
          batchStatus: 0  
        }
        this.Authorization = localStorage.getItem("Authorization");
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.remove = this.remove.bind(this);
        this.getAllUser = this.getAllUser.bind(this);
        this.add = this.add.bind(this);
        this.fetch = this.fetch.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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
      }
      getAllUser = (params = {})=>{
        this.setState({ loading: true });
        axios({
            url: `${this.url.authUser.getAll}`,
            method:'get',
            params: params,
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    approvalProcess : res,
                    loading: false,
                })
            }
        })
      };
      add = () =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++this.state.detail.length-1);
        form.setFieldsValue({
            keys: nextKeys,
          });
      }
      handleDetail() {
        this.fetch()
        this.getAllUser();
        this.setState({
          visible: true
        });
      }
      fetch = ()=>{
        axios({
            url:`${this.url.processManagement.deleteByIds}/${this.state.id}`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            },
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                const name = res.commonBatchNumber.description
                const status = res.commonBatchNumber.status
                const detail = res.details
                this.setState({
                    dataSource:res,
                    name:name,
                    detail:detail,
                    batchStatus:status
                })
            }
        })
    }
    handleCancel() {
      this.setState({
      visible: false
      });
      this.props.form.resetFields();
  }
    handleCreate = () =>{
      this.props.form.validateFields((err, values) => {
        if (err) {
          return ;
        }
        let data = {};
        let value = {};
        let taskPersonList=[];
        value['description']=values.name
        value['id'] = this.props.value
        // value["isUrgent"] = 0
        value["status"] = -1
        data["commonBatchNumber"] = value
        for(var i = 0;i<values.keys.length;i++){
          taskPersonList.push({})
        }
        for(var i = 0;i<values.keys.length;i++){
          taskPersonList[i]["userId"]=values.persons[values.keys[i]];
          taskPersonList[i]['responsibility']=values.description[values.keys[i]];
        }
        data["details"] = taskPersonList
        axios({
              url : `${this.url.processManagement.deleteByIds}`,
              method:'put',
              data: data,
              type:'json'
          }).then((data) => {
              message.info(data.data.message);
              this.props.handle(this.props.pagination); // 重新调用分页函数
        })
        this.props.form.resetFields();
        this.setState({ visible: false});
      })
    }

    handleSubmit = () =>{
      this.props.form.validateFields((err, values) => {
        if (err) {
          return ;
        }
        let data = {};
        let value = {};
        let taskPersonList=[];
        value['description']=values.name
        value['id'] = this.props.value
        // value["isUrgent"] = 0
        value["status"] = 2
        data["commonBatchNumber"] = value
        for(var i = 0;i<values.keys.length;i++){
          taskPersonList.push({})
        }
        for(var i = 0;i<values.keys.length;i++){
          taskPersonList[i]["userId"]=values.persons[values.keys[i]];
          taskPersonList[i]['responsibility']=values.description[values.keys[i]];
        }
        data["details"] = taskPersonList
        axios({
              url : `${this.url.processManagement.deleteByIds}`,
              method:'put',
              data: data,
              type:'json'
          }).then((data) => {
              message.info(data.data.message);
              this.props.handle(this.props.pagination); // 重新调用分页函数
        })
        this.props.form.resetFields();
        this.setState({ visible: false});
      })
    }
    render(){
      this.url = JSON.parse(localStorage.getItem('url'));
      const { getFieldDecorator} = this.props.form;
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      return(
        <span>
          {this.props.status === -1?<span className='blue' onClick={this.handleDetail}>编辑</span>:<span className="notClick">编辑</span>}
          <Modal 
             title='编辑' visible={this.state.visible}
            //  className='modal-md'
                 closable={false} centered={true}
                 maskClosable={false}
                 width='360px'
                 footer={[
                     <CancleButton key='back' handleCancel={this.handleCancel}/>,
                     <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check' />,
                     <AddButton key="submit" handleClick={this.handleSubmit} name='提交' className='fa fa-check' />
                   ]}
          >
            <Form horizontal='true'>
                    <Form.Item wrapperCol={{ span: 24 }}>
                        {getFieldDecorator('name',{
                          // rules: [{ required: true, message: '请输入流程名称' }],
                          initialValue:this.state.name
                        })(
                          <Input placeholder='请输入流程名称'/>
                        )
                        }
                    </Form.Item>
                    <div id='edit'>
                      <Edtr approvalProcess={this.state.approvalProcess} details={this.state.detail} remove={this.remove} form={this.props.form}/>
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

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(Edit);

export default WrappedDynamicFieldSet