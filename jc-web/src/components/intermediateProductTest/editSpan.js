import React from 'react';
import AePopModal from './aePopModal';
import { Modal,Button,Popconfirm,Popover } from 'antd';

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        id: i,
        a: `b`,
        b: 'a',
        c: `c`,
    });
}
const topData = [{
    id: 'EcT/139',
    a: '镍矿石',
    b: '2018年11月11日',
}];
class EditSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
    // confirm = () => {
    //     message.info('Clicked on Yes.');
    // };
    render() {
        const { visible } = this.state;
        return (
            <span type="primary" onClick={this.showModal} size="small"   scroll={{ y: 400 }}  >
                <Modal
                    title="编辑数据"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="650px"
                    // footer下的每个组件都要有唯一的key
                    footer={[
                        <Popconfirm  key="popcon" placement="right" title={'你确定是想取消这个任务吗？'} onConfirm={this.handleOk} okText="确定" cancelText="再想想">
                            <Button key="cancel" style={{float:'left'}}>取消</Button>
                        </Popconfirm>,
                        <Button key="save"  onClick={this.handleOk}>保存</Button>,
                        // 如何设置弹出
                        <Popover
                            key="popover"
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
                        <AePopModal
                            data={data}
                            topData={topData}
                        />
                    </div>
                </Modal>
                <a  href ="#" disabled={this.props.disabled}>编辑</a>
            </span>
        )
    }


}

export default EditSpan;