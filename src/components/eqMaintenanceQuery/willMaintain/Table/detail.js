import React from 'react';
import axios from 'axios';
import {Modal, Button, message, Popover, Steps} from 'antd';
import InnerTable from "./innerTable";
import BelowTable from "./belowTable"
import CancleButton from "../../../BlockQuote/cancleButton";
import WhiteSpace from "../../../BlockQuote/whiteSpace";

//用于编写弹出框的按钮应用
const Step = Steps.Step

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            visible:false,
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
                    <div>
                        <InnerTable/>
                        <WhiteSpace />
                        <Steps current={0} progressDot={customDot}>
                            <Step title="制定计划" description="2012-01-01" />
                            <Step title="已接单" description="" />
                            <Step title="待完成" description="" />
                        </Steps>
                        <WhiteSpace />
                        <BelowTable/>
                    </div>
                </Modal>

            </div>
        );
    }

    handleDetail = () => {
        this.setState({
            visible:true
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }

}

export default Details