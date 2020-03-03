/**自动获取批次规则*/
import React from 'react';
import axios from 'axios';
import {Button, Input, Modal, Select} from "antd";
import NewButton from "./newButton";
import CancleButton from "./cancleButton";

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
            batchNumber: []
        };
        this.cancel = this.cancel.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.renderOption = this.renderOption.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }

    render() {
        return (
            <span>
                <Button onClick={this.handleClick}>选择批次</Button>
                <Modal title={'批号选择'} visible={this.state.visible} closable={false} maskClosable={false}
                       centered={true} width={700}
                       footer={[
                           <CancleButton key={'cancel'} flag={true} handleCancel={this.cancel}/>,
                           <NewButton key="submit" handleClick={this.handleOk} name='确定' className='fa fa-check' />
                       ]}
                >
                    <div className='batchNumber'>
                        {this.renderSelect()}
                    </div>
                </Modal>
            </span>
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

    cancel() {
        this.setState({
            visible: false
        });
    }

    /**点击确定*/
    handleOk() {
        this.cancel();
        this.props.getBatchNumber(this.state.batchNumber);
    }

    /**渲染select*/
    renderSelect() {
        let {data} = this.state;
        if(data && data.length) {
            return (
                data.map( (e, index) =>{
                    return (
                        <div className={'batchNumber-part'}>
                            <div className='batchNumber-span'>{e.rule}：</div>
                            <Select onChange={this.selectChange} name={e.values} key={index} defaultValue={e.defaultValue}
                                    style={{width: 110, marginRight: 10}}>
                                {this.renderOption(e.values,index)}
                            </Select>
                        </div>
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
