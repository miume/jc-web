import React from 'react';
import {Modal, Table} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        },{
            title: '出库单号',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '15%'
        },{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '15%'
        },{
            title: '批号',
            key: 'batch',
            dataIndex: 'batch',
            width: '50%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '10%'
        }, {
            title: '操作',
            key: 'id',
            dataIndex: 'id',
            width: '15%'
        }]
    }

    render() {
        let {visible} = this.state;
        return (
            <span>
                <span className={'blue'} onClick={this.handleClick}>详情</span>
                <Modal title={'详情'} visible={visible} maskClosable={false}
                        footer={[
                            <CancleButton flag={1} handleCancel={this.handleCancel}/>
                        ]}>
                    <Table columns={this.columns} pagination={false}
                           bordered size={'small'} rowKey={record => record.id}/>
                </Modal>
            </span>
        )
    }

    handleClick() {
        this.setState({
            visible: true
        })
    }

    handleCancel() {
        this.setState({
            visible: false
        })
    }
}

export default Detail;
