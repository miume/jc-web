import React from 'react';
import {message, Modal, Button, Table,Switch} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import '../equipmentArchiveManager.css'
import FittingDetail from "./fittingDetail";
import NewButton from "../../BlockQuote/newButton";


class ComponentRep extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            dataSource: [],
            selectedRowKeys: [],
        }

    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        sorter: (a, b) => a.index - b.index,
        align: 'center',
        width: '15%',
    }, {
        title: '固定资产编码',
        dataIndex: 'fixedassetsCode',
        key: 'fixedassetsCode',
        align: 'center',
        width: '20%',
    }, {
        title: '部件名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        align: 'center',
        width: '20%',
    }, {
        title: '规格型号',
        dataIndex: 'specification',
        key: 'specification',
        align: 'center',
        width: '20%',
    },{
        title: '操作',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: '20%',
        render:(text,record) => {
            return (
                <FittingDetail
                    mainFlag = {false}
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
            <span style={{marginLeft:'8px'}}>
                <Button className="eqRepButton" onClick={this.handleDetail}>部件复制</Button>
                <Modal
                    title="部件复制"
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
                        <div>
                            <Button type="primary" size='large' onClick={this.replication}>复制</Button>
                            &nbsp;&nbsp;&nbsp;是否同时复制其配件：<Switch onChange={this.handleSwitch} checkedChildren="是" unCheckedChildren="否"  />
                        </div>
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
    handleSwitch = (checked) => {
        console.log(checked)
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
    handleDetail = () => {
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
            visible:false
        })
    }

}

export default ComponentRep