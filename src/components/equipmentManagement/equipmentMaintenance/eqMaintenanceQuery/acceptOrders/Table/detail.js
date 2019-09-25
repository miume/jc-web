import React from 'react';
import axios from 'axios';
import {Modal, Button, message, Popover, Steps} from 'antd';
import InnerTable from "./innerTable";
import BelowTable from "./belowTable"
import CancleButton from "../../../../../BlockQuote/cancleButton";
import WhiteSpace from "../../../../../BlockQuote/whiteSpace";
import '../acceptOrders.css'

//用于编写弹出框的按钮应用
const Step = Steps.Step

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state={
           visible:false,
            newRowData:[],
        }
        this.handleDetail = this.handleDetail.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    render() {
        const customDot = (dot,{status,index})=>(
            <Popover visible={this.state.visible1}>
                {dot}
            </Popover>
        )
        return (
            <div >
                <span className="blue" onClick={this.handleDetail}>详情</span>
                <Modal
                    title="保养工单详情"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="1000px"
                    footer={[
                        <CancleButton key='cancle' flag={1} handleCancel={this.handleCancel} />
                    ]}
                >
                    <div className="ant-table-thead">
                    <InnerTable
                        code={this.props.record.code}
                        deviceName={this.props.record.deviceName}
                        deptCode={this.props.record.deptCode}
                        planDate={this.props.record.planDate}
                        receiveDate={this.props.record.receiveDate}
                        maintPeople={this.props.record.maintPeople}
                    />
                    <WhiteSpace />
                    <Steps current={1} progressDot={customDot}>
                        <Step title="制定计划" description={this.props.planDate} />
                        <Step title="已接单" description={this.props.receiveDate} />
                        <Step title="待完成" description="" />
                    </Steps>
                        <WhiteSpace />
                        <BelowTable
                            newRowData={this.state.newRowData}
                        />
                    </div>
                </Modal>

            </div>
        );
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    handleDetail = () => {
        axios({
            url: `${this.props.url.eqMaintenanceQuery.recordDetail}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params:{
                id: this.props.record.code
            }
        }).then((data) => {

            const res = data.data.data.deviceMaintenanceRecordDetails ? data.data.data.deviceMaintenanceRecordDetails : [];
            console.log(res)
            if (res) {
                const arrMes = res;
                var newRowData = arrMes
                this.setState({
                    visible: true,
                    newRowData: newRowData,
                })
            } else {

            }
        }).catch(() => {
            message.info('数据存在异常，请联系管理员！')
        });
    }
}

export default Details
