import React from 'react';
import { Modal,Button,Input } from 'antd';
import PurchaseModal from "./purchaseModal";
import ReleaseNewButton from './releaseNew';
import ReleaseButton from './releaseButton';

class CheckReleaseSpan extends React.Component {
    Authorization;
    server;
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            pvisivle: false,
        };
        this.handleReleaseNew = this.handleReleaseNew.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
    }
    render() {
        const { visible } = this.state;
        /**这是个令牌，每次调用接口都将其放在header里 */
        this.Authorization = localStorage.getItem('Authorization');
        /**这是服务器网址及端口 */
        this.server = localStorage.getItem('remote');
        const footer = this.judgeFooter(this.props.state);
        // const footer = this.judgeFooter(2);
        return(
            <span type="primary"  onClick={this.showModal} size="small"   scroll={{ y: 400 }}  >
                <Modal
                    title="数据详情"
                    visible={visible}
                    width="1050px"
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    // footer下的每个组件都要有唯一的key
                    footer={footer}
                >
                    <div style={{height:500}}>
                        <PurchaseModal
                        />
                    </div>
                </Modal>
                <span  className="blue">{this.props.name}</span>
            </span>
        )
    }
    judgeFooter = (state) => {
        var footer = [];
        switch (state) {
            case 1: //审核中   --最好不用Input 用div
                footer.push(<Button className='white-button' style={{float:'left',backgroundColor:'white'}} key="back"  onClick={this.handleCancel}>返回</Button>);
                footer.push(<Input key="input" style={{width:300,color:'black',textAlign: 'center'}} disabled defaultValue="该数据审核中，审核通过后方可发布"/>);
                return footer;
            case 2: //已通过  未发布
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                    <Input key="input" style={{width:'300px',height:'35px',color:'black',textAlign: 'center',cursor:'default'}} disabled defaultValue="该数据审核通过，请发布"/>,
                    <ReleaseNewButton  key="releaseNew" handleReleaseNew={this.handleReleaseNew}/>,
                    <ReleaseButton key="releaseNew" handleRelease={this.handleRelease}/>
                ];
                return footer;
            case 3: //不通过
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                    <Input key="input" style={{width:'300px',height:'35px',color:'black',textAlign: 'center',cursor:'default',right:'6px'}} disabled defaultValue="该数据审核不通过，请改正后再次申请审核"/>,
                ];
                return footer;
            case 0: //待审核
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                    <Input key="input" style={{width:'300px',height:'35px',color:'black',textAlign: 'center',cursor:'default',right:'6px'}} disabled defaultValue="该数据待审核，审核通过后方可发布"/>,
                ];
                return footer;
            default:
                footer = [
                    <Button className='white-button' style={{float:'left',backgroundColor:'white',width:'80px',height:'35px'}} key="back"  onClick={this.handleCancel}>返回</Button>,
                ];
                return footer;
        }
    };
    handleClick = () => {
        console.log('handleClick')
    }
    //  处理发布新材料
    handleReleaseNew = () => {
        console.log('releaseNew')
    };
    // 处理发布
    handleRelease = () => {
        console.log('handleRelease')
    };
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
export default CheckReleaseSpan;