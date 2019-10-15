import React from 'react';
//import $ from 'jquery';
import {Modal,message} from 'antd';
import SaveButton from '../../../BlockQuote/saveButton';
import CancleButton from '../../../BlockQuote/cancleButton';
import NewButton from '../../../BlockQuote/newButton';
import Submit from '../../../BlockQuote/checkSubmit';
import RawMaterialRedListAddModal from './addModal';
import axios from 'axios';


class Add extends React.Component{
    url;
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            //checkSelectData:-1,//最开始下拉框是没选择数据的
            //popVisible:false,//送检的气泡弹出
            //checkSwitch:0,//是否紧急那个开关最开始是关闭的
        }
        this.showModal=this.showModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSongShenOk=this.handleSongShenOk.bind(this);//送审事件点击确认按钮
    }

    /**处理新增一条记录 */
    showModal = () => {
        this.setState({
          visible: true
        });
      }
    handleSave() {//点击新增保存，未申请状态
        const value=this.formRef.getItemsValue();
        value['quantityLoss']=1;
        //console.log(value);
        const createPersonId=JSON.parse(localStorage.getItem('menuList')).userId;//取出来的时候要将json格式转成对象，存进去的时候要转成json
        const commonBatchNumber={
            createPersonId:createPersonId,
            status:-1,
            //isUrgent:this.state.checkSwitch,
        }
        if(!value['serialNumberId']||!value['weightLoss']){
            message.info('信息填写不完整！');
            return
        }
        axios({
           url:`${this.url.redList.redList1}`,
           method:'post',
           headers:{
                   'Authorization':this.url.Authorization
           },
           data:{
                commonBatchNumber:commonBatchNumber,
                details: value,
           },
           type:'json'
        }).then((data)=>{
           // console.log(data);
            //const res=data.data.data;
            message.info(data.data.message);
            this.props.fetch();
        })
        .catch(()=>{
            message.info('新增失败，请联系管理员！');
        });
        this.setState({
        visible: false
        });
        this.formRef.resetField();
    }
    handleCancel() {//点击新增的取消
       // console.log(this.state);
        this.setState({
            visible: false,
            // checkSelectData:-1,
            // checkSwitch:0
        });
        //console.log(this.state);
         this.formRef.resetField();//重置表单
    }

    //监听流程下拉框变化
    // selectChange=(value)=>{
    //     //console.log(value);//得到的是id
    //     this.setState({checkSelectData:value});
    // }
    // selectOnSelect(value){
    //    // console.log(value);
    //     this.setState({checkSelectData:-1});
    // }


//     handleVisibleChange=(visible)=>{//点击送审按钮，弹出气泡
//        this.setState({
//          popVisible:visible
//        })
//    }
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
         message.info('审核失败，请联系管理员！');
     });
   }
    handleSongShenOk(process,urgent){//送审事件的确认按钮(先保存，在送审)
        const value=this.formRef.getItemsValue();
        value['quantityLoss']=1;
        const createPersonId=JSON.parse(localStorage.getItem('menuList')).userId;//取出来的时候要将json格式转成对象，存进去的时候要转成json
        const commonBatchNumber={
            createPersonId:createPersonId,
            status:-1,
            //isUrgent:this.state.checkSwitch,
        }
        if(!value['serialNumberId']||!value['weightLoss']){
            message.info('信息填写不完整！');
            return
        }
        axios({
           url:`${this.url.redList.redList1}`,
           method:'post',
           headers:{
                   'Authorization':this.url.Authorization
           },
           data:{
                commonBatchNumber:commonBatchNumber,
                details: value,
           },
           type:'json'
        }).then((data)=>{
            //console.log(data);
            const res=data.data.data;
            const dataId=res.commonBatchNumber.id;//返回的batchnumberId
            const taskId=process;//选择的流程id
            this.getCheck(dataId,taskId,urgent);//调用待办事项的送审
            this.props.fetch();
        })
        .catch(()=>{
            message.info('新增失败，请联系管理员！');
        });

      this.setState({
        visible: false,//modal的取消
        });
      this.formRef.resetField();
    }

   //红单是否紧急
//    urgentChange=(checked)=>{//checked指定当前是否选中
//       //console.log(`switch to ${checked}`);//选中的话checked为true
//       this.setState({
//           checkSwitch:checked?1:0
//       });
//     }

    render() {
        this.url=JSON.parse(localStorage.getItem('url'));
        return (
            <span className={this.props.flag?'':'hide'}>
                <NewButton   handleClick={this.showModal} className='fa fa-plus'  name='新增' />&nbsp;&nbsp;&nbsp;
                <Modal  visible={this.state.visible}
                        maskClosable={false}
                        closable={false}
                        title="新增红单"
                        width='450px'
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                        <SaveButton key='save'   handleSave={this.handleSave}>保存</SaveButton>,
                        // <Popover key='songshen'   title='设置审批细节' width='50%' height='40%'
                        //  content={
                        //      <div style={{width:300 ,height:130}}>
                        //         <div>
                        //             <Select className='select'  allowclear='true'  placeholder='选择送审流程' style={{width:150}} onChange={this.selectChange} >
                        //               {
                        //                   this.props.process.map((pro)=>{
                        //                           return(
                        //                             <Option key={pro.commonBatchNumber.id} value={pro.commonBatchNumber.id}>{pro.commonBatchNumber.description}</Option>

                        //                           );
                        //                   })
                        //               }
                        //             </Select>
                        //         </div>
                        //         <div style={{paddingTop:'10px'}}>
                        //           <span>是否紧急</span>&nbsp;&nbsp;<Switch id='switch' onChange={this.urgentChange}/>
                        //         </div>
                        //         <div style={{paddingTop:'10px' ,float:'right'}}>
                        //             <Button type='ghost'size='small' onClick={this.hide} className='button'>取消</Button>
                        //             <Button type='primary' size='small'   className={this.state.checkSelectData>-1?'button':'grey-button'}   disabled={this.state.checkSelectData>-1?false:true} onClick={this.handleSongShenOk}>确认</Button>
                        //         </div>
                        //      </div>
                        //  }
                        //  trigger='click'
                        //  visible={this.state.popVisible}
                        //  onVisibleChange={this.handleVisibleChange}
                        // >
                        // <Button key='submit' type='primary'> type='check'/>送审</Button>
                        // </Popover>
                         <Submit  key='submit'   applySaveAndReview={this.handleSongShenOk}  url={this.url} />
                    ]}>
                    <RawMaterialRedListAddModal serialNumber={this.props.serialNumber}  wrappedComponentRef={(form)=>this.formRef=form}></RawMaterialRedListAddModal>

                </Modal>
            </span>
        );
    }
}
export default Add;