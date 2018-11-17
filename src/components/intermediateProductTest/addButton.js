import React from 'react';
import {Button, Modal, Form, Input, message, Popconfirm, Popover} from 'antd';
import AddModal from './addModal';
import axios from 'axios';

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        id: i,
        a: `a`,
        b: '',
        c: ``,
    });
}
const topData = [{
    id: 'EcT/139',
    a: '镍矿石',
    b: '2018年11月11日',
}];
class AddButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            visible: false,
            pvisivle: false,
        };
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
    render() {
        const { visible } = this.state;
        return (
            <span>
                <Button type="primary" size="small" style={{marginRight:'15px'}} onClick={this.showModal}>
                    <Modal
                        title="新增数据"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                        width="650px"
                        footer={[
                            <Popconfirm placement="right" title={'你确定是想取消这个任务吗？'} onConfirm={this.handleOk} okText="确定" cancelText="再想想">
                                <Button style={{float:'left'}}>取消</Button>
                            </Popconfirm>,
                            <Button key="keep"  onClick={this.handleOk}>保存</Button>,
                            // 如何设置弹出
                            <Popover
                                content={<a onClick={this.hide}>Close</a>}
                                title="Title"
                                trigger="click"
                                visible={this.state.pvisivle}
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <Button key="submit" type="primary" >提交</Button>
                            </Popover>
                        ]}
                    >
                    <div style={{height:450}}>
                        <AddModal
                            data={data}
                            topData={topData}
                            record={this.props.record}
                        />
                    </div>
                    </Modal>
                    新增
                </Button>
            </span>
        )
    }
}

export default AddButton;