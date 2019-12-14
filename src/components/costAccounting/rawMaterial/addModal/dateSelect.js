import React from 'react';
import {DatePicker, Input,message} from "antd";
import NewButton from "../../../BlockQuote/newButton";
import moment from "moment";
import SelectPeriod from "../select";

class DateSelect extends React.Component {
    constructor(props) {
        super(props);
        this.dateChange =this.dateChange.bind(this);
    }

    render() {
        let {date} = this.props,
            startValue = date === undefined || date === "" ? null : moment(date);
        return (
            <DatePicker placeholder={'请选择出库时间'} value={startValue} format={'YYYY-MM-DD HH:mm:ss'} showTime onChange={this.dateChange}/>
        )
    }

    /**date时间范围变化监控*/
    dateChange(date, dateString) {
        let {index} = this.props;
        this.props.outStockTime(index,dateString);
    }
}

export default DateSelect;
