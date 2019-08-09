import React from 'react';
import {Modal, Popover, Steps, Table} from 'antd';
import axios from "axios"
import CancleButton from "../../BlockQuote/cancleButton";
import "../equipmentArchiveManager.css"
import WhiteSpace from "../../BlockQuote/whiteSpace";
const bcolums=[{
    title:'序号',
    key:'index',
    dataIndex:'index',
    sorter: (a, b) => a.index - b.index,
    align:'center',
    width:50
},{
    title:'配件名称',
    dataIndex:'name',
    key:'name',
    align:'center',
    width:160
},{
    title:'配件规格',
    dataIndex:'specification',
    key:'specification',
    align:'center',
    width:160
},{
    title:'配件数量',
    dataIndex:'counts',
    key:'counts',
    align:'center',
    width:160
}]

class RepairDetail extends React.Component{
    url= JSON.parse(localStorage.getItem('url'));
    constructor(props){
        super(props);
        this.state={
            visible : false,
            data : {},
            tableData:[],
        }
        this.handleDetail = this.handleDetail.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    handleDetail(){
        axios({
            url:this.url.deviceRepair.getRepairDetail,
            method:"get",
            header:{
                'Authorization': this.url.Authorization
            },
            params:{
                id:this.props.record.code,
            }
        }).then((data)=>{
            const result=data.data.data;
            var data1=result.deviceRepairApplication;
            data1["reportPeople"]=result.reportPeople;
            data1["receivePeople"]=result.receivePeople;
            var table=result.deviceRepairAccessory;
            for(var i=0;i<result.deviceRepairAccessory.length;i++)
            {
                table[i]["index"]=i+1;
            }
            this.setState({
                data:data1,
                tableData:table,
            })
            console.log(result);
        })
        this.setState({
            visible:true,
        });
    }
    handleCancel() {
        this.setState({
        visible:false
        });
    }
    render(){
        return(
            <span>
                <span onClick={this.handleDetail} className="blue">详情</span>
                <Modal title="设备维修详情" visible={this.state.visible}
                    width="600px"
                    closable={false} centered={true}
                    maskClosable={false}
                    footer={[
                        <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />
                    ]}>
                    <div>
                        <div>
                            <span>
                                <span className={"firstLine"}>维修单号:&nbsp;</span><span className={"firstContent"}>{this.state.data.code}</span>
                                <span className={"secondLine"}>所属部门:&nbsp;</span><span className={"secondContent"}>{this.props.deptName}</span>
                            </span><br/>
                            <span>
                                <span className={"firstLine"}>设备名称:&nbsp;</span><span className={"firstContent"}>{this.state.data.deviceName}</span>
                                <span className={"secondLine"}>固定资产编号:&nbsp; </span><span className={"secondContent"}>{this.state.data.fixedassetsCode}</span>
                            </span><br/>
                            <span>
                                <span className={"firstLine"}>报修时间:&nbsp;</span><span className={"firstContent"}>{this.state.data.reportTime}</span>
                                <span className={"secondLine"}>报修人:&nbsp;</span><span className={"secondContent"}>{this.state.data.reportPeople}</span>
                            </span><br/>
                            <span className={"firstLine"}>故障描述:&nbsp;</span><span >{this.state.data.faultContent}</span><br/>
                            <span className={"firstLine"}>故障处理及原因:&nbsp;</span><span >{this.state.data.faultReason}</span>
                        </div>
                        <hr/>
                        <span>
                            <span className={"firstLine"}>接单时间:&nbsp;</span><span className={"firstContent"}>{this.state.data.receiveTime}</span>
                            <span className={"secondLine"}>接单人:&nbsp;</span><span className={"secondContent"}>{this.state.data.receivePeople}</span>
                        </span >
                        <br/>
                        <span >
                            <span className={"firstLine"}>联系电话:&nbsp;</span><span className={"firstContent"}>{this.state.data.receivePhone}</span>
                            <span className={"secondLine"}>完成时间:&nbsp;</span><span className={"secondContent"}>{this.state.data.finishTime}</span>
                        </span>
                        <hr/>
                        <br/>
                        <b className={"peiTitle"}>配件使用</b>
                        <Table
                            className={"repairDetailModalTable"}
                            bordered={true}
                            size={"small"}
                            columns={bcolums}
                            dataSource={this.state.tableData}
                        />
                    </div>
                </Modal>
            </span>
        )
    }
}

export default RepairDetail