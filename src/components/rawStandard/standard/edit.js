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
        }
        this.getDetail=this.getDetail.bind(this);
        this.showModal=this.showModal.bind(this);
        this.notShowModal=this.notShowModal.bind(this);
        this.showModalDetail=this.showModalDetail.bind(this);
        this.handleSave=this.handleSave.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleVisibleChange=this.handleVisibleChange.bind(this);
        this.handleSongShenOk=this.handleSongShenOk.bind(this);
        this.handleHide=this.handleHide.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.handleDate=this.handleDate.bind(this);
        this.selectChange=this.selectChange.bind(this);//监听送审流程变化
        this.urgentChange=this.urgentChange.bind(this);//监听是否紧急
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
                    effectiveTime:effectiveTime,
                    createTime:createTime
                });
            }
        });
     }
    showModal(){
       this.getDetail();
        this.setState({
            visible:true,
            flag:true
        });
    }
    notShowModal(){
        this.setState({
            visible:false
        });
    }
    showModalDetail(){
        this.getDetail();
        this.setState({
            visible:true,
            flag:false
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
    handleSave(){//点击编辑保存，未申请状态
        var data=this.state.standardData;
        const createPersonId=JSON.parse(localStorage.getItem('menuList')).userId;
        const commonBatchNumber={
            createPersonId:createPersonId,
            id:this.props.record.batchNumberId //编辑要多传一个批号id
        }
        var rawStandards=[];
        for(var i=0;i<data.length;i++){
              var raw=data[i];
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
        axios({
            url:`${this.props.url.rawStandard.getStandard}`,
            method:'post',
            headers:{
               'Authorization':this.props.url.Authorization
            },
            data:{
                commonBatchNumber:commonBatchNumber,
                details:{
                    rawStandards:rawStandards,
                    techniqueRawStandardRecord:techniqueRawStandardRecord
                }
            },
            type:'json'
        })
        .then(data=>{
           // console.log(data);
            const res=data.data.data;
            if(res){
                message.info(data.data.message);
                //this.props.onBlockChange(3,this.props.factory);//如果返回的数据不为空，说明建立好标准了，就会渲染标准界面
            }
        })
        .catch(()=>{
            message.info('迭代失败，请联系管理员！');
        });
        this.setState({
            visible:false
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
             message.info(data.data.message);
        })
        .catch(()=>{
           message.info('送审失败，请联系管理员！');
        });

    }
    handleSongShenOk(){//点击送审的确定
        var data=this.state.standardData;
        const createPersonId=JSON.parse(localStorage.getItem('menuList')).userId;
        const commonBatchNumber={
            createPersonId:createPersonId,
            id:this.props.record.batchNumberId
         }
        var rawStandards=[];
        for(var i=0;i<data.length;i++){
             var raw=data[i];
             rawStandards.push({
                techniqueRawTestItemStandard:{
                    testItemId:raw.id,
                    value:raw.value
                 }
             });
        }
        const techniqueRawStandardRecord={
            effectiveTime:this.state.date,
            rawManufacturerId:this.props.rawManufacturerId,
            rawMaterialId:this.props.rawMaterialId
        }
        axios({
             url:`${this.props.url.rawStandard.getStandard}`,
             method:'post',
             headers:{
                 'Authorization':this.props.url.Authorization
             },
             data:{
                commonBatchNumber:commonBatchNumber,
                details:{
                    rawStandards:rawStandards,
                    techniqueRawStandardRecord:techniqueRawStandardRecord
                }
             },
             type:'json'
        }).then(data=>{
              const res=data.data.data;
              console.log(res);
              const taskId=res.commonBatchNumber.id;//返回的batchnumberId
              const dataId=this.state.checkSelectData;//选择的流程id'
              this.getCheck(dataId,taskId);
              this.props.getStandard(this.props.rawManufacturerId);
              
        }).catch(()=>{
            message.info('送审失败，请联系管理员！');
        });
          this.setState({
              popVisible:false,
              visible:false
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
            <span>
                    {this.props.flag?(<span className='blue' onClick={this.showModalDetail}>详情</span>)
                    :(<span className={this.props.editFlag?'blue':'notClick'} onClick={this.props.editFlag?this.showModal:this.notShowModal}>编辑</span>)
                    }
                    <Modal
                        title={this.state.flag?'编辑标准':'数据详情'}
                        visible={this.state.visible}
                        closable={false}
                        maskClosable={false}
                        footer={this.state.flag?([
                            <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                            <SaveButton key='save' handleSave={this.handleSave}/>,
                            <Submit  key='submit' visible={this.state.popVisible} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange}  handleCancel={this.handleHide} handleOk={this.handleSongShenOk} process={this.state.checkSelectData} defaultChecked={false} url={this.props.url} urgentChange={this.urgentChange}/> 
                        ]):([
                            <CancleButton key='cancel'  handleCancel={this.handleCancel} flag={1}/>,
                            <span key='text' style={{color:'#999999'}}>以此为基础迭代更新&nbsp;</span>,
                            <NewButton key='interate' name='迭代' className='fa fa-level-up' handleClick={this.showModal}/>
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
