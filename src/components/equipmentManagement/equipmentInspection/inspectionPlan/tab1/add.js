import React from 'react';
import {Modal, Select, Input, message, DatePicker, Table} from 'antd';
import axios from 'axios';
import AddButton from '../../../../BlockQuote/newButton';
import CancleButton from "../../../../BlockQuote/cancleButton";
import SaveButton from "../../../../BlockQuote/saveButton";
import moment from "moment";
import locale from 'antd/lib/date-picker/locale/zh_CN';

class AddModal extends React.Component {
    url;
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            radioValue: undefined,
            date: null,
            devicePatrolModelsItemDetailsList: [],
            devicePatrolModelsLocationDetails: [],
            templateName: "",
            planName: "",
            templateData: [],
            checkType: "",
            devicePatrolModelsHead: {}
        };
        this.onChange = this.onChange.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.getTitle1 = this.getTitle1.bind(this);
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
            width:'40%'
        },{
            title:'巡检内容',
            dataIndex:'patrolContent',
            key:'patrolContent',
            width:'40%'
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
            width:'75%'
        }]
    }

    onChangeTime = (date) => {
        this.setState({
            date: moment(date).format('YYYY-MM-DD')
        })
    };

    showModal = () => {
        axios({
            url: `${this.url.devicePatrolModel.getAllByDeptCode}`,
            method: "get",
            params: {id: parseInt(this.props.deptCode)},
            type: "json"
        }).then((data) => {
            let res = data.data.data;
            this.setState({
                templateData: res
            })
        });
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            radioValue: undefined,
            date: null,
            devicePatrolModelsItemDetailsList: [],
            devicePatrolModelsLocationDetails: [],
            planName: "",
            checkType: "",
            templateData: []
        });
    };

    handleCreate = () => {
        const userId = JSON.parse(localStorage.getItem('menuList'))?JSON.parse(localStorage.getItem('menuList')).userId:null;
        const {planName,radioValue,date} = this.state;
        if( !planName || !radioValue || !date) {
            message.info('请确保计划名称、巡检模板名称以及计划日期不为空！');
            return;
        }
        axios({
            url: `${this.url.devicePatrolPlan.add}`,
            method: "post",
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                deptId: parseInt(this.props.deptCode),
                planName: planName,
                checkType: this.state.checkType === false ? 0 : 1,
                planDate: date,
                modelId: radioValue,
                userId: userId
            },
            type: "json"
        }).then((data) => {
            if (data.data.code !== 0) {
                message.info('新增失败')
                this.setState({
                    visible: false,
                    radioValue: undefined,
                    date: null,
                    devicePatrolModelsItemDetailsList: [],
                    devicePatrolModelsLocationDetails: [],
                    planName: "",
                    checkType: "",
                    templateData: []
                })
            } else {
                message.info(data.data.message);
                this.props.getTableData();
                this.setState({
                    visible: false,
                    radioValue: undefined,
                    date: null,
                    devicePatrolModelsItemDetailsList: [],
                    devicePatrolModelsLocationDetails: [],
                    planName: "",
                    checkType: "",
                    templateData: []
                });
            }
        })
    }

    onChange(e) {
        const value = e.target.value;
        this.setState({planName: value});
    }

    selectChange = (e) => {
        axios({
            url: `${this.url.devicePatrolModel.detail}`,
            method: "get",
            params: {id: e},
            type: "json"
        }).then((data) => {
            var res = data.data.data;
            for(let i = 0; i < res.devicePatrolModelsItemDetailsList.length; i++) {
                res.devicePatrolModelsItemDetailsList[i]['index'] = i + 1;
            }
            for(let j = 0; j < res.devicePatrolModelsLocationDetails.length; j++) {
                res.devicePatrolModelsLocationDetails[j]['index'] = j + 1;
            }
            this.setState({
                checkType: res.devicePatrolModelsHead.checkType,
                devicePatrolModelsItemDetailsList: res.devicePatrolModelsItemDetailsList,
                devicePatrolModelsLocationDetails: res.devicePatrolModelsLocationDetails,
                devicePatrolModelsHead: res.devicePatrolModelsHead
            })
        })
        this.setState({radioValue: e});
    }

    getTitle() {
        return '巡检项目';
    }

    getTitle1() {
        return '巡检区域';
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <span className={this.props.status === 1 ? '' : 'hide'}>
                <AddButton handleClick={this.showModal} name='新增' className='fa fa-plus'/>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    title="新增"
                    width='950px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <SaveButton key="define" handleSave={this.handleCreate} className='fa fa-check'/>,
                    ]}
                >
                    <div>
                        <span className="headers">所属车间：</span><span className="checkName">{this.props.deptName}</span>
                        <span className="headers">计划名称：</span>
                        <span>
                            <Input placeholder="请输入计划名称" onChange={this.onChange}
                                   value={this.state.planName} style={{width:200}}/>
                        </span>
                        <span className="headers1">巡检模板名称：</span>
                        <span>
                            <Select value={this.state.radioValue} placeholder="请选择巡检模板" style={{width: "200px"}} onChange={this.selectChange}>{
                            this.state.templateData.map((value) => {
                                return <Select.Option key="item"
                                                      value={value.devicePatrolModelsHead.code}>{value.devicePatrolModelsHead.patrolName}</Select.Option>
                            })}
                            </Select>
                        </span>
                    </div>
                    <div>
                        <span className="headers">检查类型：</span>
                        <span className="checkName">{this.state.radioValue ? this.state.checkType === true ? "电气类" : "机械类" : '请先选择巡检模板'}</span>
                        <span className="headers">计划日期：</span>
                        <span><DatePicker format="YYYY-MM-DD" locale={locale}
                                          value={this.state.date ? moment(this.state.date) : null}
                                          showTime={true} style={{width: '200px'}}
                                          onChange={this.onChangeTime}
                                          placeholder="请选择时间"/>
                        </span>
                    </div>
                    <Table
                        title = {this.getTitle}
                        columns={this.column1}
                        rowKey={record => record.code}
                        size="small"
                        dataSource={this.state.devicePatrolModelsItemDetailsList}
                        bordered
                        scroll={{y: 150}}
                        pagination={false}
                        className={'inspection-detail-table'}
                    />
                    <Table
                        title = {this.getTitle1}
                        columns={this.column2}
                        rowKey={record => record.code}
                        size="small"
                        dataSource={this.state.devicePatrolModelsLocationDetails}
                        bordered
                        scroll={{y: 150}}
                        pagination={false}
                    />
                </Modal>
            </span>
        )
    }
}

export default AddModal
