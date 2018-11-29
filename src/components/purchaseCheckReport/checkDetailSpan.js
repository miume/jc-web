import React from 'react';
import { Modal,Button,Popconfirm,Popover,Input } from 'antd';
import PurchaseModal from "./purchaseModal";

class CheckDetailSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            pvisivle: false,
        };
    }
    render() {
        const { visible } = this.state;
        return(
            <span type="primary"  onClick={this.showModal} size="small"   scroll={{ y: 400 }}  >
                <Modal
                    title="数据详情"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="1000px"
                    // footer下的每个组件都要有唯一的key
                    footer={[
                        <Button key="back"  style={{float:'left'}} onClick={this.handleCancel}>返回</Button>,
                        <Input key="input" style={{width:200}} disabled placeholder="XXX需要根据判断"/>
                        // 如何设置弹出
                    ]}
                >
                    <div style={{height:450}}>
                        <PurchaseModal
                            // data={data}
                            // topData={topData}
                        />

                    </div>
                </Modal>
                <a  href ="#" >详情</a>
            </span>
        )
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    handleCancel = (e) => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
    hide = () => {
        this.setState({
            pvisivle: false,
        });
    };
    handleVisibleChange = (pvisivle) => {
        this.setState({ pvisivle });
    };
}
export default CheckDetailSpan;