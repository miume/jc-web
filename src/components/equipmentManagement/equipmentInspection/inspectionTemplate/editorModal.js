import React from 'react';
import {Button, Divider, Input, Modal, Select, Table,message} from 'antd';
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";
import SaveButton from "../../../BlockQuote/saveButton";
import AddLocationDetails from "./addLocationDetail";
import NewButton from "../../../BlockQuote/newButton";
const {Option} = Select;

class EditorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            checkType: '',
            patrolName: '',
            devicePatrolModelsItemDetailsList: [],
            devicePatrolModelsLocationDetails: []
        };
        this.cancel = this.cancel.bind(this);
        this.locationMove = this.locationMove.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.addItem = this.addItem.bind(this);
        this.saveData = this.saveData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addLocationItem = this.addLocationItem.bind(this);
        this.handleDeleteLocation = this.handleDeleteLocation.bind(this);
        this.renderLocationMove = this.renderLocationMove.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.column1 = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'20%',
        },{
            title:'巡检项目',
            dataIndex:'patrolItem',
            key:'patrolItem',
            width:'30%',
            render: (text,record) => {
                return (
                    <Input defaultValue={text} name={`${record.index-1}-patrolItem`} onChange={this.onInputChange} />
                )
            }
        },{
            title:'巡检内容',
            dataIndex:'patrolContent',
            key:'patrolContent',
            width:'30%',
            render: (text,record) => {
                return (
                    <Input defaultValue={text} name={`${record.index-1}-patrolContent`} onChange={this.onInputChange} />
                )
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                return <span className='blue' onClick={() => this.handleDelete(record.index-1)}>删除</span>
            }
        }];

        this.column2 = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            sorter:(a,b) =>a.id-b.id,
            width:'20%',
        },{
            title:'巡检位置',
            dataIndex:'locationName',
            key:'locationName',
            width:'20%'
        }, {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            width: '40%',
            render: (text, record) => {
                let index = record.index, len = this.state.devicePatrolModelsLocationDetails.length;
                return this.renderLocationMove(index, len);
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                return (
                    <span className='blue' onClick={() => this.handleDeleteLocation(record.index-1)}>删除</span>
                );
            }
        }]
    }

    render() {
        const {title,record} = this.props,
              {deptCode,workshop,patrolName,setPeople,tabulatedate} = record ? record : {};
        return (
            <span>
                {this.renderTitle(title)}
                <Modal visible={this.state.visible} width={1000} centered={true} closable={false}
                       title={'详情'} maskClosable={false}
                       footer={[
                           <SaveButton key="save" handleSave={this.handleSave}/>,
                           <CancleButton key='cancel' handleCancel={this.cancel} />]}
                >
                    <div>
                        <div className='inspection-detail-head'>
                            <div className='inspection-detail-div'>
                                <span className='inspection-detail-div-span'>所属车间：</span>
                                <span>{workshop}</span>
                            </div>
                            <div className='inspection-detail-div'>
                                <span className='inspection-detail-div-span'>巡检模块名称：</span>
                                <Input defaultValue={patrolName} name={'patrolName'} placeholder={'请输入模版名称'} style={{width: 200}} onChange={this.onInputChange} />
                            </div>
                            <div className='inspection-detail-div'>
                                <span className='inspection-detail-div-span'>检查类型：</span>
                                <Select value={this.state.checkType} style={{width: 200}} onChange={this.handleChange}>
                                    <Option value="false">机械类</Option>
                                    <Option value="true">电气类</Option>
                                </Select>
                            </div>
                        </div>
                        <div className='inspection-detail-head'>
                            <div className='inspection-detail-div'>
                                <span className='inspection-detail-div-span'>制表人：</span>
                                <span>{setPeople}</span>
                            </div>
                            <div className='inspection-detail-div'>
                                <span className='inspection-detail-div-span'>制表日期：</span>
                                <span>{tabulatedate}</span>
                            </div>
                            <div className='inspection-detail-div'></div>
                        </div>
                        <div className='inspection-detail-table-head'>
                            <div className='inspection-detail-table-head-item'>巡检项目</div>
                            <Button type={"primary"} onClick={this.addItem}>新增</Button>
                        </div>
                        <Table
                            columns={this.column1}
                            rowKey={record => record.index}
                            size="small"
                            dataSource={this.state.devicePatrolModelsItemDetailsList}
                            bordered
                            scroll={{y: 150}}
                            pagination={false}
                            className={'inspection-detail-table'}
                        />
                        <div className='inspection-detail-table-head'>
                            <div className='inspection-detail-table-head-item'>巡检区域</div>
                            <AddLocationDetails url={this.props.url} deptCode={deptCode} addLocationItem={this.addLocationItem}/>
                        </div>
                        <Table
                            columns={this.column2}
                            rowKey={record => record.index}
                            size="small"
                            dataSource={this.state.devicePatrolModelsLocationDetails}
                            bordered
                            scroll={{y: 150}}
                            pagination={false}
                            className={'inspection-detail-table'}
                        />
                    </div>
                </Modal>
            </span>
        )
    }

    /**根据父组件传过来的title*渲染新增按钮和编辑文本*/
    renderTitle(title) {
        if(title === '新增') {
            return <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus'/>
        } else {
            return <span className='blue' onClick={this.handleClick}>编辑</span>;
        }
    }

    /**点击新增*/
    handleAdd() {
        let {checkType} = this.props.record;
        this.setState({
            visible: true,
            checkType: checkType
        })
    }

    /**点击详情*/
    handleClick() {
        let {code,checkType} = this.props.record;
        this.getDetailData(code);
        this.setState({
            visible: true,
            checkType: checkType.toString()
        })
    }

    cancel() {
        this.setState({
            visible: false
        })
    }

    /**编辑，根据code获取详情数据*/
    getDetailData(code) {
        axios({
            url: `${this.props.url.devicePatrolModel.detail}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                id:code
            }
        }).then((data)=>{
            const res=data.data.data;
            let data1 = res.devicePatrolModelsItemDetailsList, data2 = res.devicePatrolModelsLocationDetails;
            for(let i = 0; i < data1.length; i++) {
                data1[i]['index'] = i + 1;
            }
            for(let j = 0; j < data2.length; j++) {
                data2[j]['index'] = j + 1;
            }
            this.setState({
                devicePatrolModelsItemDetailsList: res.devicePatrolModelsItemDetailsList,
                devicePatrolModelsLocationDetails: res.devicePatrolModelsLocationDetails
            })
        })
    }

    /**监控下拉框变化*/
    handleChange(value) {
        this.setState({
            checkType: value
        })
    }

    /**监控input内容的变化*/
    onInputChange(e) {
        let value = e.target.value, name = e.target.name, content = name.split('-');
        if(content.length > 1) {
            let index = content[0], name = content[1],
                {devicePatrolModelsItemDetailsList} = this.state;
            devicePatrolModelsItemDetailsList[index][name] = value;
        } else {
            this.setState({
                [name]: value
            })
        }

    }

    /**编辑和新增数据*/
    handleSave() {
        let {record} = this.props,
            {devicePatrolModelsItemDetailsList,devicePatrolModelsLocationDetails,patrolName,checkType} = this.state,
            devicePatrolModelsHead = {
                deptCode: record.deptCode,
                patrolName: patrolName ? patrolName : record.patrolName,
                code:record.code,
                checkType:checkType,
                tabulatedate: record.tabulatedate,
                setPeople: record.setPeopleId
            };
        if(!devicePatrolModelsHead.patrolName) {
            message.info('请填写巡检模块名称！');
            return
        }
        let data = {
            devicePatrolModelsHead: devicePatrolModelsHead,
            devicePatrolModelsItemDetailsList: devicePatrolModelsItemDetailsList,
            devicePatrolModelsLocationDetails: devicePatrolModelsLocationDetails,
            setPeople: record.setPeople
        };
        this.saveData(data);
    }

    /**新增数据和更新数据*/
    saveData(data) {
        let url = `${this.props.url.devicePatrolModel.update}`, method = 'put';
        if(this.props.title) {
            url = `${this.props.url.devicePatrolModel.add}`;
            method = 'post';
        }
        axios({
            url: url,
            method: method,
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: data,
            type: 'json'
        }).then((data) => {
            message.info(data.data.message);
            this.props.searchEvent();
            this.cancel();
        })
    }

    /**巡检项目新增一行*/
    addItem() {
        let {devicePatrolModelsItemDetailsList} = this.state,
            current = devicePatrolModelsItemDetailsList.length + 1;
        devicePatrolModelsItemDetailsList.push({
            index: current,
            patrolContent: '',
            patrolItem: ''
        });
        this.setState({
            devicePatrolModelsItemDetailsList: devicePatrolModelsItemDetailsList
        })
    }

    /**巡检项目删除*/
    handleDelete(index) {
        let {devicePatrolModelsItemDetailsList} = this.state;
        devicePatrolModelsItemDetailsList.pop(index);
        this.setState({
            devicePatrolModelsItemDetailsList: devicePatrolModelsItemDetailsList
        })
    }

    /**新增巡检区域一行数据*/
    addLocationItem(rows) {
        if(rows && rows.length) {
            let {devicePatrolModelsLocationDetails} = this.state, current = devicePatrolModelsLocationDetails.length + 1;
            devicePatrolModelsLocationDetails.push({
                index: current,
                locationCode: rows[0].code,
                locationName: rows[0].locationName,
                deptCode: rows[0].deptCode
            });
            this.setState({
                devicePatrolModelsLocationDetails: devicePatrolModelsLocationDetails
            })
        }
    }

    /**删除巡检区域一行数据*/
    handleDeleteLocation(index) {
        let {devicePatrolModelsLocationDetails} = this.state;
        devicePatrolModelsLocationDetails.pop(index);
        this.setState({
            devicePatrolModelsLocationDetails: devicePatrolModelsLocationDetails
        })
    }

    /**移动巡检区域的数据*/
    renderLocationMove(index,len) {
        if(index === 1) {
            return <span className='blue' onClick={() => this.locationMove(index-1,len,'down')}>下移</span>
        } else if(index === len) {
            return <span className='blue' onClick={() => this.locationMove(index-1,len,'up')}>上移</span>
        } else {
            return (
                <span>
                    <span className='blue' onClick={() => this.locationMove(index-1,len,'up')}>上移</span>
                    <Divider type={"vertical"}/>
                    <span className='blue' onClick={() => this.locationMove(index-1,len,'down')}>下移</span>
                </span>
            )
        }
    }

    locationMove(index,len,flag) {
        let {devicePatrolModelsLocationDetails} = this.state;
        if(len >= 2) {
            if(flag === 'down') {
                [devicePatrolModelsLocationDetails[index], devicePatrolModelsLocationDetails[index+1]] = [devicePatrolModelsLocationDetails[index+1], devicePatrolModelsLocationDetails[index]];
            } else {
                [devicePatrolModelsLocationDetails[index], devicePatrolModelsLocationDetails[index-1]] = [devicePatrolModelsLocationDetails[index-1], devicePatrolModelsLocationDetails[index]];
            }
            //重新给数据排序，保证index按顺序正确显示
            for(let i = 0; i < len; i++) {
                devicePatrolModelsLocationDetails[i]['index'] = i + 1;
            }
            this.setState({
                devicePatrolModelsLocationDetails: devicePatrolModelsLocationDetails
            })
        }
    }
}

export default EditorModal;
