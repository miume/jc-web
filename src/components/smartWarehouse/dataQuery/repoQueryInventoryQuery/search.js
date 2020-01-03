import React, {Component} from "react";
import {DatePicker, Select, Button, message} from "antd";
// import NewButton from "../../BlockQuote/newButton";
import './repoQueryInventoryQuery.css'
import NewButton from "../../../BlockQuote/newButton";


var data1 = []
var data2 = []
var data3 = []
var data4 = []

for (var i = 0; i < 10; i++) {
    data1.push({
        code: i+1,
        name: `大类${i}`
    })
    data2.push({
        code: i+1,
        name: `小类${i}`
    })
    data3.push({
        code: i+1,
        name: `2019011${i}`
    })
    data4.push({
        code: i+1,
        name: `2019011${i}`
    })
}

const {Option} = Select;
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1:[],
            data2:[],
            data3:[],
            data4:[],
        };
    }

    componentDidMount = () => {
        this.getData1();
        this.getData2();
        this.getData3();
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
                    onChange={this.props.getCondition1}
                    value={this.props.condition1}
                >
                    {
                        this.state.data1?this.state.data1.map(item => {
                            return (
                                <Option
                                    key={item.code} value={item.code}
                                >
                                    {item.name}
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
                >
                    {
                        this.state.data2?this.state.data2.map(item => {
                            return (
                                <Option
                                    key={item.code} value={item.code}
                                >
                                    {item.name}
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
                >
                    {
                        this.state.data3?this.state.data3.map(item => {
                            return (
                                <Option
                                    key={item.code} value={item.code}
                                >
                                    {item.name}
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
                >
                    {
                        this.state.data4?this.state.data4.map(item => {
                            return (
                                <Option
                                    key={item.code} value={item.code}
                                >
                                    {item.name}
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
        this.setState({
            data1:data1
        })

    }
    getData2 = () => {
        this.setState({
            data2:data2
        })

    }
    getData3 = () => {
        this.setState({
            data3:data3
        })

    }
    getData4 = () => {
        this.setState({
            data4:data4
        })

    }

}

export default Search;