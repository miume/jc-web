import React from 'react';
import {Modal, Table} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";

class Detail extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        const {periodName, lineName, start, end} = this.props.data;
        return (
            <span>
                <span className='blue' onClick={this.handleClick}>详情</span>
                <Modal visible={this.state.visible} title={'详情'} maskClosable={false}
                       width={'900px'} centered={true} closable={false}
                       footer={[<CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>]}
                >
                    <div className={'raw-material-detail'}>
                        <div className={'raw-material-detail-head'}>
                            <div>{`周期：` + periodName}</div>
                            <div>{`期数：` + lineName}</div>
                            <div>{`开始时间：` + start}</div>
                            <div>{`结束时间：` + end}</div>
                        </div>
                        <Table rowKey={record => record.code} dataSource={[this.props.data]} columns={this.props.columns}
                               size={"small"} bordered pagination={false}/>
                    </div>
                </Modal>
            </span>
        )
    }

    /**点击详情按钮*/
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

export default Detail;
