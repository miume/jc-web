/**
 * ahthor: ym
 *  date: 2019-11-12
 *  s设置标准（原材料标准，成品标准）
 * */
import React from 'react';
import {Button, Modal, Select, message, InputNumber} from "antd";
import CancleButton from "../BlockQuote/cancleButton";
import NewButton from '../BlockQuote/newButton';

const {Option} = Select;

const GREATER_OR_EQUAL_TO = '≥', GREATER = '>',
    LESS_THAN_OR_EQUAL_TO = '≤', LESS_THAN = '<',
    BETWEEN = '~', RANGE = '±';

class Standard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            symbol: GREATER_OR_EQUAL_TO,
            upperLimit: '',
            lowerLimit: '',
            value: ''
        };
        this.handleOk = this.handleOk.bind(this);
        this.formatter = this.formatter.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.renderRange = this.renderRange.bind(this);
        this.upperLimitChange = this.upperLimitChange.bind(this);
        this.lowerLimitChange = this.lowerLimitChange.bind(this);
    }

    render() {
        let {symbol, visible,upperLimit,lowerLimit,value} = this.state, {defaultValue} = this.props;
        let standardRange = {
            margin: '30px 0 10px 0',
        }, standardSymbol = {
            display: 'inline-block',
            width: '90px',
            textAlign: 'center'
        };
        return (
            <span>
                <Button onClick={this.handleClick} style={{width: '100%',height: 30,textAlign: 'left'}}>{value ? value : defaultValue}</Button>
                <Modal visible={visible} closable={false} centered={true}
                       title={'设置检测标准'}
                       footer={[
                           <CancleButton key='back' handleCancel={this.handleCancel} flag={true}/>,
                           <NewButton key="submit" handleClick={this.handleOk} name='确定' style='button' className='fa fa-check' />
                       ]}>
                    <div>
                        <div>
                            <span style={standardSymbol}>请选择符号：</span>
                            <Select value={symbol} onChange={this.selectChange} style={{width: 110, height: 30}}>
                                <Option value={GREATER_OR_EQUAL_TO}>{GREATER_OR_EQUAL_TO}</Option>
                                <Option value={LESS_THAN_OR_EQUAL_TO}>{LESS_THAN_OR_EQUAL_TO}</Option>
                                <Option value={GREATER}>{GREATER}</Option>
                                <Option value={LESS_THAN}>{LESS_THAN}</Option>
                                <Option value={RANGE}>{RANGE}</Option>
                                <Option value={BETWEEN}>{BETWEEN}</Option>
                            </Select>
                        </div>
                        {
                            this.renderRange(symbol,standardRange,standardSymbol,upperLimit,lowerLimit)
                        }
                    </div>
                </Modal>
            </span>
        )
    }

    /**点击请选择标准*/
    handleClick() {
        let {record} = this.props,{symbol,upperLimit,lowerLimit,value} = this.state;
        value = record.value || record.count ? record.value || record.count : '';
        if(value) {
            if(value[0] === GREATER_OR_EQUAL_TO || value[0] === GREATER) {
                symbol = value[0];
                lowerLimit = value.slice(1);
            } else if(value[0] === LESS_THAN_OR_EQUAL_TO || value[0] === LESS_THAN) {
                symbol = value[0];
                upperLimit = value.slice(1);
            } else if(value.indexOf(RANGE) > -1) {
                let index = value.indexOf(RANGE);
                symbol = value[index];
                lowerLimit = value.slice(0,index);
                upperLimit = value.slice(index + 1);
            } else {
                let index = value.indexOf(BETWEEN);
                symbol = value[index];
                lowerLimit = value.slice(0,index);
                upperLimit = value.slice(index + 1);
            }
        }
        this.setState({
            visible: true,
            symbol: symbol,
            index: record.index,
            lowerLimit: lowerLimit,
            upperLimit: upperLimit,
            value: value
        })
    }

    /**点击取消按钮*/
    handleCancel() {
        this.setState({
            visible: false,
            value: '',
            upperLimit: '',
            lowerLimit: '',
        })
    }

    /**点击确定按钮*/
    handleOk() {
        let {symbol,upperLimit,lowerLimit,index} = this.state, value = '';
        if(symbol === '≥' || symbol === '>') {
            if(!lowerLimit) {
                message.info('请输入下限值！');
                return
            }
            value = symbol + lowerLimit;
        } else if (symbol === '≤' || symbol === '<') {
            value = symbol + upperLimit;
            if(!upperLimit) {
                message.info('请输入上限值！');
                return
            }
        } else {
            if(!upperLimit || !lowerLimit) {
                message.info('请输入上限值和下限值！');
                return
            }
            if(symbol === '~') {
                if(parseFloat(upperLimit)  <= parseFloat(lowerLimit)) {
                    message.info('上限值不能小于下限值！');
                    return
                }
            }
            value = lowerLimit + symbol + upperLimit;
        }
        this.setState({
            value: value,
            visible: false
        });
        this.props.standardChange(index,value); //通过回调函数更新父组件的值
    }

    /**点击切换符号*/
    selectChange(value) {
        this.setState({
            symbol: value
        })
    }

    /**监控input框的变化*/
    upperLimitChange(value) {
        this.setState({
            upperLimit: value
        })
    }

    lowerLimitChange(value) {
        this.setState({
            lowerLimit: value
        })
    }

    /**格式化数字*/
    formatter(value) {
        if(typeof value === 'number') value = value.toString();
        return value.replace(/[^\d\.]/g, "")
    }

    /**根据选择符号，来渲染*/
    renderRange(symbol,standardRange,standardSymbol,upperLimit,lowerLimit) {
        if(symbol === '≥' || symbol === '>') {
            return (
                <div style={standardRange}>
                    <span style={standardSymbol}>{symbol}</span>
                    <InputNumber style={{width: 110}} value={lowerLimit} placeholder={'请输入下限值'}
                                 onChange={this.lowerLimitChange} formatter={this.formatter}/>
                </div>
            )
        } else if (symbol === '≤' || symbol === '<') {
            return (
                <div style={standardRange}>
                    <span style={standardSymbol}>{symbol}</span>
                    <InputNumber style={{width: 110}} value={upperLimit} placeholder={'请输入上限值'}
                                 onChange={this.upperLimitChange} formatter={this.formatter}/>
                </div>
            )
        } else if (symbol === '~') {
            return (
                <div style={standardRange}>
                    <InputNumber style={{width: 110}} value={lowerLimit} placeholder={'请输入下限值'}
                                 onChange={this.lowerLimitChange} formatter={this.formatter}/>
                    <span style={standardSymbol}>{symbol}</span>
                    <InputNumber style={{width: 110}} value={upperLimit} placeholder={'请输入上限值'}
                                 onChange={this.upperLimitChange} formatter={this.formatter}/>
                </div>
            )
        } else {
            return (
                <div style={standardRange}>
                    <InputNumber style={{width: 110}} value={lowerLimit} placeholder={'请输入固定值'}
                                 onChange={this.lowerLimitChange} formatter={this.formatter}/>
                    <span style={standardSymbol}>{symbol}</span>
                    <InputNumber style={{width: 110}} value={upperLimit} placeholder={'请输入精度值'}
                                 onChange={this.upperLimitChange} formatter={this.formatter}/>
                </div>
            )
        }
    }
}

export default Standard;
