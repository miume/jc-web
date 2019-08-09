import React from 'react';
import {Modal,message} from 'antd';
import axios from "axios"
import CancleButton from "../../BlockQuote/cancleButton";
import RepairModal from "../modal/repairModal";

class Repair extends React.Component {
    url= JSON.parse(localStorage.getItem('url'));
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            page:'1',
            size:'10',
            TableData:[],
        };
        this.handleRepair = this.handleRepair.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleRepair}>维修</span>
                <Modal
                    title="数据详情"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="85%"
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag={true}
                            key="back"
                        />
                    ]}
                >
                    <RepairModal
                        deptName={this.props.deptName}
                        data={this.state.TableData}
                    />
                </Modal>
            </span>
        )

    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleRepair = () => {
        this.setState({visible:true})
        const params={
            deptCode:this.props.record.depCode,
            deviceId:this.props.record.code,
            page:this.state.page,
            size:this.state.size,
        }
        axios({
            url:this.url.deviceRepair.getRepairTable,
            method:"get",
            header:{
                'Authorization': this.url.Authorization
            },
            params:params,
        }).then((data1)=>{
            if(data1.data.code===0){
                const result=data1.data.data.list?data1.data.data.list:[];
                if(result){
                    // console.log(result)
                    var data=result;
                    for(var i=0;i<result.length;i++){
                        data[i]["index"]=i+1;
                        data[i]["code"]=data[i].deviceRepairApplication.code;
                        data[i]["deviceName"]=data[i].deviceRepairApplication.deviceName;
                        data[i]["fixedassetsCode"]=data[i].deviceRepairApplication.fixedassetsCode;
                        data[i]["faultContent"]=data[i].deviceRepairApplication.faultContent;
                        data[i]["reportTime"]=data[i].deviceRepairApplication.reportTime;
                        data[i]["receiveTime"]=data[i].deviceRepairApplication.receiveTime;
                        data[i]["finishTime"]=data[i].deviceRepairApplication.finishTime;
                        data[i]["emergeStatus"]=data[i].deviceRepairApplication.emergeStatus;
                    }
                    this.setState({TableData:data},()=>{
                        message.info(data1.data.message)
                    })
                    console.log(data)
                }else{
                    message.info("没有数据，请联系管理员")
                }
            } else{
                message.info(data1.data.message)
            }
        })
        // TODO 获取数据
    }
}

export default Repair