import React, { Component } from 'react';
import {Modal} from 'antd'; 
import axios from 'axios';
import CancleButton from '../../BlockQuote/cancleButton';
import NewButton from '../../BlockQuote/newButton';
import DetailModal from './detailModal';

class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            standardData:[],
            effectiveTime:'',//实行日期
            createTime:''//编制日期
        }
        this.showModal=this.showModal.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.getDetail=this.getDetail.bind(this);
    }
    getDetail(){
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
            visible:true
        });
    }
   handleCancel(){
     this.setState({visible:false});
   }
    render(){
       
        return(
            <span>
                <span className='blue' onClick={this.showModal}>详情</span>
                <Modal
                   title='数据详情'
                   visible={this.state.visible}
                   maskClosable={false}
                   closable={false}
                   footer={[
                      <CancleButton key='cancel'  handleCancel={this.handleCancel} flag={1}/>,
                      <span key='text' style={{color:'#999999'}}>以此为基础迭代更新&nbsp;</span>,
                      <NewButton key='interate' name='迭代' className='fa fa-level-up'/>
                   ]}
                 >
                 <DetailModal data={this.state.standardData}  effectiveTime={this.state.effectiveTime} createTime={this.state.createTime} record={this.props.record} raw={this.props.raw} factory={this.props.factory} />
                 </Modal>
            </span>
        );
    }
}
export default Detail;