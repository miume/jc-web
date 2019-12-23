import React from 'react';
import {Checkbox, Divider, Col, Select, Input} from "antd";

import "../fireInsRegister/fireInsRegister.css"


const {Option} = Select;
class AddModalRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plainOptions: [],
            indeterminate: true,
            checkAll: false,
            checkedList: [], // 选中的列表
            selectList: [],
            selectDefaultValue: ""
        };

    }

    componentDidMount() {
        this.getItem();
        this.getSelect();
    }

    render() {
        return (
            <div className="addModalRight_scala">
                <div className="addModalRight_top">
                    <span className="addModalRight_top_span">检验项目选择：</span>
                    <div style={{borderBottom: '1px solid #E9E9E9'}}>
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            全选/全不选
                        </Checkbox>
                    </div>
                </div>
                <Divider className="addModalRight_top_divider"/>
                <div className="addModalRight_middle">
                    <Checkbox.Group className="addModalRight_middle_checkbox"
                                    onChange={this.onChange}
                                    value={this.state.checkedList}
                    >
                        {
                            this.state.plainOptions ? this.state.plainOptions.map(p =>
                                <Col key={p.code} span={4}>
                                    <Checkbox value={p.code}>{p.name}</Checkbox>
                                </Col>
                            ) : null
                        }
                    </Checkbox.Group>
                </div>
                <div className="addModalRight_down">
                    <span className="addModalRight_down_span">送检部门：</span>
                    {this.renderSelect()}
                    <span className="addModalRight_down_span">送检人：</span>
                    <Input key="input" value={this.props.username} placeholder="请输入送检人名字" onChange={this.inputChange} className="addModalRight_down_input"/>

                </div>
            </div>
        );
    }

    getSelect = () => {
        var selectList = [];
        for (var i = 0; i < 10; i++) {
            selectList.push({
                code: i,
                name: `test-${i+1}`
            })

        }
        this.setState({
            selectList:selectList,
            selectDefaultValue: selectList.length>0?selectList[0].code:null
        })
    }
    /**渲染select*/
    renderSelect = () => {
        const selectList = this.state.selectList;
        if(selectList && selectList.length) {
            return (
                <Select onChange={this.selectChange} defaultValue={this.state.selectDefaultValue}
                        style={{marginRight: 10}} className="addModalRight_down_select">
                    {this.renderOption(selectList)}
                </Select>
            )
        }
    }
    /**渲染Option*/
    renderOption = (selectList) => {
        console.log(selectList)
        if(selectList && selectList.length) {
            return (
                selectList.map((e,index) =>
                    <Option name={e.name} key={e.code} value={e.code}>{e.name}</Option>
                )
            )
        }
    }
    /**监控下拉框变化*/
    selectChange = (value, option) => {
        this.props.getDeptCode(value)
    }


    inputChange = (e) => {
        this.props.getUsername(e.target.value)
    }

    getItem = () => {
        var plainOptions = [];
        var checkedList = []
        for (var i = 0; i < 200; i++) {
            plainOptions.push({
                code: i,
                name: `Ca${i + 1}`
            })
            checkedList.push(i)
        }
        this.setState({
            plainOptions: plainOptions,
            checkedList: checkedList
        }, () => {
            this.props.getCheckedList(checkedList)
        })
    }

    onChange = checkedList => {
        const plainOptions = this.state.plainOptions;
        this.setState({
            checkedList: checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        }, () => {
            this.props.getCheckedList(checkedList)
        });
    };
    onCheckAllChange = e => {
        const plainOptions = this.state.plainOptions;
        var checkedList = []
        for (var i = 0; i < plainOptions.length; i++) {
            checkedList.push(plainOptions[i].code)

        }
        this.setState({
            checkedList: e.target.checked ? checkedList : [],
            indeterminate: false,
            checkAll: e.target.checked,
        }, () => {
            this.props.getCheckedList(e.target.checked ? checkedList : [])
        });
    }

}

export default AddModalRight;
