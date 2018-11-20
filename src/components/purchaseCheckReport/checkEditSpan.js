import React from 'react';
import { Modal,Button,Popconfirm,Popover,Select,Switch } from 'antd';
import PurchaseModal from './purchaseModal';




class CheckEditSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            pvisivle: false,
        };
    }
    render() {
        const { visible } = this.state;
        const Option = Select.Option;
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
                        <Popconfirm  key="popcon" placement="right" title={'你确定是想取消这个任务吗？'} onConfirm={this.handleOk} okText="确定" cancelText="再想想">
                            <Button key="cancel" style={{float:'left'}}>取消</Button>
                        </Popconfirm>,
                        <Button key="save"  onClick={this.handleOk}>保存</Button>,
                        // 如何设置弹出
                        <Popover
                            key="popover"
                            // content={<a onClick={this.hide}>Close</a>}
                            content = {
                                <div style={{width:200}}>
                                    <div>
                                        <Select defaultValue="a" style={{ width: 120 }}>
                                            <Option value="a">a</Option>
                                            <Option value="b">b</Option>
                                            <Option value="c">c</Option>
                                        </Select>
                                    </div>
                                    <div style={{paddingTop:10}}>
                                        <span style={{marginRight:10}}>是否紧急</span><Switch onChange={this.urgentChange}/>
                                    </div>
                                    <div style={{paddingTop:10}}>
                                        <Button>取消</Button>
                                        <Button>确认</Button>
                                    </div>


                                </div>
                            }
                            title="设置审批细节"
                            trigger="click"
                            visible={this.state.pvisivle}
                            onVisibleChange={this.handleVisibleChange}
                            placement="topRight"
                        >
                            <Button key="submit" type="primary" >提交</Button>
                        </Popover>
                    ]}
                >
                    <div style={{height:450}}>
                        <PurchaseModal
                            // data={data}
                            // topData={topData}
                        />

                    </div>
                </Modal>
                <a  href ="#" disabled={this.props.disabled}>编辑</a>
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
    // 提交Modal中是否紧急
    urgentChange(checked) {
        console.log(`switch to ${checked}`);
    }
}

export default CheckEditSpan;