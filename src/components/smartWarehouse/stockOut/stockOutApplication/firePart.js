import React from 'react';
import {Select,message} from "antd";
import Submit from "../../../BlockQuote/checkSubmit";
import axios from "axios";
const {Option} = Select;

class FirePart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linesData: []
        };
        this.applyOut = this.applyOut.bind(this);
        this.getLinesData = this.getLinesData.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.applySaveAndReview = this.applySaveAndReview.bind(this);
    }

    render() {
        let {linesData,lineCode,outPoint,outType} = this.state, {outTypeData,addressData,deptName} = this.props;
        return (
            <div>
                <div>{`领料部门：${deptName}`}</div>
                <div className={'stock-out-flex'} style={{marginTop: 10}}>
                    <div>
                        {/* <span>
                            火法产线：</span> */}
                        <Select placeholder={'请选择火法产线'} style={{width: 150}} onChange={this.selectChange} value={lineCode}>
                            {
                                linesData.length ? linesData.map(e => <Option key={e.code} value={e.code} name={'lineCode'}>{e.name}</Option>) : null
                            }
                        </Select>
                    </div>
                    <div>
                        {/* <span>出库点：</span> */}
                        <Select placeholder={'请选择出库点'} style={{width: 220,marginLeft:10}} onChange={this.selectChange} value={outPoint} dropdownMatchSelectWidth={false} dropdownStyle={{width: 220}}>
                            {
                                addressData.length ? addressData.map(e => <Option key={e.id} value={e.id} name={'outPoint'}>{e.deliveryAddressName}</Option>) : null
                            }
                        </Select>
                    </div>
                    <div>
                        {/* <span>出库类别：</span> */}
                        <Select placeholder={'请选择出库类别'} style={{width: 150,margin:'0 10px'}} onChange={this.selectChange} value={outType}>
                            {
                                outTypeData.length ? outTypeData.map(e => <Option key={e.id} value={e.id} name={'outType'}>{e.deliveryTypeName}</Option>) : null
                            }
                        </Select>
                    </div>
                    <div style={{float:'right'}}>
                    <Submit url={this.props.url} applySaveAndReview={this.applySaveAndReview}/>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getLinesData();
    }

    getLinesData() {
        axios.get(`${this.props.url.positiveProductline.all}`).then((data) => {
            let res = data.data.data;
            this.setState({
                linesData: res
            })
        })
    }

    selectChange(value,option) {
        let name = option.props.name;
        this.setState({
            [name]: value
        })
    }

    applySaveAndReview(auditId,isUrgent) {
        let {lineCode,outPoint,outType} = this.state, {userId,deptCode,data} = this.props,
            params = {
                auditId,
                deptCode,
                isUrgent,
                lineCode,
                outPoint: parseInt(outPoint),
                outType: parseInt(outType),
                userId
            };
        if(!data.length) {
            message.info('送审表格数据不能为空！');
            return
        }
        if(!auditId || !deptCode || !lineCode || !outPoint || !outType) {
            message.info('数据不完整，不能送审！');
            return
        }
        this.applyOut(params,data);
    }

    applyOut(params,data) {
        axios({
            url: `${this.props.url.fire}/audit`,
            method: 'post',
            params,
            data
        }).then(result => {
            message.info(result.data.mesg);
            if(result.data.code === '000000') {
                this.props.reset();
                this.setState({
                    lineCode: undefined,
                    outPoint: undefined,
                    outType: undefined
                })
            }
        }).catch(() => {
            message.info('操作失败，请将问题详细反馈给管理员!');
        })
    }
}

export default FirePart;
