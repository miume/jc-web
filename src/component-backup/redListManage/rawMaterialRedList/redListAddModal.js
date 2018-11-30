import React from 'react';
import {Form,Input,Button,Modal,message,Popconfirm,Select,Popover,Switch} from 'antd';

//import axios from 'axios';
const Option=Select.Option;
const FormItem=Form.Item;
const CollectionCreateForm = Form.create()(//弹出层
    class extends React.Component {
      state={
        checkSelectData:false,
      }
      //下拉框
      handleChange=(value)=>{
           console.log(value.length);
      }
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="添加红单"
            onOk={this.props.onCreate}
            onCancel={this.props.onCancel}
            width='500px'
             // footer下的每个组件都要有唯一的key
            footer={[
                <Popconfirm key='popcon' placement='right' title='你确定是想取消这个任务吗？' onConfirm={this.props.onCancel} okText='确定' cancelText='再想想'>
                       <Button key='cancel' style={{float:'left'}}>取消</Button>
                </Popconfirm>,
                
                <Button key='save' type='primary'  onClick={this.props.onCreate}>保存</Button>,
                <Popover key='songshen' title='设置审批细节' width='500px'
                 content={
                     <div style={{width:200}}>
                        <div>
                            <Select placeholder='选择送审流程' style={{width:150}} onChange={this.handleChange}>
                              <Option value='1'>送审流程1</Option>
                              <Option value='2'>送审流程2</Option>
                              <Option value='3'>送审流程3</Option>
                            </Select>
                        </div>
                        <div style={{paddingTop:'10px'}}>
                          <span>是否紧急</span>&nbsp;&nbsp;<Switch onChange={this.urgentChange}/>
                        </div>
                        <div style={{paddingTop:'10px' ,float:'right'}}>
                            <Button onClick={this.props.hide}>取消</Button>
                            <Button style={{paddingLeft:'3px'}} disabled>确认</Button>
                        </div>
                     </div>
                 }
                 trigger='click'
                >
                <Button key='submit' type='primary'>送审</Button>
                </Popover>
            ]}
          >
            <Form horizontal='true' >
                <FormItem label='工厂名称' labelCol={{span:5}} wrapperCol={{span:14}} required>
                {getFieldDecorator('name',{
                    initialValue: '',
                    rules:[{required:true,message:'送样工厂名称不能为空'}]
                })(
                    <Input placeholder='请输入送样工厂名称'></Input>
                )}
                </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );
  //这是个令牌，每次调接口将其放在header里面
//const Authorization=localStorage.getItem('Authorization');
//通过这个获取接口地址
//const server=localStorage.getItem('remote2');
class RawMaterialRedListAddModal extends React.Component{
    state = {
        visible: false,//新增的弹出框
        popVisible:false,//送审的气泡弹出
      };
    
      showModal = () => {
        this.setState({ visible: true });
      }
     
      handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ visible: false });
        form.resetFields();
      }
    
      handleCreate = () => {//新增一条记录
        const form = this.formRef.props.form;
        // form.validateFields((err, values) => {//校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        //   if (err) {
        //     return;
        //   }
        //   axios({
        //     url:`${server}/jc/deliveryFactory/add`,
        //     method:'post',
        //     headers:{
        //       'Authorization':Authorization
        //     },
        //     data:values,
        //     type:'json'
        //   })
        //   .then((data)=>{
        //       //console.log(data);
        //       message.info(data.data.message);
        //       this.props.fetch();//
        //   })
        //   .catch((error)=>{
        //       message.info(error.data.message);
        //   });
        //   console.log('Received values of form: ', values);//打印表单新增获得到的值
        //   form.resetFields();//重置一组输入控件的值（为 initialValue）与状态，如不传入参数，则重置所有组件
        //   this.setState({ visible: false });
        // });
        form.validateFields((error,values)=>{
              console.log(values);
        })
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
      //红单是否紧急
      urgentChange=(checked)=>{//checked指定当前是否选中
        console.log(`switch to ${checked}`);
      }
      //送审气泡的取消
      hide=()=>{
            this.setState({popVisible:false});
      }
    render(){
        
        return(
          <span>
              <Button type="primary" size="small" style={{marginBottom:'10px' ,marginRight:'15px' }}  onClick={this.showModal} >新增</Button>
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
export default Form.create()(RawMaterialRedListAddModal);//创建form实例