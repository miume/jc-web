import React from 'react';
import { Modal,Button } from 'antd';
import DrSpanModal from './drSpanModal';
import './interProduct.css';


const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        index:i,
        id: i,
        testItem: `测试`,
        testResult: '0.001',
        itemUnit: `g/mL`,
    });
}

class ReleaseSpan extends React.Component {
    url;
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            subVisible: false,
            process:-1,
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
    }
    render() {
        const { visible } = this.state;
        this.url = JSON.parse(localStorage.getItem('url'));
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
                        <Button style={{width:'80px',height:'35px',background:'#1890ff',color:'white'}} onClick={this.props.handleReleaseNew} ><i className="fa fa-paper-plane" style={{fontWeight:'bolder',color:'white'}}></i>&nbsp;发布</Button>
                    ]}
                >
                    <div style={{height:580}}>
                        <DrSpanModal
                            data={data}
                            record={this.props.record}
                            spanStatus={0}
                        />
                    </div>
                </Modal>
                <span className="blue interCursorPointer">发布</span>
            </span>
        )
    }
    // 处理发布
    handleRelease = () => {
        console.log('handleRelease')
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    };
}

export default ReleaseSpan;