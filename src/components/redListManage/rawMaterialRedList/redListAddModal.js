import React from 'react';
import {Form,Input,Button,Modal,Popconfirm,Select,Popover,Switch,InputNumber} from 'antd';

//import axios from 'axios';
const Option=Select.Option;
const FormItem=Form.Item;
const CollectionCreateForm = Form.create()(//弹出层
    class extends React.Component {
      constructor(props){
        super(props);
        this.state={
          checkSelectData:-1,
          popVisible:false,
        }
        this.hide=this.hide.bind(this);
        this.selectChange=this.selectChange.bind(this);
        
      }
    
      //监听下拉框变化
      selectChange=(value)=>{
          this.setState({checkSelectData:value});
      }
      hide(){//送审气泡的取消
        //console.log('hide')
        //console.log(this.state.popVisible)
        this.setState({popVisible:false});
      }
      handleVisibleChange=(visible)=>{
       // console.log(this.props.data)
        this.setState({
          popVisible:visible
        })
    }
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            maskClosable={false}
            title="添加红单"
            onOk={this.props.onCreate}
            onCancel={this.props.onCancel}
            
             // footer下的每个组件都要有唯一的key
            footer={[
                <Popconfirm key='popcon' placement='right' title='你确定是想取消这个任务吗？' onConfirm={this.props.onCancel} okText='确定' cancelText='再想想'>
                       <Button key='cancel' style={{float:'left'}}>取消</Button>
                </Popconfirm>,
                
                <Button key='save' type='primary'  onClick={this.props.onCreate}>保存</Button>,
                <Popover key='songshen' title='设置审批细节' width='50%' height='40%'
                maskClosable={false}
                 content={
                     <div style={{width:250 ,height:150}}>
                        <div>
                            <Select placeholder='选择送审流程' style={{width:150}} onChange={this.selectChange}>
                              <Option value='1'>送审流程1</Option>
                              <Option value='2'>送审流程2</Option>
                              <Option value='3'>送审流程3</Option>
                            </Select>
                        </div>
                        <div style={{paddingTop:'10px'}}>
                          <span>是否紧急</span>&nbsp;&nbsp;<Switch onChange={this.urgentChange}/>
                        </div>
                        <div style={{paddingTop:'10px' ,float:'right'}}>
                            <Button onClick={this.hide}>取消</Button>
                            <Button type='primary'  disabled={this.state.checkSelectData>-1?false:true}>确认</Button>
                        </div>
                     </div>
                 }
                 trigger='click'
                 visible={this.state.popVisible}
                 onVisibleChange={this.handleVisibleChange}
                >
                <Button key='submit' type='primary'>送审</Button>
                </Popover>
            ]}
          >
            <Form horizontal='true' >
                <FormItem  label='批号'labelCol={{span:7}} wrapperCol={{span:14}} required>
                {getFieldDecorator('lotNumber',{
                    initialValue: '',
                    rules:[{required:true,message:'批号不能为空'}]
                })(
                    <Input placeholder='请输入批号'></Input>
                )}
                </FormItem>
                <FormItem  label='货品名称' labelCol={{span:7}} wrapperCol={{span:14}} required>
                {getFieldDecorator('name',{
                    initialValue: '',
                    rules:[{required:true,message:'货品名称不能为空'}]
                })(
                    <Input placeholder='请输入货品名称'></Input>
                )}
                </FormItem>
                <FormItem  label='货品型号' labelCol={{span:7}} wrapperCol={{span:14}} required>
                {getFieldDecorator('model',{
                    initialValue: '',
                    rules:[{required:true,message:'货品型号不能为空'}]
                })(
                    <Input placeholder='请输入货品型号'></Input>
                )}
                </FormItem>
                <FormItem  label='损失货品数量' labelCol={{span:7}} wrapperCol={{span:14}} required>
                {getFieldDecorator('number',{
                    initialValue: '',
                    rules:[{required:true,message:'损失货品数量不能为空'}]
                })(
                    <InputNumber min={1} placeholder='请输入损失货品数量' style={{width:'275px'}}></InputNumber>
                )}
                </FormItem>
                <FormItem  label='损失货品重量' labelCol={{span:7}} wrapperCol={{span:14}} required>
                {getFieldDecorator('weight',{
                    initialValue: '',
                    rules:[{required:true,message:'损失货品重量不能为空'}]
                })(
                    <InputNumber min={1} placeholder='请输入损失货品重量' style={{width:'275px'}}></InputNumber>
                )}
                </FormItem>
               
            </Form>
          </Modal>
        );
      }
    }
  );

class RawMaterialRedListAddModal extends React.Component{
    state = {
        visible: false,//新增的弹出框
      
      };
    //显示当前时间为某年某月某日
    getNowFormatDate=()=> {
      let date = new Date();
      
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      let currentdate = year + '年' + month + '月'+ strDate+'日';
      return currentdate;
  }
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
              
              values['userId']=JSON.parse(localStorage.getItem('menuList')).userId;//取出来的时候要将json格式转成对象，存进去的时候要转成json
              values['currentDate']=this.getNowFormatDate();
              console.log(values);
              //console.log(a);
        })
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
      //红单是否紧急
      urgentChange=(checked)=>{//checked指定当前是否选中
        console.log(`switch to ${checked}`);
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