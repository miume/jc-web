import React, {Component} from "react";
import {DatePicker, Select, Button, message, Input} from "antd";
import './repoQueryInOutAccount.css'
import NewButton from "../../../BlockQuote/newButton";


class Search extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    render() {
        return (
            <div className="repoQueryInOutAccount_search">
                <Input
                    className="repoQueryInOutAccount_search_input"
                    key="input"
                    placeholder="请输入物料批号"
                    onChange={this.props.getCondition1}
                    value={this.props.condition1}
                />
                <NewButton name="查询" handleClick={this.props.searchEvent}/>
                <Button type={'primary'} onClick={this.props.reset} className={'button'}>
                    <i className="fa fa-repeat" aria-hidden="true"></i>
                    重置
                </Button>
            </div>
        );
    }


}

export default Search;