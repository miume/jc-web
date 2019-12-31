import React from 'react';
import {Button, DatePicker, Select} from "antd";
import NewButton from "../../../BlockQuote/newButton";
const {Option} = Select;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.getAllType = this.getAllType.bind(this);
    }

    render() {
        return (
            <div className={'stock-out-application'}>
                <div>
                    <NewButton name={'查询'} className={'fa fa-search'} handleClick={this.search}/>
                    <Button type="primary" style={{margin: "0 10px"}} onClick={this.reset} className='button'><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
                </div>

                <div>
                    <span>出库日期: </span>
                    <DatePicker placeholder={'请选择日期'} onChange={this.dateChange} style={{marginRight: 10}}/>
                </div>

                <div>
                    <span>领用单位: </span>
                    <Select placeholder={'请选择供货单位'} style={{width:200,marginRight: 10}}></Select>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getAllType();
    }

    /**获取所有领用单位*/
    getAllType() {

    }

    dateChange(date, dateString) {
        this.setState({
            date: dateString
        })
    }

    /**搜索事件*/
    search() {

    }

    reset() {

    }

}

export default Search;
