import React from 'react';
import {Modal,Tabs,message,Spin} from 'antd';
import WhiteSpace from '../../../BlockQuote/whiteSpace';
import axios from 'axios';
import CancleButton from "../../../BlockQuote/cancleButton";
import Instrument from "./instrument";
import Assay from "./assay";
import Device from "./device";

const TabPane=Tabs.TabPane;
class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible : false,
            instrumentData:[],
            deviceData:[],
            assayData:[],
            loading:false
        }
    }
    tabChange=(key)=>{
        console.log(key);
    }
    handleDetail = () =>{
        this.setState({
            visible:true,
            loading:true
        })
        let {batchId}=this.props
        axios({
            url:this.props.url.productionBatchInfo.getDetail,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                batchId:batchId
            }
        }).then(data=>{
            let res=data.data.data  //一个对象，里面有三个数组
           if(res){
              if(res.batchInstrumentMapList){
                for(let i=0;i<res.batchInstrumentMapList.length;i++){
                    res.batchInstrumentMapList[i]['index']=i+1
                  }
              }
              if(res.batchDeviceMapList){
                for(let i=0;i<res.batchDeviceMapList.length;i++){
                    res.batchDeviceMapList[i]['index']=i+1
                  }
              }
              if(res.batchAssayMapList){
                for(let i=0;i<res.batchAssayMapList.length;i++){
                    res.batchAssayMapList[i]['index']=i+1
                  }
              }
            this.setState({
                instrumentData:res.batchInstrumentMapList,
                deviceData :res.batchDeviceMapList,
                assayData:res.batchAssayMapList,
                loading:false
            })
           }
        }).catch(()=>{
            message.error('操作失败，请联系管理员!')
        })
    }

    handleCancel=()=>{
        this.setState({
            visible: false
        });
    }
    render(){
        let {instrumentData,deviceData,assayData}=this.state
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Spin spinning={this.state.loading}>
                    <Modal
                        title='详情'
                        visible={this.state.visible}
                        width="1000px"
                        closable={false} centered={true}
                        maskClosable={false}
                            footer={[
                                <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                            ]}
                    >
                            <Tabs defaultActiveKey='1' onChange={()=>this.tabChange}>
                                <TabPane tab={'仪器仪表数据'} key='1'>
                                    <Instrument type={1} instrumentData={instrumentData} url={this.props.url}/>
                                </TabPane>
                                <TabPane tab={'设备维修保养数据'} key='2'>
                                    <Device type={2} deviceData={deviceData} url={this.props.url}/>
                                </TabPane>
                                <TabPane tab={'化验数据'} key='3'>
                                    <Assay type={3} assayData={assayData} url={this.props.url}/>
                                </TabPane>
                            </Tabs>
                    </Modal>
                </Spin>
            </span>
        )
    }
}

export default Detail