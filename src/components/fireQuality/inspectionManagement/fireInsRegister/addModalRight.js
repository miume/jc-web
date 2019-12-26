import React from 'react';
import {Checkbox, Divider, Col, Select, Input, message} from "antd";

import "../fireInsRegister/fireInsRegister.css"
import axios from "axios";


const {Option} = Select;
class AddModalRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectList: [],
            selectDefaultValue: ""
        };

    }

    componentDidMount() {
        this.getSelect();
    }

    render() {
        return (
            <div className="addModalRight_scala">
                <div className="addModalRight_top">
                    <span className="addModalRight_top_span">检验项目选择：</span>
                    <div style={{borderBottom: '1px solid #E9E9E9'}}>
                        <Checkbox
                            indeterminate={this.props.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.props.checkAll}
                        >
                            全选/全不选
                        </Checkbox>
                    </div>
                </div>
                <Divider className="addModalRight_top_divider"/>
                <div className="addModalRight_middle">
                    <Checkbox.Group className="addModalRight_middle_checkbox"
                                    onChange={this.onChange}
                                    value={this.props.checkedList}
                    >
                        {
                            this.props.plainOptions ? this.props.plainOptions.map(p =>
                                <Col key={p.code} span={8}>
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


    /**
     * 部门相关
     */
    getSelect = () => {
        axios({
            url:`${this.props.url.fireInsRegister.getAllDepts}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            if (res) {
                var dataSource = res;
                this.setState({
                    selectList:dataSource,
                    selectDefaultValue: dataSource.length>0?dataSource[0].code:null
                },() => {
                    this.props.getDeptCode(dataSource.length>0?dataSource[0].code:0)
                })

            }else{
                message.info("检验部门获取为空，请刷新")
            }
        }).catch(()=>{
            message.info('检测部门获取失败，请联系管理员！');
        });
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
        if(selectList && selectList.length) {
            return (
                selectList.map((e) =>
                    <Option name={e.deptName} key={e.code} value={e.code}>{e.deptName}</Option>
                )
            )
        }
    }
    /**监控下拉框变化*/
    selectChange = (value) => {
        this.props.getDeptCode(value)
    }

    /**
     * 送检人相关
     * @param e
     */
    inputChange = (e) => {
        this.props.getUsername(e.target.value)
    }

    /**
     * 检测项目相关
     */
    onChange = checkedList => {
        const plainOptions = this.props.plainOptions;
        this.props.getCheckedList(checkedList)
        this.props.getCheckAll(checkedList.length === plainOptions.length)
        this.props.getIndeterminate(!!checkedList.length && checkedList.length < plainOptions.length)
    };
    onCheckAllChange = e => {
        const plainOptions = this.props.plainOptions;
        var checkedList = []
        for (var i = 0; i < plainOptions.length; i++) {
            checkedList.push(plainOptions[i].code)

        }
        this.props.getCheckedList(e.target.checked ? checkedList : [])
        this.props.getCheckAll(e.target.checked)
        this.props.getIndeterminate(false)
    }

}

export default AddModalRight;
