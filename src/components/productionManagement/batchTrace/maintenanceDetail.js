import React from "react";
import axios from "axios";
import {Table, message, Spin, Divider,Modal,Steps} from "antd";
import CancleButton from "../../BlockQuote/cancleButton";
import "./batchTrace.css";

const {Step} = Steps;
class MaintenanceDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            headData:[],
            middleData:[],
            data:[],
            planDate: undefined,
            receiveDate: undefined,
            finishiDate: undefined,
        }
        this.getData=this.getData.bind(this);
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
        let {maintCode,receiveTime,maintPeople}=this.props.record,
        {deptName}=this.props
        axios({
            url:this.props.url.eqmaintenance.recordDetail,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                id:maintCode
            }
        }).then(data=>{
            let res=data.data.data
            if(res&&res.deviceMaintenanceRecordHead){
                let da=[]
               da.push( {
                    code: res.deviceMaintenanceRecordHead.code,
                    planCode: res.deviceMaintenanceRecordHead.planCode,
                    deviceCode: res.deviceMaintenanceRecordHead.deviceCode,
                    fixedassetsCode: res.deviceMaintenanceRecordHead.fixedassetsCode,
                    deviceName: res.deviceMaintenanceRecordHead.deviceName,
                    deptName:deptName,
                    planDate: res.deviceMaintenanceRecordHead.planDate,
                    receiveDate: receiveTime,
                    finishiDate: res.deviceMaintenanceRecordHead.finishiDate,
                    maintPeople: maintPeople
                })
                this.setState({
                    headData:da,
                    planDate: res.deviceMaintenanceRecordHead.planDate,
                    receiveDate: receiveTime,
                    finishiDate: res.deviceMaintenanceRecordHead.finishiDate,
                })
            }
            if(res&&res.deviceMaintenanceRecordDetails){
                this.setState({
                    middleData:res.deviceMaintenanceRecordDetails
                })
            }
            if(res&&res.deviceMaintenanceAccessory){
                this.setState({
                    data:res.deviceMaintenanceAccessory
                })
            }
        })
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
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal
                    title='设备保养详情'
                    visible={this.state.visible}
                    width="1000px"
                    closable={false} centered={true}
                    maskClosable={false}
                        footer={[
                            <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                        ]}
                >
                        <div className="interDrSpanModalTop">
                            <table>
                                <thead>
                                    <tr>
                                        <th >保养单号</th>
                                        <th >设备名称/编号</th>
                                        <th >所属部门</th>
                                        <th>本次计划执行日期</th>
                                        <th>接单时间</th>
                                        <th>保养完成日期</th>
                                        <th>保养人</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.headData?this.state.headData.map((item,index)=>{
                                            return(
                                                <tr key={item.code}>
                                                    <td>{item.code}</td>
                                                    <td>{item.deviceName}/{item.deviceCode}</td>
                                                    <td>{item.deptName}</td>
                                                    <td>{item.planDate}</td>
                                                    <td>{item.receiveDate}</td>
                                                    <td>{item.finishiDate}</td>
                                                    <td>{item.maintPeople}</td>
                                                </tr>
                                            )
                                        }):null
                                    }
                                </tbody>
                            </table>
                        </div>
                        <br /><br/>
                        <Steps progressDot current={3}>
                            <Step title="制定计划" description={`${'本次计划执行时间'} : ${this.state.planDate}`} />
                            <Step title="已接单" description={`${'接单时间'} : ${this.state.receiveDate}`} />
                            <Step title="已完成" description={`${'完成时间'} : ${this.state.finishiDate}`} />
                        </Steps>
                        <br/>
                        <div className="interDrSpanModalTop">
                            <table>
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>保养项目</th>
                                    <th>保养内容</th>
                                    <th>保养情况</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.middleData?this.state.middleData.map((item,index)=>{
                                            return(
                                                <tr key={item.code}>
                                                    <td>{index+1}</td>
                                                    <td>{item.maintenanceItems}</td>
                                                    <td>{item.maintenanceContent}</td>
                                                    <td>{item.mainContent}</td>
                                                </tr>
                                            )
                                        }):null
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="TBremarks">备注：</div>
                        <br /><br />
                        <strong>配件使用</strong>
                        <br /><br />
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

export default MaintenanceDetail