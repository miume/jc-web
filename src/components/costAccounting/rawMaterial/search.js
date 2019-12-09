import React from 'react';
import {Button, DatePicker} from "antd";
import NewButton from "../../BlockQuote/newButton";
import moment from "moment";
import SelectPeriod from "./select";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFormat: 'YYYY-MM-DD'
        };
    }

    render() {
        let {startTime, endTime,currentStaticPeriod,staticPeriod,flag} = this.props, {dateFormat} = this.state;
        let startValue = startTime === undefined || startTime === "" ? null : moment(startTime, dateFormat),
            endValue = endTime === undefined || endTime === "" ? null : moment(endTime, dateFormat);
        return (
            <span className={flag?'searchCell':'hide'}>
                <span>开始时间：</span>
                <DatePicker placeholder={"请选择开始日期"} value={startValue} onChange={this.props.startDateChange}/>
                <span style={{padding: '0 5px'}}>~</span>
                <DatePicker placeholder={"请选择开始日期"} value={endValue} onChange={this.props.endDateChange} style={{marginRight: 10}}/>
                <SelectPeriod staticPeriod={staticPeriod} periodCode={currentStaticPeriod ? currentStaticPeriod.code : ''} selectChange={this.props.selectChange}/>
                <NewButton name={'查询'} className={'fa fa-search'} handleClick={this.props.search}/>
                <Button
                    type="primary"
                    onClick={this.props.reset}
                    className='button'
                ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        )
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default Search;
