import React, {Component} from "react";
import {DatePicker, Select, Button, message} from "antd";
import './repoQueryInOutDaily.css'
import NewButton from "../../../BlockQuote/newButton";
import axios from "axios";
import moment from "moment";


const {Option} = Select;
const {  RangePicker } = DatePicker;
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1:[],
            data2:[],
            data3:[],
            dateFormat: 'YYYY-MM-DD'
        };
    }

    componentDidMount = () => {
        this.getData1();
        // this.getData2();
        this.getData3();
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    render() {
        const value = this.props.condition4 === undefined || this.props.condition5 === undefined || this.props.condition4 === "" || this.props.condition5 === "" ? null : [moment(this.props.condition4, this.state.dateFormat), moment(this.props.condition5, this.state.dateFormat)];
        return (
            <div className="repoQueryOutDaily_search">
                <span>物料大类：</span>
                <Select
                    className="repoQueryOutDaily_search_select"
                    onChange={this.selectTypeName}
                    value={this.props.condition1}
                    placeholder="请选择物料大类"
                >
                    {
                        this.state.data1?this.state.data1.map(item => {
                            return (
                                <Option
                                    key={item.id} value={item.id}
                                >
                                    {item.typeName}
                                </Option>
                            )
                        }):null
                    }
                </Select>
                <span>物料小类：</span>
                <Select
                    className="repoQueryOutDaily_search_select"
                    onChange={this.props.getCondition2}
                    value={this.props.condition2}
                    placeholder="请选择物料小类"
                >
                    {
                        this.state.data2?this.state.data2.map(item => {
                            return (
                                <Option
                                    key={item.id} value={item.id}
                                >
                                    {item.subTypeName}
                                </Option>
                            )
                        }):null
                    }
                </Select>
                <span>供货单位：</span>
                <Select
                    className="repoQueryOutDaily_search_select"
                    onChange={this.props.getCondition3}
                    value={this.props.condition3}
                    placeholder="请选择供货单位"
                >
                    {
                        this.state.data3?this.state.data3.map(item => {
                            return (
                                <Option
                                    key={item.id} value={item.id}
                                >
                                    {item.materialSupplierName}
                                </Option>
                            )
                        }):null
                    }
                </Select>
                <span>入库日期：</span>
                <RangePicker
                    placeholder={["开始日期","结束日期"]}
                    onChange={this.props.getCondition4and5}
                    className="repoQueryInDaily_search_date"
                    value={value}
                    format={this.state.dateFormat}
                />
                <NewButton name="查询" handleClick={this.props.searchEvent}/>
                <Button type={'primary'} onClick={this.props.reset} className={'button'}>
                    <i className="fa fa-repeat" aria-hidden="true"></i>
                    重置
                </Button>
            </div>
        );
    }

    getData1 = () => {
        axios({
            url: `${this.props.url.material.getAll}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    data1: res
                })
            }else{
                this.setState({
                    data1: []
                })
            }
        })

    }
    selectTypeName = (value,option) => {

        this.props.getCondition1(value);
        this.getData2(value);
        //this.getData3(value)


        this.setState({
            condition1: value,
        })
    }
    getData2 = (value) => {
        axios({
            url: `${this.props.url.subMaterial.getByType}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                type: parseInt(value)
            },
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    data2: res
                })
            }else{
                this.setState({
                    data2: []
                })
            }
        })

    }
    getData3 = () => {
        axios({
            url: `${this.props.url.supplier.getAll}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.setState({
                    data3: res
                })
            }else{
                this.setState({
                    data3: []
                })
            }
        })

    }

}

export default Search;