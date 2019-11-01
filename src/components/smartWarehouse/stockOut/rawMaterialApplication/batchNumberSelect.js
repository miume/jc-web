/**自动获取批次规则*/
import React from 'react';
import axios from 'axios';
import {Button, Modal, Select} from "antd";
import NewButton from "../../../BlockQuote/newButton";

const {Option} = Select;

class BatchNumberSelect extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: [],
            batchNumber: [],
            width: 900
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.renderOption = this.renderOption.bind(this);
        this.renderSelectLabel = this.renderSelectLabel.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }

    render() {
        return (
            <div style={{marginBottom: 10}}>
                <Button onClick={this.handleClick}>批号选择</Button>
                <span style={{marginLeft: 10}}>{this.props.batchNumber}</span>
                <Modal title={'批号选择'} visible={this.state.visible} closable={false} maskClosable={false}
                       centered={true} width={this.state.width}
                       footer={[
                           <NewButton key="submit" handleClick={this.handleOk} name='确定' className='fa fa-check' />
                       ]}
                >
                    <div className='batchNumber'>
                        <div className='batchNumber-div'>{this.renderSelectLabel()}</div>
                        <div>{this.renderSelect()}</div>
                    </div>
                </Modal>
            </div>
        )
    }

    /**点击批号选择*/
    handleClick() {
        this.setState({
            visible: true
        })
        axios.get(`${this.props.url.productionBatchRule.getAllInfos}`, {}, {
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data, batchNumber = [];
            if(res && res.length) {
                for(let i = 0; i < 7; i++) {
                    batchNumber.push(res[i].defaultValue);
                }
            }
            this.setState({
                data: res.slice(0,7),
                batchNumber: batchNumber
            })
        })
    }

    /**点击确定*/
    handleOk() {
        this.setState({
            visible: false
        })
        this.props.getBatchNumber(this.state.batchNumber);
    }

    /**渲染批次规则标签*/
    renderSelectLabel() {
        let {data} = this.state;
        if(data && data.length) {
            return (
                data.map(e =>
                    <span className='batchNumber-span'>{e.rule}</span>
                )
            )
        }
    }

    /**渲染select*/
    renderSelect() {
        let {data} = this.state;
        if(data && data.length) {
            return (
                data.map( (e, index) =>{
                    return (
                        <Select onChange={this.selectChange} name={e.values} key={index} defaultValue={e.defaultValue}
                                className='batchNumber-select' style={{marginRight: 10}}>
                            {this.renderOption(e.values,index)}
                        </Select>
                    )
                }
                 )
            )
        }
    }

    /**渲染Option*/
    renderOption(data,name) {
        if(data && data.length) {
            return (
                data.map((e,index) =>
                    <Option name={name} key={index} value={e}>{e}</Option>
                )
            )
        }
    }

    /**监控下拉框变化*/
    selectChange (value, option) {
        let {batchNumber} = this.state;
        batchNumber[option.props.name] = value;  //根据name属性修改实时更新batchNumber数组的值
        this.setState({
            batchNumber: batchNumber
        })
    }
}

export default BatchNumberSelect;
