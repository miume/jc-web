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
            width: '5%'
        },{
            title: '出库单号',
            key: 'stockOutRecordHeadCode',
            dataIndex: 'stockOutRecordHeadCode',
            width: '7%'
        },{
            title: '出库日期',
            key: 'date',
            dataIndex: 'date',
            width: '7%'
        },{
            title: '物料大类',
            key: 'typeName',
            dataIndex: 'typeName',
            width: '7%'
        },{
            title: '物料小类',
            key: 'subTypeName',
            dataIndex: 'subTypeName',
            width: '7%'
        },{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '7%'
        },{
            title: '供货单位',
            key: 'supplier',
            dataIndex: 'supplier',
            width: '7%'
        },{
            title: '领用单位',
            key: 'unit',
            dataIndex: 'unit',
            width: '7%'
        },{
            title: '批号',
            key: 'batch',
            dataIndex: 'batch',
            width: '7%'
        },{
            title: '使用产线',
            key: 'line',
            dataIndex: 'line',
            width: '7%'
        },{
            title: '出库类别',
            key: 'deliveryTypeName',
            dataIndex: 'deliveryTypeName',
            width: '7%'
        },{
            title: '出库点',
            key: 'deliveryPoint',
            dataIndex: 'deliveryPoint',
            width: '7%'
        },{
            title: '分组号',
            key: 'groupName',
            dataIndex: 'groupName',
            width: '7%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '6%'
        }, {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: '7%'
        }]
    }

    render() {
        let {visible} = this.state;
        return (
            <span>
                <span className={'blue'} onClick={this.handleClick}>详情</span>
                <Modal title={'详情'} visible={visible} closable={false} maskClosable={false} width={1100}
                        footer={[
                            <CancleButton key={'cancel'} flag={1} handleCancel={this.handleCancel}/>
                        ]}>
                    <Table columns={this.columns} pagination={false} scroll={{y:300}}
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
