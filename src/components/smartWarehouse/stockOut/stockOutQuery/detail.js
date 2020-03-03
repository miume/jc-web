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
            width: '10%'
        },{
            title: '出库时间',
            key: 'date',
            dataIndex: 'date',
            width: '15%'
        },{
            title: '物料大类',
            key: 'typeName',
            dataIndex: 'typeName',
            width: '10%'
        },{
            title: '物料小类',
            key: 'subTypeName',
            dataIndex: 'subTypeName',
            width: '10%'
        },{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '10%'
        },{
            title: '供货单位',
            key: 'supplier',
            dataIndex: 'supplier',
            width: '15%'
        },{
            title: '分组号',
            key: 'groupName',
            dataIndex: 'groupName',
            width: '10%'
        },{
            title: '重量',
            key: 'weight',
            dataIndex: 'weight',
            width: '10%'
        }, {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: '10%'
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
                           bordered size={'small'} rowKey={record => record.id}/>
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
        axios.get(`${url[type]}/detail?id=${id}`).then(data => {
            let res = data.data.data;
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
