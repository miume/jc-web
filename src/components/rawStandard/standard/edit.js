import React, { Component } from 'react';
import {Modal,message} from 'antd';
import axios from 'axios';
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';
import SaveButton from '../../BlockQuote/saveButton';
import Submit from '../../BlockQuote/submit';
import '../block.css';
import EditStandardModal from './editModal';
import DetailModal from './detailModal';
class EditStandard extends Component{
   
    constructor(props){
        super(props);
        this.state={
            visible:false,
            popVisible:false,//送审气泡是否弹出
            date:'',//最开始没有选择施行日期
            checkSelectData:-1,//最开始下拉框是没选择数据的
            checkSwitch:0,//是否紧急那个开关最开始是关闭的
            effectiveTime:'',//施行日期
            standardData:[],//编辑显示的数据
            flag:true,//为真的时候显示编辑界面，为假的时候显示详情界面
            flag1:true,//为真的时候调用编辑界面，为假的时候调用新增
            title:''
        }
        this.getDetail=this.getDetail.bind(this);
        this.showModal=this.showModal.bind(this);
        this.notShowModal=this.notShowModal.bind(this);
        this.showModalDetail=this.showModalDetail.bind(this);
        this.clickIterate=this.clickIterate.bind(this);
        this.handleSaveCheck=this.handleSaveCheck.bind(this);
        this.handleDetailSave=this.handleDetailSave.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleVisibleChange=this.handleVisibleChange.bind(this);
        this.handleDetailSongShenOk=this.handleDetailSongShenOk.bind(this);
        this.handleHide=this.handleHide.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.handleDate=this.handleDate.bind(this);
        this.selectChange=this.selectChange.bind(this);//监听送审流程变化
        this.urgentChange=this.urgentChange.bind(this);//监听是否紧急
        this.dataProcess=this.dataProcess.bind(this);
        this.getCheck=this.getCheck.bind(this);
        this.clickCheck=this.clickCheck.bind(this);
        this.clickSave=this.clickSave.bind(this);
        this.handleDetailSaveCheck=this.handleDetailSaveCheck.bind(this);
    }
    getDetail(){//获取标准详情
        const batchNumberId=this.props.record.batchNumberId;
        //console.log( batchNumberId);
        axios({
            url:`${this.props.url.rawStandard.getStandard}/${batchNumberId}`,
            method:'get',
            headers:{
             'Authorization':this.props.url.Authorization
            },
        })
        .then(data=>{
            //console.log(data);
            const res= data.data.data.details.rawStandards;
            const createTime=data.data.data.commonBatchNumber.createTime;
            const effectiveTime=data.data.data.details.techniqueRawStandardRecord.effectiveTime;
            //console.log(effectiveTime);            
            if(res){
                var raw=[];
                for(var i=0;i<res.length;i++){
                       raw.push({
                           id:res[i].testItem.id,
                           index:i+1,
                           name:res[i].testItem.name,
                           value:res[i].techniqueRawTestItemStandard.value,
                           unit:res[i].testItem.unit,
                       });
                }
                this.setState({
                    standardData:raw,
                    date:effectiveTime,
                    effectiveTime:effectiveTime,
                    createTime:createTime
                });
            }
        });
     }
    showModal(){//点击详情会显示编辑界面，title是编辑标准
       this.getDetail();
        this.setState({
            visible:true,
            flag:true,
            flag1:true,
            title:'编辑标准'
        });
    }
    notShowModal(){
        this.setState({
            visible:false
        });
    }
    showModalDetail(){//点击详情会显示详情界面，title是数据详情
        this.getDetail();
        this.setState({
            visible:true,
            flag:false,
            flag1:false,
            title:'数据详情'
        });
    }
    clickIterate(){//点击详情界面的迭代会跳到跟编辑一样的界面，但是点击底下的保存和送审掉的是新增接口
         this.getDetail();
         this.setState({
             visible:true,
             flag:true,
             flag1:false,//为假时，底下的保存和送审掉的是新增接口
             title:'迭代标准'
         });
    }
    
