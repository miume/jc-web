//当没有设置标准时，会显示这个界面
import React, { Component } from 'react';
import {Modal,message} from 'antd';
import axios from 'axios';
import SearchCell from '../../BlockQuote/search';
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';
import SaveButton from '../../BlockQuote/saveButton';
import Submit from '../../BlockQuote/submit';
import '../block.css';
import SetStandardModal from './setSandardModal';

class SetStandard extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            popVisible:false,//送审气泡是否弹出
            data:[],
            date:'',//最开始没有选择施行日期
            checkSelectData:-1,//最开始下拉框是没选择数据的
            checkSwitch:0,//是否紧急那个开关最开始是关闭的
        }
        this.showModal=this.showModal.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleVisibleChange=this.handleVisibleChange.bind(this);
        this.handleHide=this.handleHide.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.handleDate=this.handleDate.bind(this);
        this.selectChange=this.selectChange.bind(this);//监听送审流程变化
        this.urgentChange=this.urgentChange.bind(this);//监听是否紧急
        this.dataProcess=this.dataProcess.bind(this);
        this.getCheck=this.getCheck.bind(this);
        this.checkRaw=this.checkRaw.bind(this);
        this.fetch=this.fetch.bind(this);
        this.clickCheck=this.clickCheck.bind(this);
        this.clickSave=this.clickSave.bind(this);
        this.handleSaveCheck=this.handleSaveCheck.bind(this);
    }
 
    showModal(){
        // console.log(this.props.rawMaterialId);
        axios({
            url:`${this.props.url.rawStandard.rawItems}?rawId=${this.props.rawMaterialId}`,
            method:'get',
            headers:{
               'Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            // console.log(data);
            const res=data.data.data;
           // console.log(res);
            if(res){ 
                for(var i=0;i<res.length;i++){
                    res[i]['index']=i+1;
                }
              this.setState({data:res});
            }
        });
        this.setState({
            visible:true
        });
    }
    inputChange(da){
         //console.log(da);
          this.setState({data:da});
    }
    handleDate(d){
       //console.log(d);
       this.setState({
           date:d
       });
    }
    dataProcess(status){//对保存和送审的数据进行处理
        const {date}=this.state;
        if(date===''){
            message.info('施行日期不能为空!');
            return
        }
        var {data}=this.state;
        const createPersonId=JSON.parse(localStorage.getItem('menuList')).userId;
        const commonBatchNumber={
            createPersonId:createPersonId
        }
        var rawStandards=[];
        for(var i=0;i<data.length;i++){
              var raw=data[i];
              if(typeof(raw.value)==='undefined') {
                  message.info('输入框填写不全!');
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
            effectiveTime:this.state.date ,
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
        //console.log(saveData)
       this.handleSaveCheck(saveData,status);//根据status调用保存或送审接口
        // return saveData;
    }
    clickSave(){//点击保存
        this.dataProcess(0);
    }
    clickCheck(){//点击送审
        this.dataProcess(1);
    }
    handleSaveCheck(saveData,status){//保存接口
        //console.log(saveData); 
        this.setState({visible:false,popVisible:false});
        axios({
            url:`${this.props.url.rawStandard.getStandard}`,
            method:'post',
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
                // this.setState({
                //     popVisible:false,
                // });
               }
            }
        })
        .catch(()=>{
            message.info('建立标准失败，请联系管理员!');
        });
        this.setState({
            visible:false
        });
    }
    handleCancel(){//点击新增的取消
        this.setState({
            visible:false,
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
                this.props.getStandard(this.props.rawManufacturerId);
                //this.props.onBlockChange(3,this.props.factory);//只有送审成功了，才会跳到设置标准那个表格界面
            }
        })
        .catch(()=>{
           message.info('送审失败，请联系管理员！');
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
    checkRaw(e){//点击重新选择厂家调用的函数
        //    const name=this.props.returnRaw();
        //    console.log(name);
            this.props.onBlockChange(2,'设置标准');//跳回原材料界面后，就不可以点击那个面板了
        }
    fetch(){

    }
    render(){
        return(
            <div>
                <div  className='rawMaterailStandardMiddle'>
                     <span className='product-standrad-middle-text'>请设置标准</span>
                     <span className='fr'>
                      <SearchCell name='请输入创建人名称'
                        fetch={this.fetch}
                      />
                     </span>
                </div>
                <div className='rawStandardImageDiv'>
                   <img src={require(`../standard.png`)} alt='图片加载失败' className='rawStandardImage'  />
                </div>
                <div className='rawStandardFontUp' >
                       <p>您还没建立任何标准</p>
                </div>
                <div className='rawStandardFontDown'>
                      <p>需要建立一套标准后才能执行相关操作</p>
                </div>
                <div style={{textAlign:'center'}}>
                    <NewButton  handleClick={this.showModal}  className='fa fa-plus' name='建立标准'/>
                    <Modal
                        title='设置标准'
                        visible={this.state.visible}
                        closable={false}
                        maskClosable={false}
                        footer={[
                            <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                            <SaveButton key='save' handleSave={this.clickSave}/>,
                            <Submit  key='submit' visible={this.state.popVisible} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange}  handleCancel={this.handleHide} handleOk={this.clickCheck} process={this.state.checkSelectData} defaultChecked={false} url={this.props.url} urgentChange={this.urgentChange}/> 
                        ]}
                    >
                            <SetStandardModal data={this.state.data}  raw={this.props.raw} factory={this.props.factory} handleSave={this.handleSave} inputChange={this.inputChange} handleDate={this.handleDate}/>
                    </Modal>
                </div>
                <div className='rawStandardPosition' onClick={this.checkRaw}>重新选择厂家</div>
            </div>
        );
    }
}
export default SetStandard;
