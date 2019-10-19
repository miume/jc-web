import React from 'react';
import {Modal, Button,Tabs} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import LineStatistics from './lineStatistics';

const {TabPane} = Tabs;

class StatisticalAnalysis extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        return (
            <span className={this.props.flag? '' : 'hide'}>
                <Button onClick={this.handleClick} type='ant-btn ant-btn-primary'>统计分析</Button>
                <Modal visible={this.state.visible} centered={true} closable={false}
                       title={'原料领用统计分析'} maskClosable={false} width={1000}
                       footer={[<CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>]}>
                    <Tabs defaultActiveKey={'1'}>
                        <TabPane tab={'按产线统计'} key={'1'}>
                            <LineStatistics />
                        </TabPane>
                        <TabPane tab={'周期对比曲线'} key={'2'}>1</TabPane>
                        <TabPane tab={'产线对比曲线'} key={'3'}>1</TabPane>
                    </Tabs>
                </Modal>
            </span>
        )
    }

    /**点击统计分析按钮*/
    handleClick() {
        this.setState({
            visible: true
        })
    }

    /**点击取消按钮*/
    handleCancel() {
        this.setState({
            visible: false
        })
    }
}

export default StatisticalAnalysis;
