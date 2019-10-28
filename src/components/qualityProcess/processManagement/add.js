import React from 'react';
import { Button, Modal,Select,Form, Input,message,Icon } from 'antd';
import axios from 'axios';
import AddButton from '../../BlockQuote/newButton';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";

const Option = Select.Option;
let id = 0;

class DynamicFieldSet extends React.Component{
    url
    ob
    state = {
      approvalProcess:[],
      visible: false,
    };
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
  componentDidMount() {
      this.getAllUser();
  }

    add = () =>{
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        form.setFieldsValue({
            keys: nextKeys,
          });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (err) {
            return ;
          }
          let data = {};
          let value = {};
          let taskPersonList=[];
          value['description']=values.name
          value['createPersonId'] = parseInt(this.ob.userId)
          value["isUrgent"] = 0
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
                method:'post',
                data: data,
                type:'json'
            }).then((data) => {
                if(data.data.code !== 0){
                  message.info('新增失败');
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

    handleCreate = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (err) {
          return ;
        }
        let data = {};
        let value = {};
        let taskPersonList=[];
        value['description']=values.name
        value['createPersonId'] = parseInt(this.ob.userId)
        value["isUrgent"] = 0
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

    showModal = () => {
      this.setState({ visible: true });
    };

    handleCancel = () => {
      // const form = this.formRef.props.form;
      this.setState({ visible: false });
      this.props.form.resetFields();
      // form.resetFields();
    };

      render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.ob = JSON.parse(localStorage.getItem('menuList'));
        const children = this.state.approvalProcess.map(p =>
          <Option className="option" id={p.id} key={p.id} value={p.id}>{p.name}</Option>
      )
        const { getFieldDecorator, getFieldValue } = this.props.form;
          const formItemLayoutWithOutLabel = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 20, offset: 4 },
            },
          };
          getFieldDecorator('keys', { initialValue: [0] });
          const keys = getFieldValue('keys');
          const formItems = keys.map((k, index) => (
            <div key={index}>
            <Form.Item
              wrapperCol={{ span: 24 }}
              style={{float:'left'}}
            >
              {getFieldDecorator(`persons[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                // rules: [{
                //   required: true,
                //   message: "请选择负责人",
                // }],
              })(
                <Select placeholder="请选择负责人" style={{ width: '130px',marginRight:'8px'}}>
                  {children}
                </Select>
              )}
            </Form.Item>
            <Form.Item
                wrapperCol={{ span: 24 }}
                >
              {getFieldDecorator(`description[${k}]`,{
                validateTrigger: ['onChange', 'onBlur'],
                // rules: [{
                //   required: true,
                //   message: "请输入职责",
                // }],
              })(
                <Input placeholder="请输入职责" style={{ width: '88%', marginRight: 4 }} />
              )}
              {keys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => this.remove(k)}
                />
              ) : null}
            </Form.Item>
            </div>
          ));
          return (
            <span className={this.props.flag?'':'hide'}>
            <AddButton handleClick={this.showModal}  name='新增' className='fa fa-plus' />
            <Modal
              visible={this.state.visible}
              closable={false}
              centered={true}
              maskClosable={false}
              title="新增"
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
                      })(
                        <Input placeholder='请输入流程名称'/>
                      )
                      }
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
          );
      }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

export default WrappedDynamicFieldSet
