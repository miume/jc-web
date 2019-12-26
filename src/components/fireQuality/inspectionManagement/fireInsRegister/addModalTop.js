import React from 'react';
import {Icon, Input, message, Select} from "antd";
import "../fireInsRegister/fireInsRegister.css"
import axios from "axios";

const {Option} = Select;


class AddModalTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: [],
            batchNumber: [],
            width: 900,
            inputValue: "",
            processCode: 3,
            productCode: 1,
            batchItems: {
                batch: "",
                checkInTime: "",
                comfirmTime: "",
                day: "",
                delieryPeople: "",
                deptCode: 0,
                detectStatus: "",
                dev1: "",
                dev2: "",
                flag: "",
                line: "",
                month: "",
                other: "",
                process: "",
                product: "",
                stream: "",
                unit: "",
                year: ""
            },
            itemIndex: ["process","dev1","dev2","product","year","month","day","unit","line","stream","other"]
        };

    }

    componentDidMount() {
        this.getRule()
    }

    render() {
        return (
            <div className="addModalTop_scala">
                <div className='addModalTop_batchNumber_div'>{this.renderSelectLabel()}</div>
                <div>{this.renderSelect()}</div>
            </div>
        );
    }

    getRule = () => {
        axios({
            url: `${this.props.url.fireInsRegister.getAllInfos}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            const res = data.data.data;
            if (res) {
                var dataSource = res;
                var batchItems = this.state.batchItems;
                const itemIndex = this.state.itemIndex;
                dataSource.push({
                    "rule": "自由段",
                    "values": [],
                    "defaultValue": "",
                    "codes":[]
                })
                dataSource.push({
                    "rule": "",
                    "values": [],
                    "defaultValue": "",
                    "codes":[]
                })
                const batchNumber = [];
                var processCode = this.state.processCode;
                var productCode = this.state.productCode;
                for (let i = 0; i < dataSource.length; i++) {
                    batchNumber.push(dataSource[i].defaultValue);
                    if (i < dataSource.length - 1){
                        batchItems[itemIndex[i]] = dataSource[i].defaultValue
                    }
                    if (dataSource[i].position === "1") {
                        processCode = dataSource[i].defaultCode
                    }
                    if (dataSource[i].position === "4") {
                        productCode = dataSource[i].defaultCode
                    }

                }
                this.setState({
                    data: dataSource,
                    batchNumber: batchNumber,
                    batchItems: batchItems,
                    processCode: processCode,
                    productCode: productCode
                },() => {
                    this.props.getItem(processCode,productCode)
                })

            } else {
                message.info("规则获取为空，请刷新")
            }
        }).catch(() => {
            message.info('规则获取失败，请联系管理员！');
        });
    }


    /**渲染批次规则标签*/
    renderSelectLabel = () => {
        let {data} = this.state;
        var index = 0;
        if (data && data.length) {
            return (
                data.map(e => {
                        if (e.rule === "产品型号/厂家") {
                            index = index + 1;
                            return <span key={index} className='addModalTop_batchNumber_span_max'>{e.rule}</span>
                        } else {
                            index = index + 1;
                            return <span key={index} className='addModalTop_batchNumber_span'>{e.rule}</span>
                        }
                    }
                )
            )
        }
    }

    /**渲染select*/
    renderSelect = () => {
        let {data} = this.state;
        if (data && data.length) {
            return (
                data.map((e, index) => {
                        if (e.rule === "自由段" || e.rule === "") {
                            if (e.rule === "自由段") {
                                return (
                                    <Input key={index} className='addModalTop_batchNumber_input' style={{marginRight: 10}}
                                           value={this.state.inputValue} onChange={this.inputChange}
                                           placeholder="可空，<6个字符>"/>
                                )
                            } else {
                                return (
                                    <span key={index} onClick={this.iconChange} className='addModalTop_batchNumber_add'
                                          style={{marginRight: 10}}><Icon style={{fontSize: "30px", color: "green"}}
                                                                          type="plus"/></span>
                                )
                            }
                        } else {
                            return (
                                <Select onChange={this.selectChange} key={index}
                                        defaultValue={e.defaultValue}
                                        className='addModalTop_batchNumber_select' style={{marginRight: 10}}>
                                    {this.renderOption(e.values, index,e.codes)}
                                </Select>
                            )
                        }
                    }
                )
            )
        }
    }

    iconChange = () => {
        const batchNumber = this.state.batchNumber;
        var batchItems = this.state.batchItems
        var col2 = "";
        for (var i = 0; i < batchNumber.length; i++) {
            col2 = col2 + batchNumber[i];
        }
        col2 = col2 + this.state.inputValue;
        batchItems["other"] = this.state.inputValue;
        batchItems["batch"] = col2;

        var dataSource = this.props.leftDataSource;
        const col1 = dataSource.length;
        if (col1 === 10) {
            message.info("最多一次性选择 10 条数据");
            return
        }

        // 前端控制，不能加一样的数据
        for (var i = 0; i < dataSource.length; i++) {
            if (dataSource[i].col2 === col2) {
                message.info("该批号重复");
                return
            }
        }


        // 通过调用接口，判断是否被重复，占用
        axios({
            url:`${this.props.url.fireInsRegister.check}?batch=${col2}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            var flag = 0;
            if (res) {
                dataSource.push({
                    col1: col1 + 1,
                    col2: col2,
                    col3: 0,
                    col4: 1
                });
                flag = 1
            }else{
                dataSource.push({
                    col1: col1 + 1,
                    col2: col2,
                    col3: 1,
                    col4: 0
                })
                flag = 0
            }
            this.props.leftDataSourceChange(dataSource,batchItems,flag)
            message.info(data.data.message);
        }).catch(()=>{
            message.info('批号重复检测失败，请联系管理员！');
        });
    }
    inputChange = (e) => {
        this.setState({
            inputValue: e.target.value,
        })
    }

    /**渲染Option*/
    renderOption = (data, ruleIndex, code) => {
        if (data && data.length) {
            return (
                data.map((e, index) =>
                    <Option name={code[index]}  key={index} value={e + "-" + ruleIndex}>{e}</Option>
                )
            )
        }
    }

    /**监控下拉框变化*/
    selectChange = (data, option) => {
        const code = option.props.name;

        const index = parseInt(data.split("-")[1]);
        const value = data.split("-")[0]
        var batchNumber = this.state.batchNumber;
        var batchItems = this.state.batchItems;
        const itemIndex = this.state.itemIndex;

        batchNumber[index] = value;  //根据name属性修改实时更新batchNumber数组的值
        batchItems[itemIndex[index]] = value;

        var processCode = this.state.processCode;
        var productCode = this.state.productCode;
        // 若为工序 或者 产品型号 的修改，则返回code
        if (index === 0 || index === 3){
            if (index === 0){
                processCode = code;
                this.props.getItem(code,this.state.productCode)
            }else{
                productCode = code;
                this.props.getItem(this.state.processCode,code)
            }
        }

        this.setState({
            batchNumber: batchNumber,
            batchItems: batchItems,
            processCode: processCode,
            productCode: productCode
        })
    }
}

export default AddModalTop;
