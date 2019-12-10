import React from "react";
import axios from "axios";
import {Table, message, Spin, Divider, Modal} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import ServiceDetail from "./serviceDetail"

class DeviceService extends React.Component{
    url
    constructor(props){
        super(props);
        this.state={
            data : [],
            visible:false,
            deviceName: undefined,
            fixedassetsCode: undefined,
            deptName: undefined,
        }
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '5%',
        },{
            title: '维修单号',
            dataIndex: 'repairCode',
            key: 'repairCode',
            width: '10%',
        },{
            title: '紧急程度',
            dataIndex: 'emergeStatus',
            key: 'emergeStatus',
            width: '8%',
            render:(text,record)=>{
                if(record.emergeStatus===0){
                    return '一般'
                }
                else{
                    return '紧急'
                }
            }
        },{
            title: '申请时间',
            dataIndex: 'reportTime',
            key: '.reportTime',
            width: '18%',
        },{
            title: '申请人',
            dataIndex: 'reportPeople',
            key: 'reportPeople',
            width: '8%',
        },{
            title: '接单时间',
            dataIndex: 'receiveTime',
            key: 'receiveTime',
            width: '18%',
        },{
            title: '接单人',
            dataIndex: 'receivePeople',
            key: 'receivePeople',
            width: '8%',
        },{
            title: '完成时间',
            dataIndex: 'finishTime',
            key: 'finishTime',
            width: '18%',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: '5%',
            render:(text,record)=>{
                return(
                    <span>
                        <ServiceDetail url={this.props.url} record={record} deptName={this.state.deptName}/>
                    </span>
                )
            }
        }]
        this.getTableData=this.getTableData.bind(this);
    }
    componentDidMount(){
        this.getTableData()
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getTableData(){
        let{deviceCode,startTime,endTime}=this.props.record
        axios({
            url:this.props.url.equipmentRepair.byConditions,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                deviceId:deviceCode,
                startTime:startTime,
                endTime:endTime
            }
        }).then(data=>{
            let res=data.data.data
            if(res&&res.dtoList){
                for(let i=0;i<res.dtoList.length;i++){
                    res.dtoList[i]['index']=i+1
                }
                this.setState({
                    data:res.dtoList,
                    deviceName: res.deviceName,
                    fixedassetsCode: res.fixedassetsCode,
                    deptName: res.deptName,
                })
            }
        })
    }
    handleDetail = () =>{
        this.setState({
            visible:true
        })
    }
    handleCancel=()=>{
        this.setState({
            visible: false
        });
    }
    render(){
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">维修</span>
                <Modal
                    title='设备维修信息'
                    visible={this.state.visible}
                    width="1000px"
                    closable={false} centered={true}
                    maskClosable={false}
                        footer={[
                            <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />,
                        ]}
                >
                    <div>设备名称 ：{this.state.deviceName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        固定资产编码：{this.state.fixedassetsCode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        所属部门：{this.state.deptName}
                    </div><br/>
                    <Table pagination={false} size="small" bordered  dataSource={this.state.data} columns={this.column} rowKey={record=>record.index}/>
                </Modal>
            </span>
        )
    }
}

export default DeviceService