import React from 'react';
import SaveButton from "../../../BlockQuote/saveButton";
import {Button, Modal, Table} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";

class AddLocationDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRowKeys: [],
            selectedRow: []
        };
        this.clickAdd = this.clickAdd.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.getAddLocationData = this.getAddLocationData.bind(this);
        this.column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.id - b.id,
            width: '40%',
        }, {
            title: '巡检位置',
            dataIndex: 'locationName',
            key: 'locationName',
            width: '40%'
        }];
    }

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            type: 'radio',
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Button type={"primary"} onClick={this.clickAdd}>新增</Button>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="600px"
                    title="新增数据"
                    footer={[
                        <SaveButton key="save" handleSave={this.handleOk}/>,
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>]}
                >
                    <Table
                        rowKey={record => record.code}
                        rowSelection={rowSelection}
                        dataSource={this.state.dataSource}
                        columns={this.column}
                        size="small"
                        scroll={{y: 160}}
                        pagination={false}
                        bordered
                        className='inspection-editor-table'
                    />
                </Modal>
            </div>
        )
    }

    /**点击巡检区域新增按钮*/
    clickAdd() {
        this.setState({
            visible: true
        });
        this.getAddLocationData();
    }

    /**获取新增数据*/
    getAddLocationData() {
        axios({
            url: `${this.props.url.devicePatrolModel.position}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                deptId: this.props.deptCode
            }
        }).then((data) => {
            let res = data.data.data;
            if(res && res.list) {
                for(let i = 0; i < res.list.length; i++) {
                    res.list[i]['index'] = i + 1;
                }
                this.setState({
                    dataSource: res.list
                })
            }
        })
    }

    onSelectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
    }

    handleOk() {
        let {selectedRows} = this.state;
        this.props.addLocationItem(selectedRows);
        this.handleCancel();
    }

    handleCancel() {
        this.setState({
            visible: false,
            selectedRows: [],
            selectedRowKeys: []
        })
    }
}

export default AddLocationDetails;
