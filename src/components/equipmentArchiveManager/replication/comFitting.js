import React from 'react';
import {Button, Col, Divider, Input, message, Modal, Popconfirm, Row, Table} from 'antd';
import CancleButton from "../../BlockQuote/cancleButton";
import FittingDetail from './fittingDetail'
import axios from "axios";


class ComFitting extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            visible: false,
            dataSource: [],
            selectedRowKeys: [],
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.replication=this.replication.bind(this)

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
    // /**实现全选*/
    // onSelectChange = (selectedRowKeys) => {
    //     this.setState({
    //         selectedRowKeys: selectedRowKeys
    //     });
    // }
    replication= (code) => {
        axios({
            url:`${this.props.url.equipmentArchive.duplicateUnitAcc}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params:{
                originUnitId:code,
                newUnitId:this.props.buCode
            }
        }).then((data) => {
            message.info('复制成功');
        }).catch(() => {
            message.info('复制失败，请联系管理员！');
        });

    }
    handleMainFitting = () => {
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
        const deviceName = this.props.record.deviceName.split('-')[0]
        this.props.getRightData(this.props.depCode,deviceName?deviceName:this.props.deviceName)
        this.setState({
            visible: false,
        });
    };

}
export default ComFitting