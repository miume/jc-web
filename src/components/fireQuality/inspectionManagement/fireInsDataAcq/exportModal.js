import React, { Component } from 'react'
import { Select, Table, Checkbox, Input,DatePicker } from "antd";
import NewButton from '../../../BlockQuote/newButton'
import './acq.css'
import axios from 'axios'
const { Group } = Checkbox
const {Option}=Select
class ExportModal extends Component {
    constructor(props) {
        super(props)
        this.columns = [{
            title: '序号',
            key: 'index',
            dataIndex: 'index',
        }, {
            title: '批次',
            key: 'batch',
            dataIndex: 'batch',
        }]
        this.state = {
            selectedRowKeys: []
        }
        this.selectChange = this.selectChange.bind(this);
        this.confirm = this.confirm.bind(this);
        this.dateChange=this.dateChange.bind(this);
    }

    selectChange(value, name) {
        name=name.props.name
        this.setState({
            [name]:value
        })
    }
    dateChange(date,dateString){
        this.setState({
            date:dateString
        })
    }
    /**点击确定按钮*/
    confirm() {
        let {processCode,modelCode,date}=this.state,
           params={
            processCode:processCode,
            productCode:modelCode,
            startTime:date
        }
        axios({
            url:this.props.url.dateConllection.getByProcessByProduct,
            method:'get',
            headers:{
                'Authorizaion':this.props.url.Authorizaion
            },
            params:params
        }).then(data=>{
            let res=data.data.data
            // if(res){
            //     this.setState({
            //         processData:res
            //     })
            // }
        })
       
    }
    onSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }
    render() {
        let { selectedRowKeys } = this.state,{processData,modelData}=this.props
        const rowSelection = {//checkbox
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div >
                <div className={'fire-ins-data-acq'}>
                    <span>工序 ：</span>
                    <Select onChange={this.selectChange} placeholder={'请选择工序'} style={{ width: '20%', marginRight: '10px' }}>
                        {
                            processData?processData.map(item=>{
                                return(
                                    <Option key={item.code} value={item.code} name='processCode'>{item.value}</Option>
                                )
                            }):null
                        }
                    </Select>
                    <span>产品型号 ：</span>
                    <Select onChange={this.selectChange} placeholder={'请选择产品型号'} style={{ width: '20%', marginRight: '10px' }}>
                        {
                            modelData?modelData.map(item=>{
                                return(
                                    <Option key={item.code} value={item.code} name='modelCode'>{item.value}</Option>
                                )
                            }):null
                        }
                    </Select>
                    <span>日期 ：</span>
                    <DatePicker onChange={this.dateChange} placeholder={'请选择日期'} style={{ width: '20%', marginRight: '10px' }}/>
                    <NewButton name='确定' handleClick={this.confirm} />
                </div>
                <div className={'fire-ins-data-acq'}>检验项目：</div>
                <div className={'fireIns-add-display fire-ins-data-acq'}>
                    <div className={'fireIns-add-check-group fireIns-add-check-group-width1'}>
                        <Group>
                            <Checkbox></Checkbox>
                        </Group>
                    </div>
                    <Table style={{ width: '55%' }} rowSelection={rowSelection} columns={this.columns} pagination={false} rowKey={record => record.index} scroll={{ y: '200px' }} size={'small'} bordered />
                </div>
                <div>
                    <span>导出位置 ：</span>
                    <Input style={{ width: '200px', marginRight: '10px' }} />
                </div>

            </div>
        )
    }
}
export default ExportModal