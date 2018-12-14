// import React from 'react';
// import {Form,Input,Button,Modal,Popconfirm,Select,Popover,Switch,InputNumber} from 'antd';
// import CancleButton from '../../BlockQuote/cancleButton';
// import SaveButton from '../../BlockQuote/saveButton';
// //import axios from 'axios';
// const Option=Select.Option;
// const FormItem=Form.Item;
// const CollectionCreateForm = Form.create()(//弹出层
//     class extends React.Component {
//       server;
//       Authorization;
//       constructor(props){
//         super(props);
//         this.state={
//           checkSelectData:-1,
//           popVisible:false,
//           materialName:'',
//           materialClass:''
//         }
//         this.hide=this.hide.bind(this);//送审气泡点击取消
//         this.handleSongShenOk=this.handleSongShenOk.bind(this);//送审气泡点击确定
//         this.selectChange=this.selectChange.bind(this);//监听下拉框变化
//         this.banchNumberSelectChange=this.banchNumberSelectChange.bind(this);
//       }
//        //编辑编号选择框变化时调用的函数
//        banchNumberSelectChange(value){//下拉框得到的value是id
//         const id=value;
//         const res=this.props.batchNumber;
//       //   console.log(res);
//       //   console.log(id);
//          //console.log(res[id-1]);
//         //console.log(res[id-1].materialName);
//         for(var i=0;i<res.length;i++){
//                if(res[i].id===id){
//                   this.setState({
//                       materialName:res[i].materialName,
//                       materialClass:res[i].materialClass
//                     });
//                     this.props.form.setFieldsValue({
//                       materialName: res[i].materialName,
//                       materialClass:res[i].materialClass
//                     });
//                     // console.log( res[i].materialName);
//                     // console.log(res[i].materialClass);
//                   break;
//                };
             
//         }
//       }
//       //监听下拉框变化
//       selectChange=(value)=>{
//           this.setState({checkSelectData:value});
//       }
//       hide(){//送审气泡的取消
//         //console.log('hide')
//         //console.log(this.state.popVisible)
//         this.setState({popVisible:false});
//       }
//       handleSongShenOk(){//送审气泡点击确定(status为-1，状态为待审核)
//         this.setState({popVisible:false});
//       }
//       handleVisibleChange=(visible)=>{
//        // console.log(this.props.data)
//         this.setState({
//           popVisible:visible
//         })
//     }
//       render() {
//         this.server=localStorage.getItem('remote');
//         this.Authorization=localStorage.getItem('Authorization');
//         const { visible, onCancel, onCreate, form } = this.props;
//         const { getFieldDecorator } = form;
//         return (
//           <Modal
//             visible={visible}
//             maskClosable={false}
//             closable={false}
//             title="编辑红单数据"
//             onOk={onCreate}
//             onCancel={onCancel}
            
//              // footer下的每个组件都要有唯一的key
//             footer={[
//               <CancleButton  handleCancel={onCancel}/>,
//                 <SaveButton handleSave={onCancel}/> ,
//                 <Popover key='songshen' title='设置审批细节' width='50%' height='40%'
//                 maskClosable={false}
//                  content={
//                      <div style={{width:250 ,height:150}}>
//                         <div>
//                         <Select placeholder='选择送审流程' style={{width:150}} onChange={this.selectChange}>
//                         {
//                             this.props.process.map((pro)=>{
//                                     return(
//                                       <Option key={pro.commonBatchNumber.id} value={pro.commonBatchNumber.id}>{pro.commonBatchNumber.description}</Option>

//                                     );
//                             })
//                         }
//                       </Select>
//                         </div>
//                         <div style={{paddingTop:'10px'}}>
//                           <span>是否紧急</span>&nbsp;&nbsp;<Switch onChange={this.urgentChange}/>
//                         </div>
//                         <div style={{paddingTop:'10px' ,float:'right'}}>
//                             <Button onClick={this.hide}>取消</Button>
//                             <Button type='primary'  disabled={this.state.checkSelectData>-1?false:true}>确认</Button>
//                         </div>
//                      </div>
//                  }
//                  trigger='click'
//                  visible={this.state.popVisible}
//                  onVisibleChange={this.handleVisibleChange}
//                 >
//                   <Button key='submit' type='primary'>送审</Button>
//                 </Popover>
//             ]}
//           >
//             <Form horizontal='true' >
//                 <FormItem  label='编号'labelCol={{span:7}} wrapperCol={{span:14}} required>
//                 {getFieldDecorator('batchNumber',{
//                     initialValue: this.props.record.repoBaseSerialNumber.serialNumber,
//                     rules:[{required:true,message:'编号不能为空'}]
//                 })(
//                   <Select onChange={this.banchNumberSelectChange} placeholder='请选择编号'>
//                   {
//                       this.props.batchNumber.map((bat)=>{
//                           return(
//                               <Option key={bat.id} value={bat.id}>{bat.serialNumber}</Option>
//                           );
//                       })
//                   }
//                   </Select>
                  
