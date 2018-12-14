import React ,{Component}from 'react';
import {Form,Input,Button,Modal,Popconfirm,Select,Popover,Switch,InputNumber,message} from 'antd';
import CancleButton from '../../BlockQuote/cancleButton';
import SaveButton from '../../BlockQuote/saveButton';
import ProductRedListEditModal from './peditModal';
import axios from 'axios';
const Option=Select.Option;

class Edit extends Component{
    server;
    Authorization;
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            checkSelectData:-1,//最开始下拉框是没选择数据的
            popVisible:false,//送检的气泡弹出
            checkSwitch:-1,//是否紧急那个开关最开始是关闭的
            
        }
        
        this.showModal=this.showModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.hide=this.hide.bind(this);//送审气泡的取消
        this.handleSongShenOk=this.handleSongShenOk.bind(this);//送审事件点击确认按钮
        this.selectChange=this.selectChange.bind(this);//监听下拉框变化，
        
    }
    showModal = () => {
        
        this.setState({ visible: true });
      }
       notShowModal=()=>{
        this.setState({ visible: false });
       }
      handleCancel () {
      
        this.setState({ visible: false });
        
      }
      handleSave () {//编辑一条记录
        const  details=this.formRef.getItemsValue();
        // console.log(details);
        details['id']=this.props.record.repoRedTable.id;
         
         const createPersonId=JSON.parse(localStorage.getItem('menuList')).userId;//取出来的时候要将json格式转成对象，存进去的时候要转成json
         const isUrgent=this.state.checkSwitch;
         const commonBatchNumber={
             id:this.props.record.commonBatchNumber.id,
             batchNumber:this.props.record.commonBatchNumber.batchNumber,
             createPersonId:createPersonId,
             status:-1,
             isUrgent:isUrgent,
         }
         axios({
               url:`${this.server}/jc/common/repoRedTable`,
               method:'put',
               headers:{
                   'Authorization':this.Authorization
               },
               data:{
                 commonBatchNumber:commonBatchNumber,
                 details: details,
                 },
               type:'json'
 
         }).then((data)=>{
                 message.info(data.data.message);
                 this.props.fetch();
         }).catch(()=>{
           message.info('编辑失败，请联系管理员！');
         });
         this.setState({ visible: false });
         this.formRef.resetField();
         }
      //红单是否紧急
   urgentChange=(checked)=>{//checked指定当前是否选中
    //console.log(`switch to ${checked}`);//选中的话checked为true
    this.setState({
        checkSwitch:checked?0:-1
    });
  }
           //监听流程下拉框变化
    selectChange=(value)=>{
        this.setState({checkSelectData:value});
    }
    hide(){//送审气泡的取消
      
      this.setState({popVisible:false});
    }
    handleVisibleChange=(visible)=>{
      
       this.setState({
         popVisible:visible
       })
   }
   getCheck(dataBatchNumberId,taskBatchNumberId){//调用代办事项接口
    axios({
        url:`${this.server}/jc/common/toDoList/${taskBatchNumberId}?dataId=${dataBatchNumberId}`,
        method:'post',
        headers:{
            'Authorization':this.Authorization
        },
        data:{dataBatchNumberId,taskBatchNumberId},
        type:'json'
     }).then((data)=>{
         message.info(data.data.message);
         this.props.fetch();
     }).catch(()=>{
         message.info('新增失败，请联系管理员！');
     });
   }
   handleSongShenOk(){//送审事件的确认按钮
    const details=this.formRef.getItemsValue();
   // console.log(details);
    details['id']=this.props.record.repoRedTable.id;
    
    const createPersonId=JSON.parse(localStorage.getItem('menuList')).userId;//取出来的时候要将json格式转成对象，存进去的时候要转成json
    const isUrgent=this.state.checkSwitch;
    const commonBatchNumber={
        id:this.props.record.commonBatchNumber.id,
        batchNumber:this.props.record.commonBatchNumber.batchNumber,
        createPersonId:createPersonId,
        status:-1,
        isUrgent:isUrgent,
    }
    axios({
          url:`${this.server}/jc/common/repoRedTable`,
          method:'put',
          headers:{
              'Authorization':this.Authorization
          },
          data:{
            commonBatchNumber:commonBatchNumber,
            details: details,
            },
          type:'json'

    }).then((data)=>{
        const res=data.data.data;
        const dataBatchNumberId=res.commonBatchNumber.id;//返回的batchnumberId
        const taskBatchNumberId=this.state.checkSelectData;//选择的流程id
        this.getCheck(dataBatchNumberId,taskBatchNumberId);//调用待办事项的送审
            this.props.fetch();
    }).catch(()=>{
      message.info('编辑失败，请联系管理员！');
    });
    this.setState({ visible: false });
  
  this.setState({popVisible:false});
}
         
    render(){
        return(
            <span>
            <span className={this.props.editFlag?'blue':'grey'} onClick={this.props.editFlag?this.showModal:this.notShowModal} >编辑</span>
            <Modal
                visible={this.state.visible}
                maskClosable={false}
                closable={false}
                title="编辑红单"
                width='360px'
            
             // footer下的每个组件都要有唯一的key
            footer={[
                <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                <SaveButton key='save'   handleSave={this.handleSave}>保存</SaveButton>,
                <Popover key='songshen' title='设置审批细节' width='50%' height='40%'
                maskClosable={false}
                 content={
                     <div style={{width:250 ,height:150}}>
                        <div>
                        <Select placeholder='选择送审流程' style={{width:150}} onChange={this.selectChange}>
                        {
                            this.props.process.map((pro)=>{
                                    return(
                                      <Option key={pro.commonBatchNumber.id} value={pro.commonBatchNumber.id}>{pro.commonBatchNumber.description}</Option>

                                    );
                            })
                        }
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
          <ProductRedListEditModal serialNumber={this.props.serialNumber} record={this.props.record}/>
          </Modal>
          </span>
        );
    }
}
export default Edit;