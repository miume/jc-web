import React, { Component } from 'react'
import { Select, Table, Checkbox, DatePicker, message } from "antd";
import NewButton from '../../../BlockQuote/newButton'
import './acq.css'
import axios from 'axios'
import moment from 'moment'
const { Group } = Checkbox
const { Option } = Select
class ExportModal extends Component {
    constructor(props) {
        super(props)
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '15%'
        }, {
            title: '批次',
            key: 'batch',
            dataIndex: 'batch',
            width: '70%'
        }]
        this.state = {
            selectedRowKeys: [],
            batches: [],
            dataSource:[],
            testItem:[]
        }
        this.selectChange = this.selectChange.bind(this);
        this.confirm = this.confirm.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.checkChange = this.checkChange.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this);
        this.export = this.export.bind(this);
        this.getAllByProcessByProdut = this.getAllByProcessByProdut.bind(this);
        this.cancel=this.cancel.bind(this);
        this.getItems=this.getItems.bind(this);
    }
    componentDidMount() {
        this.props.onRef(this)
        this.getItems()
    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    /**获取所有检测项目*/
    getItems(){
        axios({
            url:`${this.props.url.fireMageTestItems}/getAll`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    testItemData:res
                })
            }
        })
    }
    selectChange(value, name) {
        let { processCode, modelCode } = this.state
        name = name.props.name
        this.setState({
            [name]: value
        })
        // if (name === 'processCode' && modelCode) {
        //     let params = {
        //         processCode: value,
        //         productCode: modelCode
        //     }
        //     this.getAllByProcessByProdut(params)
        // }
        // if (name === 'modelCode' && processCode) {
        //     let params = {
        //         processCode: processCode,
        //         productCode: value
        //     }
        //     this.getAllByProcessByProdut(params)
        // }
    }
    getAllByProcessByProdut(params) {
        axios({
            url: `${this.props.url.fireMageTestItems}/getAllByProcessByProdut`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params
        }).then(data => {
            let res = data.data.data
            this.setState({
                testItemData: res
            })
        })
    }
    checkChange(value) {
        this.setState({
            testItem: value
        })
    }
    dateChange(date, dateString) {
        this.setState({
            date: dateString
        })
    }
    /**根据日期，产品型号，工序得到表格数据*/
    confirm() {
        let { processCode, modelCode, date } = this.state,
            params = {
                processCode: processCode,
                productCode: modelCode,
                startTime: date
            }
        // if (processCode === undefined || processCode === '' || modelCode === undefined || modelCode === '' || date === '' || date === undefined) {
        //     message.error('信息选择不完整!')
        //     return
        // }
        axios({
            url: this.props.url.dateConllection.getByProcessByProduct,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: params
        }).then(data => {
            let res = data.data.data
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    res[i]['index'] = i + 1
                }
                this.setState({
                    dataSource: res
                })
            }
        })
    }
    onSelectChange(selectedRowKeys, record) {
        let { batches } = this.state
        batches.push(record[0].batch)
        this.setState({
            batches: batches,
            selectedRowKeys: selectedRowKeys
        })

    }
    /**选择检验项目和表格数据，以导出文件*/
    export() {
        let { batches, testItem } = this.state
        if (batches.length === 0 || testItem.length === 0) {
            message.error('信息选择不完整!')
            return
        }
        let data = {
            batches: batches,
            itemNames: testItem
        }
        axios({
            url: `${this.props.url.dateConllection.export}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data
        }).then(data => {
            let res = data.data.data
            if (res) {
                let url = `${this.props.url.equipmentRepair.download}${res}`,
                    a = document.createElement('a')
                a.href = url
                a.click()
                message.info(data.data.message)
            }
            this.cancel()
            this.props.handleVisible(false)
        })
    }
    cancel(){
        this.props.handleVisible(false)
        this.setState({
            dataSource:[],
            testItem:[],
            processCode:undefined,
            modelCode:undefined,
            // testItemData:[],
            batches:[],
            date:null
        })
    }
    render() {
        let { selectedRowKeys, testItemData, dataSource,processCode,modelCode,date } = this.state, { processData, modelData } = this.props
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div >
                <div className={'fire-ins-data-acq'}>
                    <span>工序 ：</span>
                    <Select onChange={this.selectChange} value={processCode} placeholder={'请选择工序'} style={{ width: '24%', marginRight: '10px' }}>
                        {
                            processData ? processData.map(item => {
                                return (
                                    <Option key={item.code} value={item.code} name='processCode'>{item.value}</Option>
                                )
                            }) : null
                        }
                    </Select>
                    <span>产品型号 ：</span>
                    <Select onChange={this.selectChange} value={modelCode} placeholder={'请选择产品型号'} style={{ width: '24%', marginRight: '10px' }}>
                        {
                            modelData ? modelData.map(item => {
                                return (
                                    <Option key={item.code} value={item.code} name='modelCode'>{item.value}</Option>
                                )
                            }) : null
                        }
                    </Select>
                    <span>日期 ：</span>
                    <DatePicker onChange={this.dateChange} value={date?moment(date):null} placeholder={'请选择日期'} style={{ width: '24%', marginRight: '10px' }} />
                    <NewButton name='确定' handleClick={this.confirm} />
                </div>
                <div className={'fire-ins-data-acq'}>检验项目：</div>
                <div className={'fireIns-add-display fire-ins-data-acq '}>
                    <div className={'fireIns-add-check-group fireIns-add-check-group-width1 fireIns-add-check-group-scroll'}>
                        <Group onChange={this.checkChange} value={this.state.testItem} style={{width:'100%'}}>
                            {
                                testItemData ? testItemData.map((item, index) => {
                                    return (
                                        <span className='fireIns-add-check-group-span1' key={index}> <Checkbox value={item.name} >{item.name}</Checkbox></span>
                                    )
                                }) : null
                            }
                        </Group>
                    </div>
                    <Table style={{ width: '50%' }} dataSource={dataSource} rowSelection={rowSelection} columns={this.columns} pagination={false} rowKey={record => record.index} scroll={{ y: '200px' }} size={'small'} bordered />
                </div>
            </div>
        )
    }
}
export default ExportModal