//                 )}
//                 </FormItem>
//                 <FormItem  label='货品名称' labelCol={{span:7}} wrapperCol={{span:14}} required>
//                 {getFieldDecorator('materialName',{
//                     initialValue: this.props.record.repoBaseSerialNumber.materialName,
                    
//                 })(
//                     <Input placeholder='请先选择编号'/>
//                 )}
//                 </FormItem>
//                 <FormItem  label='货品型号' labelCol={{span:7}} wrapperCol={{span:14}} required>
//                 {getFieldDecorator('materialClass',{
//                     initialValue: this.props.record.repoBaseSerialNumber.materialClass,
                    
//                 })(
//                     <Input placeholder='请先选择编号'/>
//                 )}
//                 </FormItem>
//                 <FormItem  label='损失货品数量' labelCol={{span:7}} wrapperCol={{span:14}} required>
//                 {getFieldDecorator('quantity',{
//                     initialValue: this.props.record.repoRedTable.quantityLoss,
//                     rules:[{required:true,message:'损失货品数量不能为空'}]
//                 })(
//                     <InputNumber min={1} placeholder='请输入损失货品数量' style={{width:'275px'}}></InputNumber>
//                 )}
//                 </FormItem>
//                 <FormItem  label='损失货品重量' labelCol={{span:7}} wrapperCol={{span:14}} required>
//                 {getFieldDecorator('weight',{
//                     initialValue: this.props.record.repoRedTable.weightLoss,
//                     rules:[{required:true,message:'损失货品重量不能为空'}]
//                 })(
//                     <InputNumber min={1} placeholder='请输入损失货品重量' style={{width:'275px'}}></InputNumber>
//                 )}
//                 </FormItem>
//                 <FormItem  label='备注' labelCol={{span:7}} wrapperCol={{span:14}} required>
//                 {getFieldDecorator('note',{
//                     initialValue: this.props.record.repoRedTable.note,
                    
//                 })(
//                     <textarea style={{width:'275px'}}></textarea>
//                 )}
//                 </FormItem>
//             </Form>
//           </Modal>
//         );
//       }
//     }
//   );

// class RawMaterialRedListEditModal extends React.Component{
//   constructor(props){
//       super(props);
//       this.state = {
//         visible: false,//新增的弹出框
//         checkSwitch:false,
        
//       };
//   }
  

//       showModal = () => {
        
//         this.setState({ visible: true });
//       }
//        notShowModal=()=>{
//         this.setState({ visible: false });
//        }
//       handleCancel = () => {
//         const form = this.formRef.props.form;
//         this.setState({ visible: false });
//         form.resetFields();
//       }
    
//       handleCreate = () => {//编辑一条记录
//         const form = this.formRef.props.form;
//         // form.validateFields((err, values) => {//校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
//         //   if (err) {
//         //     return;
//         //   }
//         //   axios({
//         //     url:`${server}/jc/deliveryFactory/add`,
//         //     method:'post',
//         //     headers:{
//         //       'Authorization':Authorization
//         //     },
//         //     data:values,
//         //     type:'json'
//         //   })
//         //   .then((data)=>{
//         //       //console.log(data);
//         //       message.info(data.data.message);
//         //       this.props.fetch();//
//         //   })
//         //   .catch((error)=>{
//         //       message.info(error.data.message);
//         //   });
//         //   console.log('Received values of form: ', values);//打印表单新增获得到的值
//         //   form.resetFields();//重置一组输入控件的值（为 initialValue）与状态，如不传入参数，则重置所有组件
//         //   this.setState({ visible: false });
//         // });
//         form.validateFields((error,values)=>{
              
//               values['userId']=JSON.parse(localStorage.getItem('menuList')).userId;//取出来的时候要将json格式转成对象，存进去的时候要转成json
//               values['currentDate']=this.getNowFormatDate();
//               console.log(values);
//               //console.log(a);
//         })
//       }
    
//       saveFormRef = (formRef) => {
//         this.formRef = formRef;
//       }
//       //红单是否紧急
//       urgentChange=(checked)=>{//checked指定当前是否选中
//         console.log(`switch to ${checked}`);
//         this.setState();
//       }
     
//     render(){
        
//         return(
//           <span>
//               <span className={this.props.editFlag?'blue':'grey'} onClick={this.props.editFlag?this.showModal:this.notShowModal} >编辑</span>
//               <CollectionCreateForm
//                 wrappedComponentRef={this.saveFormRef}
//                 visible={this.state.visible}
//                 onCancel={this.handleCancel}
//                 onCreate={this.handleCreate}
//                 process={this.props.process}
//                 batchNumber={this.props.batchNumber}
//                 record={this.props.record}
//               />
//           </span>
//         );
//     }
// }
// export default Form.create()(RawMaterialRedListEditModal);//创建form实例