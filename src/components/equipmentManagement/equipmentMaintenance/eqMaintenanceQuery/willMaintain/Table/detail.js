import React from 'react';
import axios from 'axios';
import {message, Modal, Popover, Steps} from 'antd';
import InnerTable from "./innerTable";
import BelowTable from "./belowTable"
import CancleButton from "../../../../../BlockQuote/cancleButton";
import WhiteSpace from "../../../../../BlockQuote/whiteSpace";

//用于编写弹出框的按钮应用
const Step = Steps.Step

class Details extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state={
            visible:false,
            newRowData:[],
        }
        this.handleDetail = this.handleDetail.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    render = (text, record) => {
        const customDot = (dot)=>(
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
                    <div>
                        <InnerTable
                            record={this.props.record}
                        />
                        <WhiteSpace />
                        <Steps current={0} progressDot={customDot}>
                            <Step title="制定计划" description={this.props.record.planDate} />
                            <Step title="已接单" description="" />
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
                const res = data.data.data ? data.data.data : [];
                if (res) {
                    const arrMes = res.deviceMaintenanceRecordDetails;
                    var newRowData = arrMes;
                    for(let i = 0; i < newRowData.length; i++) {
                        newRowData[i]['index'] = i + 1;
                    }
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
