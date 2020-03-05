import React from 'react';
import {Modal, Table} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from 'axios';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '5%'
        },{
            title: '出库时间',
            key: 'head.createdTime',
            dataIndex: 'head.createdTime',
            width: '18%'
        },{
            title: '物料大类',
            key: 'type.typeName',
            dataIndex: 'type.typeName',
            width: '12%'
        },{
            title: '物料小类',
            key: 'subType.subTypeName',
            dataIndex: 'subType.subTypeName',
            width: '12%'
        },{
            title: '物料名称',
            key: 'head.materialName',
            dataIndex: 'head.materialName',
            width: '15%'
        },{
            title: '供货单位',
            key: 'supplier.materialSupplierName',
            dataIndex: 'supplier.materialSupplierName',
            width: '20%'
        },{
            title: '分组号',
            key: 'head.groupName',
            dataIndex: 'head.groupName',
            width: '6%'
        },{
            title: '重量',
            key: 'head.weight',
            dataIndex: 'head.weight',
            width: '5%'
        }, {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: '7%'
        }]
    }

    render() {
        let {visible,data} = this.state;
        return (
            <span>
                <span className={'blue'} onClick={this.handleClick}>详情</span>
                <Modal title={'详情'} visible={visible} closable={false} maskClosable={false} width={1100}
                        footer={[
                            <CancleButton key={'cancel'} flag={1} handleCancel={this.handleCancel}/>
                        ]}>
                    <Table columns={this.columns} pagination={false} scroll={{y:300}} dataSource={data}
                           bordered size={'small'} rowKey={record => record.head.id}/>
                </Modal>
            </span>
        )
    }

    handleClick() {
        this.setState({
            visible: true
        });
        let {url,id,type} = this.props;
        this.getDetailData(url,id,type)
    }

    getDetailData(url,id,type) {
        let realURL = type === 'outStock' ? `${url[type]}/detail?headId=${id}`: `${url[type]}/detail?id=${id}`
        axios.get(realURL).then(data => {
            let res = data.data.data;
            for(let i = 0; i < res.length; i++) {
                res[i]['index'] = i + 1;
            }
            this.setState({
                data: res
            })
        })
    }

    handleCancel() {
        this.setState({
            visible: false
        })
    }
}

export default Detail;
