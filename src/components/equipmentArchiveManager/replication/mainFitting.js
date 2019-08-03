import React from 'react';
import {Button, Col, Input, message, Modal, Row,Table} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import FittingDetail from './fittingDetail'


class MainFitting extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            visible: false,
            dataSource: [],
            selectedRowKeys: [],
        }
        this.handleCancel = this.handleCancel.bind(this);

    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        width: '15%',
    }, {
        title: '固定资产编码',
        dataIndex: 'fixedassetsCode',
        key: 'fixedassetsCode',
        width: '20%',
    }, {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        width: '20%',
    }, {
        title: '规格型号',
        dataIndex: 'specification',
        key: 'specification',
        width: '20%',
    }, {
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        width: '20%',
        render:(text,record) => {
            return(
                <FittingDetail
                    mainFlag = {true}
                    url={this.props.url}
                    record={record}
                />
            )
        }
    }]
    render() {
        var selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <span>
                <span className="blue" onClick={this.handleMainFitting}>配件复制</span>
                <Modal
                    title="主设备配件复制"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="800px"
                    footer={[
                        <CancleButton
                            handleCancel={this.handleCancel}
                            flag={true}
                            key="back"
                        />
                    ]}
                >
                    <div style={{maxHeight:'450px'}}>
                        <Button type="primary" size='large' onClick={this.replication}>复制</Button>
                        <div style={{paddingBottom:'10px'}}></div>
                        <Table
                            columns={this.columns}
                            size="small"
                            bordered
                            scroll={{y: 360}}
                            pagination={false}
                            rowKey={record => record.code}
                            dataSource={this.state.dataSource}
                            rowSelection={rowSelection}
                        />
                    </div>
                </Modal>
            </span>
        );
    }
    /**实现全选*/
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys: selectedRowKeys
        });
    }
    replication= () => {
        const selectedRowKeys = this.state.selectedRowKeys
        console.log(selectedRowKeys)

    }
    handleMainFitting = () => {
        const dataSource = [{
            index:'1',
            fixedassetsCode:'111',
            specification:'222',
            deviceName:'aaaa',
            code:1
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        },{
            index:'2',
            fixedassetsCode:'222',
            specification:'3333',
            deviceName:'bbb',
            code:2
        }]
        this.setState({
            visible: true,
            dataSource: dataSource
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

}
export default MainFitting