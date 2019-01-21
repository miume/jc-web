import React from 'react';
import {Modal, Button, Input} from 'antd';
import PurchaseModal from './purchaseModal';




class ReleaseSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            pvisivle: false,
        };
    }
    render() {
        const { visible } = this.state;
        /**这是个令牌，每次调用接口都将其放在header里 */
        this.Authorization = localStorage.getItem('Authorization');
        /**这是服务器网址及端口 */
        this.server = localStorage.getItem('remote');
        return(
            <span type="primary" onClick={this.showModal} size="small"   scroll={{ y: 400 }}  >
                <Modal
                    title="编辑数据"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="1000px"
                    // footer下的每个组件都要有唯一的key
                    footer={[
                        <Button key="cancel" style={{float:'left'}} onClick={this.handleCancel}>返回</Button>,
                        <Input key="input" style={{width:400}} disabled placeholder="该数据审核已通过，请发布"/>,
                        <Button key="releaseNew" type="primary"  onClick={this.handleOk} style={{marginLeft:10}}>发布新材料</Button>,
                        <Button key="release" type="primary" style={{float:'right'}} onClick={this.handleOk}>发布</Button>
                    ]}
                >
                    <div style={{height:450}}>
                        <PurchaseModal
                            // data={data}
                            // topData={topData}
                        />

                    </div>
                </Modal>
                <span  style={{color:'#1890ff'}} >发布</span>
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
export default ReleaseSpan;