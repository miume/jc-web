import React ,{Component}from 'react';
import {Button,Modal,Select,Popover,Switch,message} from 'antd';
import CancleButton from '../../../BlockQuote/cancleButton';
import SaveButton from '../../../BlockQuote/saveButton';
import RawMaterialRedListEditModal from './EditModal';
import axios from 'axios';
import Submit from '../../../BlockQuote/checkSubmit';
const Option=Select.Option;

class Edit extends Component{
   url;
    constructor(props){
        super(props);
        this.state = {
            visible : false,
           // checkSelectData:-1,//最开始下拉框是没选择数据的
           // popVisible:false,//送检的气泡弹出
            //checkSwitch:-1,//是否紧急那个开关最开始是关闭的
        }
        this.showModal=this.showModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        //this.hide=this.hide.bind(this);//送审气泡的取消
        this.handleSongShenOk=this.handleSongShenOk.bind(this);//送审事件点击确认按钮
        //this.selectChange=this.selectChange.bind(this);//监听下拉框变化，
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
       details['id']=this.props.record.repoRedTable.id;
       details['quantityLoss']=1;
        const createPersonId=JSON.parse(localStorage.getItem('menuList')).userId;//取出来的时候要将json格式转成对象，存进去的时候要转成json
       // const isUrgent=this.state.checkSwitch;
        const commonBatchNumber={
            id:this.props.record.commonBatchNumber.id,
            batchNumber:this.props.record.commonBatchNumber.batchNumber,
            createPersonId:createPersonId,
            // status:-1,
            // isUrgent:isUrgent,
        }
        axios({
              url:`${this.url.redList.redList1}`,
              method:'put',
              headers:{
                  'Authorization':this.url.Authorization
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

   getCheck(dataId,taskId,urgent){//调用代办事项接口
    axios({
        url:`${this.url.toDoList}/${taskId}?dataId=${dataId}&isUrgent=${urgent}`,
        method:'post',
        headers:{
            'Authorization':this.url.Authorization
        },

        type:'json'
     }).then((data)=>{
         message.info(data.data.message);
         this.props.fetch();
     }).catch(()=>{
         message.info('编辑失败，请联系管理员！');
     });
   }
    handleSongShenOk(process,urgent){//送审事件的确认按钮
        const details=this.formRef.getItemsValue();
        details['id']=this.props.record.repoRedTable.id;
        details['quantityLoss']=1;
        const createPersonId=JSON.parse(localStorage.getItem('menuList')).userId;//取出来的时候要将json格式转成对象，存进去的时候要转成json
        //const isUrgent=this.state.checkSwitch;
        const commonBatchNumber={
            id:this.props.record.commonBatchNumber.id,
            batchNumber:this.props.record.commonBatchNumber.batchNumber,
            createPersonId:createPersonId,
            // status:-1,
            // isUrgent:isUrgent,
        }
        axios({
              url:`${this.url.redList.redList1}`,
              method:'put',
              headers:{
                  'Authorization':this.url.Authorization
              },
              data:{
                commonBatchNumber:commonBatchNumber,
                details: details,
                },
              type:'json'

        }).then((data)=>{
            const res=data.data.data;
            const dataId=res.commonBatchNumber.id;//返回的batchnumberId
            const taskId=process;//选择的流程id
            this.getCheck(dataId,taskId,urgent);//调用待办事项的送审
            this.props.fetch();
        }).catch(()=>{
          message.info('编辑失败，请联系管理员！');
        });

        this.setState({ visible: false });
        this.formRef.resetField();

    }

    render(){
        this.url=JSON.parse(localStorage.getItem('url'));
        return(
            <span className={this.props.flag?'':'hide'}>
            <span className={this.props.editFlag?'blue':'notClick'} onClick={this.props.editFlag?this.showModal:this.notShowModal}>编辑</span>
            <Modal
                visible={this.state.visible}
                maskClosable={false}
                closable={false}
                title="编辑红单"
                width='450px'

             // footer下的每个组件都要有唯一的key
            footer={[
                <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                <SaveButton key='save'   handleSave={this.handleSave}>保存</SaveButton>,
                <Submit key='submit' applySaveAndReview={this.handleSongShenOk} url={this.url}/>
            ]}
          >
          <RawMaterialRedListEditModal
          serialNumber={this.props.serialNumber}
          record={this.props.record}
          urgent={this.state.checkSwitch}
          wrappedComponentRef={(form)=>this.formRef=form}/>
          </Modal>
          </span>
        );
    }
}
export default Edit;
