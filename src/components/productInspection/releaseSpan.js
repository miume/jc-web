import React from 'react';
import { Modal,Button } from 'antd';
import DrSpanModal from './drSpanModal';
import Submit from '../BlockQuote/submit';
import './productInspection.css';


const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        a: '0.002',
        itemUnit: `g/mL`,
    });
}

class ReleaseSpan extends React.Component {
    Authorization;
    server;
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
        };
        this.subHide = this.subHide.bind(this);
        this.subOk = this.subOk.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }
    render() {
        const { visible } = this.state;
        /**这是个令牌，每次调用接口都将其放在header里 */
        this.Authorization = localStorage.getItem('Authorization');
        /**这是服务器网址及端口 */
        this.server = localStorage.getItem('remote');
        return (
            <span type="primary" onClick={this.showModal} size="small"    >
                <Modal
                    title="数据发布"
                    visible={visible}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    width="500px"
                    footer={[
                        <Button key="back" style={{right:'330px'}}  onClick={this.handleCancel}>返回</Button>,
                        <Button style={{width:'80px',height:'35px',background:'#0079FE',color:'white'}} onClick={this.props.handleReleaseNew} ><i className="fa fa-paper-plane" style={{fontWeight:'bolder',color:'white'}}></i>&nbsp;发布</Button>
                    ]}
                >
                    <div style={{height:640}}>
                        <DrSpanModal
                            checkStatus={'4'}
                            data={data}
                            record={this.props.record}
                        />
                    </div>
                </Modal>
                <span className="productBlueSpan"><i className="fa fa-bullhorn" aria-hidden="true"></i>&nbsp;发布</span>
            </span>
        )
    }
    subHide = () => {
        this.setState({
            subVisible: false,
        });

    };
    subOk = () => {
        console.log('ok');
    };
    handleVisibleChange = (subVisible) => {
        this.setState({ subVisible });
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
    /**监听送审select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
}

export default ReleaseSpan;