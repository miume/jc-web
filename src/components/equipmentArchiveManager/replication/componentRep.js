import React from 'react';
import {message, Modal, Button, Table, Switch, Divider, Popconfirm} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
import '../equipmentArchiveManager.css'
import FittingDetail from "./fittingDetail";
import NewButton from "../../BlockQuote/newButton";
import axios from "axios";


class ComponentRep extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            dataSource: [],
            selectedRowKeys: [],
            switchFlag:1
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
                <span>
                    <FittingDetail
                        mainFlag = {false}
                        url={this.props.url}
                        record={record}
                    />
                    <Divider type="vertical"/>
                    <Popconfirm title="确认复制?" onConfirm={() => this.replication(record.code)} okText="确定" cancelText="取消" >
                        <span className='blue'>复制</span>
                    </Popconfirm>
                </span>
            )
        }
    }]

    render() {
        // var selectedRowKeys = this.state.selectedRowKeys;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange
        // };
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
                            {/*<Button type="primary" size='large' onClick={this.replication}>复制</Button>*/}
                            &nbsp;&nbsp;&nbsp;是否同时复制其配件：<Switch onChange={this.handleSwitch} checkedChildren="是" unCheckedChildren="否"  />
                        </div>
                        {/*<div style={{paddingBottom:'10px'}}></div>*/}
                        <Table
                            columns={this.columns}
                            size="small"
                            bordered
                            scroll={{y: 360}}
                            pagination={false}
                            rowKey={record => record.code}
                            dataSource={this.state.dataSource}
                            // rowSelection={rowSelection}
                        />
                    </div>
                </Modal>
            </span>
        );
    }
    handleSwitch = (checked) => {
        var flag = 1
        if(checked===true){
            flag = 0
        }else{
            flag = 1
        }
        this.setState({
            switchFlag:flag
        })
    }
    /**实现全选*/
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys: selectedRowKeys
        });
    }
    replication= (code) => {
        // const selectedRowKeys = this.state.selectedRowKeys
        // console.log(selectedRowKeys)
        const switchFlag = this.state.switchFlag
        axios({
            url:`${this.props.url.equipmentArchive.duplicateDeviceUnit}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params:{
                originDeviceId:code,
                newDeviceId:this.props.mainCode,
                flag:switchFlag
            }
        }).then((data) => {
            message.info('复制成功');
        }).catch(() => {
            message.info('复制失败，请联系管理员！');
        });

    }
    handleDetail = () => {
        axios({
            url:`${this.props.url.equipmentArchive.getAllUnitByDeptCodeByDeviceName}?deviceName=${this.props.deviceName}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
        }).then((data) => {
            const res = data.data.data;
            var dataSource = []
            // TODO
            if(res){
                for(var i = 0; i< res.length; i++){
                    const arr = res[i]
                    dataSource.push({
                        index:i+1,
                        fixedassetsCode:arr.fixedassetsCode,
                        specification:arr.specification,
                        deviceName:arr.deviceName,
                        code:arr.code
                    })
                }
                this.setState({
                    dataSource: dataSource,
                    visible: true,
                })
            }else{
                this.setState({
                    dataSource: [],
                    visible: true,
                })
            }
        }).catch(() => {
            message.info('查询失败，请联系管理员！');
        });
    }
    handleCancel = () => {
        // console.log(this.props.depCode)
        // console.log(this.props.deviceName)
        this.props.handleData()
        this.setState({
            visible: false,
        });
    }

}

export default ComponentRep