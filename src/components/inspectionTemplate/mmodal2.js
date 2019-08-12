import React from 'react';
import {Col, Divider, Input, message, Modal, Popconfirm, Radio, Row, Select} from "antd";
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import home from "../commom/fns";
import Table from "antd/lib/table";
import Innput from "./innput";
import axios from "axios";

class Mmodal2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            current: 1,
            checkType:'',
            leftDataSource:[],
            dataSource2: [],
            dataSource3: [],
            selectedRows: [],
            selectedRowKeys: [],
            rightcurrent: 1,
            value: 0,
            patrolName: '',
            selectflag:0,
            leftdataflag:0,
            rightdataflag:0,
        }
        this.pagination = {
            showSizeChanger: true,
            showTotal(total) {
                return `共${total}条记录`
            }
        }
        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onChange = this.onChange.bind(this)
        this.changepatrolContent = this.changepatrolContent.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.onCanCel1=this.onCanCel1.bind(this)
    }
    componentDidMount() {
        this.setState({
            patrolName:this.props.patrolName
        })
    }

    onChange = (e, record) => {
        console.log(e.target.value)
        record.patrolContent = e.target.value
        console.log(record)
        // this.changerecord(e.target.value)
    }
    onCanCel1=()=>{
        this.props.onCanCel();
        this.setState({
            visible: false,
            current: 1,
            checkType:'',
            leftDataSource:[],
            dataSource2: [],
            dataSource3: [],
            selectedRows: [],
            selectedRowKeys: [],
            rightcurrent: 1,
            value: 0,
            patrolName: '',
            selectflag:0,
            leftdataflag:0,
            rightdataflag:0,
        })
    }
    render() {
        const {Option} = Select;
        this.column1 = [


            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                sorter: (a, b) => a.id - b.id,
                width: '20%',
            }, {
                title: '巡检内容',
                dataIndex: 'patrolContent',
                key: 'patrolContent',
                width: '40%',
                render: (text, record) => {
                    return (
                        <span>
                        <Innput record={record} onChange={this.onChange} value={record.patrolContent}
                                changepatrolContent={this.changepatrolContent}/>

                    </span>
                    )
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                align: 'left',
                render: (text, record) =>
                    this.props.leftDataSource.length >= 1 ? (
                        <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.index)} okText="确定"
                                    cancelText="再想想">
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                    ) : null,
            }];
        this.column2 = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.id - b.id,
            width: '20%',
        }, {
            title: '巡检位置',
            dataIndex: 'locationName',
            key: 'locationName',
            width: '35%'
        }, {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            width: '20%',
            render: (text, record) => {
                return (
                    <span>
                        {record.index - 1 === 0 ? <span className='blue'
                                                        onClick={() => this.downmove(record)}>下移</span> : record.index === this.props.dataSource2.length ?
                            <span className='blue' onClick={() => this.upmove(record)}>上移</span> :
                            <div><span className='blue' onClick={() => this.upmove(record)}>上移</span> &nbsp;&nbsp;&nbsp;
                                <span className='blue' onClick={() => this.downmove(record)}>下移</span></div>}
                    </span>
                );
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'left',
            render: (text, record) => {
                return (
                    <span>

                        {/*删除*/}
                        {home.judgeOperation(this.props.operation, 'DELETE') ? <Divider type='vertical'/> : ''}
                        <span className={home.judgeOperation(this.props.operation, 'DELETE') ? '' : 'hide'}><Popconfirm
                            title="确定删除?" onConfirm={() => this.handleDelete2(record.index)} okText="确定"
                            cancelText="再想想">
                <span className='blue'>删除</span>
                </Popconfirm>
                        </span>
                    </span>
                );
            }
        }]
        this.column3 = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.id - b.id,
            width: '20%',
        }, {
            title: '巡检位置',
            dataIndex: 'locationName',
            key: 'locationName',
            width: '40%'
        }];
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            type: 'radio',
            onChange: this.onSelectChange,

        };

        return (
            <span>

             <Modal
                 visible={this.props.visible}
                 closable={false}
                 centered={true}
                 maskClosable={false}
                 width="1000px"
                 height="464"
                 title="新增数据"
                 footer={[
                     <SaveButton
                         key="save"
                         handleSave={this.handleSave}
                     />,
                     <CancleButton key='cancel' handleCancel={this.onCanCel1}/>]}
             >
                 <Row>
                          <Col span={6} style={{paddingTop: 8}}>所属车间:&nbsp;&nbsp;&nbsp;{this.props.name}</Col>
                          <Col span={9}>
                              <div className="example-input">巡检模板名称:&nbsp;&nbsp;&nbsp;<Input Value={this.props.patrolName} size="small" onChange={this.valueChange}/> </div></Col>
                          <Col span={9}>
                              <div>
                                  检查类型:
                                <Select value={this.state.selectflag?this.state.checkType:this.props.checkType} style={{width: 240, paddingLeft: 5}}
                                        onChange={this.handleChange}>
                                      <Option value="false">机械类</Option>
                                      <Option value="true">电气类</Option>
                                </Select>
                              </div>
                          </Col>
                 </Row>
                  <Row type="flex" justify="start" style={{paddingTop:15,paddingBottom:15}}>
                     <Col span={6} > <div className="example-input2">制&nbsp;&nbsp;表&nbsp;&nbsp;人:&nbsp;&nbsp;&nbsp;
                         <Input  Value={this.props.setPeople} size="small" name="setPeople" disabled/></div></Col>
                          <Col span={9}><div className="example-input">制&nbsp;&nbsp;表&nbsp;&nbsp;日&nbsp;&nbsp;期:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <Input Value={this.props.tabulatedate} size="small"name="tabulatedate" disabled/> </div></Col>

                 </Row>

                 {/*左侧表格*/}
                 <div className="inspection-Table">
                 <div className="inspection-Left-Table" style={{paddingTop: 20}}>
                     <span>项目名称：</span>
                     <span className="blue" style={{float: 'right'}} onClick={this.addtable}>新增</span>
                     <Table
                         columns={this.column1}
                         size="small"
                         dataSource={this.state.leftdataflag?this.state.leftDataSource:this.props.leftDataSource}
                         scroll={{y: 312}}
                         bordered
                     />



                 </div>
                     {/*右侧表格*/}
                 <div className="inspection-Right-Table" style={{paddingTop: 20}}>
                     <span>巡检区域：</span>
                     <span className="blue" style={{float: 'right'}} onClick={this.addtable2}>新增</span>
                     <Table
                         columns={this.column2}
                         dataSource={this.state.rightdataflag?this.state.dataSource2:this.props.dataSource2}
                         size="small"
                         scroll={{y: 312}}
                         bordered
                     />

                      <Modal
                          visible={this.state.visible}
                          closable={false}
                          centered={true}
                          maskClosable={false}
                          width="800px"
                          height="464"
                          title="新增数据"
                          footer={[
                              <SaveButton
                                  key="save"
                                  handleSave={this.handleok}
                              />,
                              <CancleButton key='cancel' handleCancel={this.handleCancle}/>]}
                      >
                             <Table
                                 rowSelection={rowSelection}
                                 dataSource={this.state.dataSource3}
                                 columns={this.column3}
                                 size="small"
                                 scroll={{y: 312}}
                                 pagination={this.pagination}
                                 onChange={this.handleTableChange}
                                 bordered
                             />




                         </Modal>
                 </div>
                 </div>
            </Modal>
        </span>
        )
    }


    handleSave = () => {
        this.props.changevisible()
        console.log(this.props.leftDataSource);
        var devicePatrolModelsItemDetailsList = [];
        for (var i = 0; i < this.props.leftDataSource.length; i++) {
            devicePatrolModelsItemDetailsList.push({
                patrolContent: this.props.leftDataSource[i].patrolContent,
                modelCode:this.props.leftDataSource[i].modelCode,
                code:this.props.leftDataSource[i].code,
            })
        }
        var devicePatrolModelsLocationDetails = [];
        for (var i = 0; i < this.props.dataSource2.length; i++) {
            devicePatrolModelsLocationDetails.push({
                modelCode:this.props.dataSource2[i].modelCode,
                code:this.props.dataSource2[i].code,
                locationCode: this.props.dataSource2[i].locationCode,
                locationName: this.props.dataSource2[i].locationName
            })
        }
        console.log(devicePatrolModelsLocationDetails)
        if(this.state.patrolName===''){
            this.setState({
                patrolName:this.props.patrolName
            })
        }
        var kk=false;
        if(this.props.checkType==='电气类'){
            kk=true;
        }
        if(this.state.selectflag===0){
            this.setState({
                value:kk
            })
        }
        var addData = {

            devicePatrolModelsHead: {
                deptCode: this.props.deptCode,
                patrolName: this.state.patrolName,
                code:this.props.code,
                checkType:this.state.value,
                tabulatedate: "2019-08-31"
            },
            devicePatrolModelsItemDetailsList: devicePatrolModelsItemDetailsList,
            devicePatrolModelsLocationDetails: devicePatrolModelsLocationDetails,
            setPeople: this.props.setPeople
        }
        axios({
            url: `${this.props.url.devicePatrolModel.update}`,
            method: 'put',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: addData,
            type: 'json'
        }).then((data) => {
            this.props.fetch({
                deptId:this.props.deptCode,
            },1)
            this.setState({
                visible: false,
            })
        }).catch(() => {
            message.info('新增失败，请联系管理员！')
        })


    }


    handleChange = (value) => {
        console.log(value)
        this.setState({
            value: value,
            selectflag:1
        })
        if(value==='false'){
            this.setState({
                checkType:'机械类'
            })
        }else{
            this.setState({
                checkType:'电气类'
            })
        }
        console.log(this.state.checkType)
    }

    addtable = () => {
        if(this.state.leftdataflag===0){
        const dataSource=this.props.leftDataSource
        const current = dataSource.length + 1
        dataSource.push({
            index: current,
            patrolContent: '',
        })
        console.log(this.state.leftDataSource)
        this.setState({
            current: current,
            leftdataflag:1,
            leftDataSource:dataSource
        })
        console.log(this.state.leftDataSource)}
        else{
            const dataSource=this.state.leftDataSource
            const current = dataSource.length + 1
            dataSource.push({
                index: current,
                patrolContent: '',
            })
            console.log(this.state.leftDataSource)
            this.setState({
                current: current,
                leftdataflag:1,
                leftDataSource:dataSource
            })
            console.log(this.state.leftDataSource)
        }
    }


    addtable2 = () => {
        console.log('右边表格增加1')
        this.setState({
            visible: true,
        });
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
            const res = data.data.data ? data.data.data : [];
            console.log(res)
            this.pagination.total = res ? res.total : 0;
            this.pagination.current = res.page;
            if (res) {
                console.log('11111')
                var TableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i]
                    TableData.push({
                        code: arr['code'],
                        deptCode: arr['deptCode'],
                        idCode: arr['idCode'],
                        locationName: arr['locationName'],
                        index: i + 1,
                    })
                }
                this.setState({
                    dataSource3: TableData
                })
                console.log(TableData)
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    dataSource3: [],
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });

    }


    handleok = () => {
        if(this.state.selectedRows[0]){
        if(this.state.rightdataflag===0){
        const ids = this.state.selectedRows;
        const dataSource2=this.props.dataSource2
            const current = dataSource2.length + 1
        this.setState({
            visible: false,
            rightcurrent:current,
            rightdataflag:1
        })
        dataSource2.push({
            index: current,
            code: this.state.selectedRows[0].code,
            locationName: this.state.selectedRows[0].locationName,
            deptCode: this.state.selectedRows[0].deptCode,

        })
        this.setState({
            dataSource2:dataSource2
        })
        console.log(this.props.dataSource2)
        }else{
            const ids = this.state.selectedRows;
            const dataSource2=this.state.dataSource2
            const current = dataSource2.length + 1
            this.setState({
                visible: false,
                rightcurrent: current,
                rightdataflag:1
            })
            dataSource2.push({
                index: current,
                code: this.state.selectedRows[0].code,
                locationName: this.state.selectedRows[0].locationName,
                deptCode: this.state.selectedRows[0].deptCode,

            })
            console.log(this.state.dataSource2)
            this.setState({
                dataSource2:dataSource2
            })
        }}else{
            message.info('必须有选中项才可保存！')
        }
    }


    handleCancle = () => {
        this.setState({
            visible: false
        })
    }

    handleDelete = index => {
        if(this.state.leftdataflag===0){
        const dataSource = [...this.props.leftDataSource];
        const LeftDataSource = dataSource.filter(item => item.index !== index)
        console.log(LeftDataSource)
        var kkk = LeftDataSource;
        for (var i = 0; i < LeftDataSource.length; i++) {
            kkk[i].index = i + 1
        }
        console.log(kkk)
        this.setState({
            leftDataSource: kkk,
            current: kkk.length,
            leftdataflag:1,
        })
        console.log(this.props.leftDataSource)
        }else{
            const dataSource = [...this.state.leftDataSource];
            const LeftDataSource = dataSource.filter(item => item.index !== index)
            console.log(LeftDataSource)
            var kkk = LeftDataSource;
            for (var i = 0; i < LeftDataSource.length; i++) {
                kkk[i].index = i + 1
            }
            console.log(kkk)
            this.setState({
                leftDataSource: kkk,
                current: kkk.length,
                leftdataflag:1,
            })
            console.log(this.props.leftDataSource)
        }
    };


    handleDelete2 = index => {
        if(this.state.rightDataflag===0){
            const dataSource = [...this.props.dataSource2];
            const rightDataSource = dataSource.filter(item => item.index !== index)
            console.log(rightDataSource)
            var kkk = rightDataSource;
            for (var i = 0; i < rightDataSource.length; i++) {
                kkk[i].index = i + 1
            }
            var len = kkk.length
            console.log(kkk)
            if (kkk.length === 0) {
                len = 1;
            }
            this.setState({
                dataSource2: kkk,
                rightcurrent: len,
                rightDataflag:1,
            })
            console.log(this.props.dataSource2)
        }else{
            const dataSource = [...this.state.dataSource2];
            const rightDataSource = dataSource.filter(item => item.index !== index)
            var kkk = rightDataSource;
            for (var i = 0; i < rightDataSource.length; i++) {
                kkk[i].index = i + 1
            }
            var len = kkk.length
            console.log(kkk)
            if (kkk.length === 0) {
                len = 1;
            }
            this.setState({
                dataSource2: kkk,
                rightcurrent: len,
                rightDataflag:1,
            })
            console.log(this.props.dataSource2)
        }

    };


    changepatrolContent = (e, record) => {
        record.patrolContent = e
        const dataSource = this.props.leftDataSource
        this.setState({
            leftDataSource: dataSource
        })
    }


    onChange = () => {
        this.setState({
            flag: 0
        })
    }


    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
        console.log(selectedRows)
        console.log(this.state.selectedRowKeys)

    }


    handleTableChange(pagination) {
        // this.pagination=pagination;
        console.log(this.pagination)
        axios({
            url: `${this.props.url.devicePatrolModel.position}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                deptId: this.props.deptCode,
                size: pagination.pageSize,
                page: pagination.current
            }
        }).then((data) => {
            const res = data.data.data ? data.data.data : [];
            console.log(res)
            this.pagination.total = res ? res.total : 0;
            this.pagination.current = res.page;
            if (res) {
                console.log('11111')
                var TableData = [];
                for (var i = 0; i < res.list.length; i++) {
                    var arr = res.list[i]
                    TableData.push({
                        code: arr['code'],
                        deptCode: arr['deptCode'],
                        idCode: arr['idCode'],
                        locationName: arr['locationName'],
                        index: i + 1,
                    })
                }
                this.setState({
                    dataSource3: TableData
                })
                console.log(TableData)
            } else {
                message.info('查询失败，请刷新下页面！')
                this.setState({
                    dataSource3: [],
                });
            }
        }).catch(() => {
            message.info('查询失败，请刷新下页面！')
        });
    }

    downmove = (record) => {
        this.setState({
            dataSource2:this.props.dataSoure2
        })
        var array = this.state.dataSource2;
        if(array.length>1) {
            const index1 = record.index - 1;
            const index2 = record.index;
            array.splice(index2, 1, ...array.splice(index1, 1, array[index2]));

            for (var i = 0; i < array.length; i++) {
                array[i].index = i + 1
            }
            this.setState({
                dataSource2: array,
            })
        }
    }
    upmove = (record) => {
        var array = this.props.dataSource2;
        const index1 = record.index - 1;
        const index2 = record.index - 2;
        array.splice(index2, 1, ...array.splice(index1, 1, array[index2]));

        for (var i = 0; i < array.length; i++) {
            array[i].index = i + 1
        }
        this.setState({
            dataSource2: array,
        })
    }
    valueChange = (e) => {
        this.setState({
            patrolName: e.target.value
        })
    }
}
export default  Mmodal2