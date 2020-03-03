import React from 'react';
import {Input, Select} from "antd";
import Submit from "../../../BlockQuote/checkSubmit";
import axios from "axios";
import BatchNumberSelect from "../../../BlockQuote/batchNumberSelect";
const {Option} = Select;

class WetPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            batch: undefined,
            linesData: [],
            deptCode: ''
        };
        this.batchChange = this.batchChange.bind(this);
        this.getLinesData = this.getLinesData.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.getBatchNumber = this.getBatchNumber.bind(this);
        this.applySaveAndReview = this.applySaveAndReview.bind(this);
    }

    render() {
        let {linesData,batch} = this.state, {outTypeData,addressData,deptName} = this.props;
        return (
            <div>
                <div className={'stock-out-flex'} style={{marginTop: 10}}>
                    <div>
                        <span className='stock-out-application-span'>湿法产线：</span>
                        <Select placeholder={'请选择产线'} style={{width: 115}} onChange={this.selectChange}>
                            {
                                linesData.length ? linesData.map(e => <Option key={e.code} value={e.code} name={'lineCode'}>{e.name}</Option>) : null
                            }
                        </Select>
                    </div>
                    <div>
                        <span className='stock-out-application-span'>出库点：</span>
                        <Select placeholder={'请选择出库点'} style={{width: 115}} onChange={this.selectChange}>
                            {
                                addressData.length ? addressData.map(e => <Option key={e.id} value={e.id} name={'outPoint'}>{e.deliveryAddressName}</Option>) : null
                            }
                        </Select>
                    </div>
                    <div>
                        <span className='stock-out-application-span'>出库类别：</span>
                        <Select placeholder={'请选择出库类别'} style={{width: 115}} onChange={this.selectChange}>
                            {
                                outTypeData.length ? outTypeData.map(e => <Option key={e.id} value={e.id} name={'outType'}>{e.deliveryTypeName}</Option>) : null
                            }
                        </Select>
                    </div>
                </div>
                <div className={'stock-out-flex'} style={{marginTop: 10}}>
                    <div>
                        <span className='stock-out-application-span'>领料部门：</span>
                        <span>{deptName}</span>
                    </div>
                    <div>
                        <span>批次信息：</span>
                        <Input value={batch} placeholder={'请输入批次'} style={{width: 170}} onChange={this.batchChange}/>
                        <BatchNumberSelect url={this.props.url} batchNumber={this.state.batch} getBatchNumber={this.getBatchNumber}/>
                    </div>
                    <Submit url={this.props.url} applySaveAndReview={this.applySaveAndReview}/>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getLinesData();
    }

    /**湿法生产线*/
    getLinesData() {
        axios.get(`${this.props.url.precursorProductionLine.all}`).then((data) => {
            let res = data.data.data;
            this.setState({
                linesData: res
            })
        })
    }

    /**在组件BatchNumberSelect中获取batchNumber批号显示*/
    getBatchNumber(batch) {
        this.setState({
            batch: batch.join('')
        })
    }

    batchChange(e) {
        let value = e.target.value;
        this.setState({
            batch: value
        })
    }

    selectChange(value,option) {
        let name = option.props.name;
        this.setState({
            [name]: value
        })
    }

    applySaveAndReview(auditId,isUrgent) {
        let {batch,lineCode,outPoint,outType} = this.state, {userId,deptCode} = this.props,
            params = {
                auditId,
                batch,
                deptCode,
                isUrgent,
                lineCode,
                outPoint,
                outType,
                userId
            };
        console.log(params)
    }
}

export default WetPart;