    inputChange(da){
      //  console.log(da);
          this.setState({standardData:da});
    }
    handleDate(d){
       //console.log(d);
       this.setState({
           date:d
       });
    }
    dataProcess(status){//对新增，编辑的数据处理
        const {date}=this.state;
        if(!date){
            message.info('施行日期不能为空!');
            return 
        }
        const data=this.state.standardData;
        const createPersonId=JSON.parse(localStorage.getItem('menuList')).userId;
        const commonBatchNumber={
            createPersonId:createPersonId,
            id:this.props.record.batchNumberId //编辑要多传一个批号id
        }
        var rawStandards=[];
        for(var i=0;i<data.length;i++){
              var raw=data[i];
              if(typeof(raw.value)==='undefined'){
                  message.info('输入框填写不全');
                  return
              }
              rawStandards.push({
                techniqueRawTestItemStandard:{
                    testItemId:raw.id,
                    value:raw.value
                }
              });
        }
        const techniqueRawStandardRecord={
            effectiveTime:this.state.date,
            rawManufacturerId:this.props.rawManufacturerId ,
            rawMaterialId: this.props.rawMaterialId 
        }
        const details={
            rawStandards:rawStandards,
            techniqueRawStandardRecord:techniqueRawStandardRecord
        }
        const saveData={
            commonBatchNumber:commonBatchNumber,
            details:details
        }
       if(this.state.flag1){
        this.handleSaveCheck(saveData,status);//根据status调用编辑保存或送审接口
       }
       else{
           this.handleDetailSaveCheck(saveData,status);//根据status调用迭代（新增）保存或送审接口
       }
    }
    clickSave(){//点击编辑保存
          this.dataProcess(0);
    }
    clickCheck(){//点击编辑送审
        this.dataProcess(1);
    }
    handleDetailSave(){//点击迭代保存
        this.dataProcess(0);
    }
    handleDetailSongShenOk(){//点击迭代送审
        this.dataProcess(1);
    }
    handleSaveCheck(saveData,status){//点击编辑保存，未申请状态
        this.setState({visible:false,popVisible:false});
        axios({
            url:`${this.props.url.rawStandard.getStandard}`,
            method:'put',
            headers:{
               'Authorization':this.props.url.Authorization
            },
            data:saveData,
            type:'json'
        })
        .then(data=>{
            //console.log(data);
            const res=data.data.data;
            if(res){
                if(status===0){
                    message.info(data.data.message);
                    if(data.data.code===0){
                        this.props.getStandard(this.props.rawManufacturerId);
                    }
                }
                else{
                    const dataId=res.commonBatchNumber.id;//返回的batchnumberId
                    const taskId=this.state.checkSelectData;//选择的流程id'
                    this.getCheck(dataId,taskId);
                }
            }
        })
        .catch(()=>{
            message.info('编辑失败，请联系管理员！');
        });   
    }
    handleDetailSaveCheck(saveData,status){//点击迭代的保存或送审
        // console.log('yeirw');
        this.setState({
            visible:false,
            popVisible:false
        });
         axios({
               url:`${this.props.url.rawStandard.getStandard}`,
               method:'post',
               headers:{
                   'Authorization':this.props.url.Authorization
               },
               data:saveData,
               type:'json'
         })
         .then((data)=>{
             const res=data.data.data;
            if(res){
                if(status===0){
                    message.info(data.data.message);
                    if(data.data.code===0){
                        this.props.getStandard(this.props.rawManufacturerId);
                    }
                }
                else{
                    const dataId=res.commonBatchNumber.id;//返回的batchnumberId
                    const taskId=this.state.checkSelectData;//选择的流程id'
                    this.getCheck(dataId,taskId);
                }
            }
         })
         .catch(()=>{
             message.info('迭代保存失败，请联系管理员');
         });
     }
    handleCancel(){//点击Modal的取消
        this.setState({
            visible:false
        });
    }
    selectChange(value){//监听送审流程框的变化
        this.setState({
            checkSelectData:value
        });
    }
    urgentChange(checked){//是否紧急,checked指定当前是否选中
         this.setState({
             checkSwitch:checked?1:0
         });
    }
    getCheck(dataId,taskId){//调用代办事项接口
        const isUrgent=this.state.checkSwitch;
        axios({
            url:`${this.props.url.toDoList}/${taskId}?dataId=${dataId}&isUrgent=${isUrgent}`,
            method:'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
        })
        .then(data=>{
            //console.log(data);
             message.info(data.data.message);
             if(data.data.code===0){
                this.props.getStandard(this.props.rawManufacturerId);//只有送审成功了才会调这个接口，获取表格数据
             }
        })
        .catch(()=>{
          // message.info('送审失败，请联系管理员！');
        });

    }
    handleHide(){//送审气泡的取消
        this.setState({
            popVisible:false,//气泡取消
        });
    }
    handleVisibleChange=(visible)=>{
        this.setState({
          popVisible:visible
        })
    }
    render(){
        return(
            <span >
                    {this.props.flag?(<span className='blue' onClick={this.showModalDetail}>详情</span>):
                    (<span className={this.props.home.judgeOperation(this.props.operation,'UPDATE')?'':'hide'}><span className={this.props.editFlag?'blue':'notClick'} onClick={this.props.editFlag?this.showModal:this.notShowModal}>编辑</span></span>)
                    }
                    <Modal
                        title={this.state.title}
                        visible={this.state.visible}
                        closable={false}
                        maskClosable={false}
                        footer={this.state.flag?([
                            <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                            <SaveButton key='save' handleSave={this.state.flag1?this.clickSave:this.handleDetailSave}/>,
                            <Submit  key='submit' visible={this.state.popVisible} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange}  handleCancel={this.handleHide} handleOk={this.state.flag1?this.clickCheck:this.handleDetailSongShenOk} process={this.state.checkSelectData} defaultChecked={false} url={this.props.url} urgentChange={this.urgentChange}/> 
                        ]):([
                            <CancleButton key='cancel'  handleCancel={this.handleCancel} flag={1}/>,
                            <span key='span' className={this.props.iterateFlag?'':'hide'}>
                                 <span key='text' style={{color:'#999999'}}>以此为基础迭代更新&nbsp;</span>
                                 <NewButton key='interate' name='迭代' className={'fa fa-level-up'} handleClick={this.clickIterate}/>         
                            </span>
                        ])}
                    >
                        {this.state.flag?(<EditStandardModal record={this.props.record} standardData={this.state.standardData} effectiveTime={this.state.effectiveTime} raw={this.props.raw} factory={this.props.factory} handleSave={this.handleSave} inputChange={this.inputChange} handleDate={this.handleDate}/>):
                        (<DetailModal data={this.state.standardData}  effectiveTime={this.state.effectiveTime} createTime={this.state.createTime} record={this.props.record} raw={this.props.raw} factory={this.props.factory} />)
                        }
                    </Modal>
                </span>
           
        );
    }
}
export default EditStandard;
