import React from "react";
import axios from "axios";
import {Table, message, Spin, Divider,Modal} from "antd";
import CancleButton from "../../BlockQuote/cancleButton";

class ServiceDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            repairCode: undefined,
            deviceCode: undefined,
            deviceName: undefined,
            fixedassetsCode: undefined,
            faultContent: undefined,
            reportTime: undefined,
            reportPeople: undefined,
            reportPhone: undefined,
            receiveTime: undefined,
            receivePeople: undefined,
            receivePhone: undefined,
            faultReason: undefined,
            finishTime: undefined,
            evaluationTime: undefined,
            evaluationResult: undefined,
            repairStatus: undefined,
            emergeStatus: undefined,
            data:[]
        }
        this.getData=this.getData.bind(this);
        this.transformRepairStatus=this.transformRepairStatus.bind(this);
    }
    componentDidMount(){
        this.getData()
    }
    componentWillUnmount(){
       this.setState=()=>{
           return
       }
    }
    getData(){
        let {repairCode}=this.props.record
        axios({
            url:this.props.url.equipmentRepair.deviceRepairApplication,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                id:repairCode
            }
        }).then(data=>{
            let res=data.data.data
            if(res &&res.deviceRepairApplication){
                this.setState({
                    repairCode: res.deviceRepairApplication.code,
                    deviceCode: res.deviceRepairApplication.deviceCode,
                    deviceName: res.deviceRepairApplication.deviceName,
                    fixedassetsCode: res.deviceRepairApplication.fixedassetsCode,
                    faultContent: res.deviceRepairApplication.faultContent,
                    reportTime: res.deviceRepairApplication.reportTime,
                    reportPeople: res.reportPeople,
                    reportPhone: res.deviceRepairApplication.receivePhone,
                    receiveTime: res.deviceRepairApplication.receiveTime,
                    receivePeople: res.receivePeople,
                    receivePhone: res.deviceRepairApplication.receivePhone,
                    faultReason: res.deviceRepairApplication.faultReason,
                    finishTime: res.deviceRepairApplication.finishTime,
                    evaluationTime: res.deviceRepairApplication.evaluationTime,
                    evaluationResult: res.deviceRepairApplication.evaluationResult,
                    repairStatus:  this.transformRepairStatus(res.deviceRepairApplication.repairStatus),
                    emergeStatus: res.deviceRepairApplication.emergeStatus===1?'紧急':'一般'
                })
            }
            if(res&&res.deviceRepairAccessory){
                this.setState({
                    data:res.deviceRepairAccessory
                })
            }
            // let dataPei=[{code:10,name:'配件1',specification:"KKKK",counts:2,repairCode:17,units:0}]
        })
    }
    transformRepairStatus(status){
        if(status===0){
            return '未报修' 
        }
        else if(status===1){
            return '已报修,未接单' 
        }
        else if(status===2){
            return '已接单,未完成' 
        }
        else if(status===3){
            return '已完成,未评价' 
        }
        else{
            return '已评价' 
        }
    }
    handleDetail = () =>{
        this.setState({
            visible:true
        })
    }
    handleCancel = () =>{
        this.setState({
            visible:false
        })
    }
    render(){
        let {
            repairCode,deviceCode,deviceName,fixedassetsCode,faultContent,reportTime,reportPeople,
            reportPhone,receiveTime,receivePeople,receivePhone,faultReason,finishTime,evaluationTime,
            evaluationResult,repairStatus,emergeStatus}=this.state
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal
                    title='设备维修详情'
                    visible={this.state.visible}
                    width="500px"
                    closable={false} centered={true}
                    maskClosable={false}
                        footer={[
                            <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                        ]}
                >
                        <div>
                            <span>维修单号：{repairCode}</span>
                            <span style={{float:"right",display:"inlineBlock"}}>所属部门：{this.props.deptName}</span>
                        </div>
                        <br />
                        <div>
                            <span>设备名称：{deviceName}</span>
                            <span style={{float:"right",display:"inlineBlock"}}>固定资产编号：{fixedassetsCode}</span>
                        </div>
                        <br />
                        <div>
                            <span>报修时间：{reportTime}</span>
                            <span style={{float:"right",display:"inlineBlock"}}>报修人：{reportPeople}</span>
                        </div>
                        <br />
                        <div><span>紧急程度：{emergeStatus}</span></div>
                        <br />
                        <div><span>故障描述：{faultContent}</span></div>
                        <br />
                        <div><span>故障处理及原因：{faultReason}</span></div>
                        <Divider />
                        <div>
                            <span>接单时间：{receiveTime}</span>
                            <span style={{float:"right",display:"inlineBlock"}}>接单人：{receivePeople}</span>
                        </div>
                        <br />
                        <div>
                            <span>联系电话：{receivePhone}</span>
                            <span style={{float:"right",display:"inlineBlock"}}>完成时间：{finishTime}</span>
                        </div>
                        <Divider />
                        <strong>配件使用</strong>
                        <br />
                        <div className="interDrSpanModalTop">
                            <table>
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>配件名称</th>
                                    <th>配件规格</th>
                                    <th>配件数量</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.data?this.state.data.map((item,index)=>{
                                        return(
                                            <tr key={item.code}>
                                                 <td>{index+1}</td>
                                                 <td>{item.name}</td>
                                                 <td>{item.specification}</td>
                                                 <td>{item.counts}</td>
                                            </tr>
                                        )
                                    }):null
                                }
                                </tbody>
                            </table>
                        </div>
                </Modal>
            </span>
        )
    }
}

export default ServiceDetail