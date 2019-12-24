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
            inputValue: ""
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
            url:`${this.props.url.fireInsRegister.getAllInfos}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{

            const res = data.data.data;
            if (res) {
                console.log(res)

            }else{

            }

            message.info(data.data.message);
        }).catch(()=>{
            message.info('删除失败，请联系管理员！');
        });


        const data = [
            {
                "rule": "工序",
                "values": [
                    "JQ",
                    "JH",
                    "HC"
                ],
                "defaultValue": "JQ"
            },
            {
                "rule": "设备号1",
                "values": [
                    "F",
                    "H"
                ],
                "defaultValue": "F"
            },
            {
                "rule": "设备号2",
                "values": [
                    "1",
                    "2",
                ],
                "defaultValue": "1"
            },
            {
                "rule": "产品型号/厂家",
                "values": [
                    "906",
                    "907"
                ],
                "defaultValue": "906"
            },
            {
                "rule": "年",
                "values": [
                    "19",
                    "29"
                ],
                "defaultValue": "19"
            },
            {
                "rule": "月",
                "values": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "defaultValue": "1"
            },
            {
                "rule": "日",
                "values": [
                    "1",
                    "2"
                ],
                "defaultValue": "1"
            },
            {
                "rule": "单元",
                "values": [
                    "F",
                    "G"
                ],
                "defaultValue": "F"
            },
            {
                "rule": "产线",
                "values": [
                    "1",
                    "2"
                ],
                "defaultValue": "1"
            },
            {
                "rule": "流水",
                "values": [
                    "001",
                    "002",
                    "003"
                ],
                "defaultValue": "001"
            }
        ];
        data.push({
            "rule": "自由段",
            "values": [
            ],
            "defaultValue": ""
        })
        data.push({
            "rule": "",
            "values": [
            ],
            "defaultValue": ""
        })
        const batchNumber = [];
        for(let i = 0; i < data.length; i++) {
            batchNumber.push(data[i].defaultValue);
        }

        this.setState({
            data:data,
            batchNumber: batchNumber
        })

        // axios.get(`${this.props.url.productionBatchRule.getAllInfos}`, {}, {
        //     headers:{
        //         'Authorization':this.props.url.Authorization
        //     }
        // }).then((data) => {
        //     let res = data.data.data, batchNumber = [];
        //     if(res && res.length) {
        //         for(let i = 0; i < 7; i++) {
        //             batchNumber.push(res[i].defaultValue);
        //         }
        //     }
        //     this.setState({
        //         data: res.slice(0,7),
        //         batchNumber: batchNumber
        //     })
        // })
    }


    /**渲染批次规则标签*/
    renderSelectLabel = () => {
        let {data} = this.state;
        var index = 0;
        if(data && data.length) {
            return (
                data.map(e =>
                    {
                        if (e.rule === "产品型号/厂家"){
                            index = index + 1
                            return <span key={index} className='addModalTop_batchNumber_span_max'>{e.rule}</span>
                        } else {
                            index = index + 1
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
        if(data && data.length) {
            return (
                data.map( (e, index) =>{
                    if (e.rule === "自由段" || e.rule === ""){
                        if (e.rule==="自由段"){
                            return (
                                <Input key={index} className='addModalTop_batchNumber_input' style={{marginRight: 10}} value={this.state.inputValue} onChange={this.inputChange} placeholder="可空，<6个字符>"/>
                            )
                        }else{
                            return (
                                <span key={index} onClick={this.iconChange} className='addModalTop_batchNumber_add' style={{marginRight: 10}}><Icon style={{fontSize:"30px",color:"green"}} type="plus" /></span>
                            )
                        }
                    } else{
                        return (
                            <Select onChange={this.selectChange} name={e.values} key={index} defaultValue={e.defaultValue}
                                    className='addModalTop_batchNumber_select' style={{marginRight: 10}}>
                                {this.renderOption(e.values,index)}
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
        var col2 = "";
        for (var i=0; i<batchNumber.length; i++){
            col2 = col2 + batchNumber[i];
        }
        col2 = col2 + this.state.inputValue;
        var dataSource = this.props.leftDataSource;
        const col1 = dataSource.length;
        if (col1 === 10){
            message.info("最多一次性选择 10 条数据");
            return
        }

        // 通过调用接口，判断是否被重复，占用
        // TODO
        var col3 = 0;
        var col4 = 0

        dataSource.push({
            col1: col1 + 1,
            col2: col2,
            col3: col3,
            col4: col4
        })

        this.props.leftDataSourceChange(dataSource)


    }
    inputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    /**渲染Option*/
    renderOption = (data,name) => {
        if(data && data.length) {
            return (
                data.map((e,index) =>
                    <Option name={name} key={index} value={e}>{e}</Option>
                )
            )
        }
    }

    /**监控下拉框变化*/
    selectChange = (value, option) => {
        var batchNumber = this.state.batchNumber;
        batchNumber[option.props.name] = value;  //根据name属性修改实时更新batchNumber数组的值
        this.setState({
            batchNumber: batchNumber
        })
    }


}

export default AddModalTop;
