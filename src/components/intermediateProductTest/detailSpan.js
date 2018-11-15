import React from 'react';
import { Modal,Button,Popconfirm,Popover } from 'antd';
import DetailModal from './detailModal';

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

class DetailSpan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
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
    render() {
        // return (
        //     <span type="primary" onClick={this.showModal} size="small"   scroll={{ y: 400 } } >
        //         <Modal
        //             title="Modal"
        //             visible={this.state.visible}
        //             onOk={this.hideModal}
        //             onCancel={this.hideModal}
        //             okText="确认"
        //             cancelText="取消"
        //         >
        //             <p>Bla bla ...</p>
        //             <p>Bla bla ...</p>
        //             <p>Bla bla ...</p>
        //         </Modal>
        //         <a href="#">详情</a>
        //     </span>
        // )
        const { visible } = this.state;
        return (
            <span type="primary" onClick={this.showModal} size="small"   scroll={{ y: 400 }}  >
                <Modal
                    title="数据详情"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="650px"
                    footer={[
                        <Button style={{float:'left'}} onClick={this.handleCancel}>返回</Button>,
                        <Button key="publish" type="primary"  onClick={this.handleOk}>发布</Button>
                    ]}
                >
                    <div style={{height:450}}>
                        <DetailModal
                            data={data}
                            topData={topData}
                            record={this.props.record}
                        />
                    </div>
                </Modal>
                <a  href ="#" disabled={this.props.disabled}>详情</a>
            </span>
        )
    }

}

export default DetailSpan;