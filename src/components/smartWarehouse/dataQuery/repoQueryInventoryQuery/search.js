import React, {Component} from "react";
import {DatePicker, Select, Button, message} from "antd";
// import NewButton from "../../BlockQuote/newButton";
import './repoQueryInventoryQuery.css'
import NewButton from "../../../BlockQuote/newButton";
import axios from "axios";



const {Option} = Select;
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            condition1:null,
            data1:[],
            data2:[],
            data3:[],
            data4:[],
        };
    }

    componentDidMount = () => {
        this.getData1();
        this.getData4();
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    render() {
        return (
            <div className="repoQueryInventoryQuery_search">
                <span>物料大类：</span>
                <Select
                    className="repoQueryInventoryQuery_search_select"
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
                    className="repoQueryInventoryQuery_search_select"
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
                <span>物料名称：</span>
                <Select
                    className="repoQueryInventoryQuery_search_select"
                    onChange={this.props.getCondition3}
                    value={this.props.condition3}
                    placeholder="请选择物料名称"
                >
                    {
                        this.state.data3?this.state.data3.map(item => {
                            return (
                                <Option
                                    key={item.id} value={item.id}
                                >
                                    {item.materialName}
                                </Option>
                            )
                        }):null
                    }
                </Select>
                <span>供应商：</span>
                <Select
                    className="repoQueryInventoryQuery_search_select"
                    onChange={this.props.getCondition4}
                    value={this.props.condition4}
                    placeholder="请选择供应商"
                >
                    {
                        this.state.data4?this.state.data4.map(item => {
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
        this.getData3(value)


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
    getData3 = (value) => {
        axios({
            url: `${this.props.url.materialInfoSto.getByType}`,
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
                    data3: res
                })
            }else{
                this.setState({
                    data3: []
                })
            }
        })

    }
    getData4 = () => {
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
                    data4: res
                })
            }else{
                this.setState({
                    data4: []
                })
            }
        })

    }

}

export default Search;