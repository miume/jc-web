import React from 'react';
import {Button, DatePicker} from "antd";
import NewButton from "../../BlockQuote/newButton";
import moment from "moment";

const {RangePicker} = DatePicker;

class Search extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',        //记录日期组件的开始时间和结束时间
            dateFormat: 'YYYY-MM-DD'
        };
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.onChange =this.onChange.bind(this);
    }

    render() {
        const {start, end, dateFormat} = this.state;
        const value = start === undefined || end === undefined || start === "" || end === "" ? null : [moment(start, dateFormat), moment(end, dateFormat)];
        return (
            <span className={this.props.flag?'searchCell':'hide'}>
                <RangePicker placeholder={["开始日期","结束日期"]}  onChange={this.onChange}
                             className={'raw-material-date'} style={{marginRight: 10}}
                             value={value}
                             format={dateFormat}
                />
                <NewButton name={'查询'} className={'fa fa-search'} handleClick={this.search}/>
                <Button
                    type="primary"
                    onClick={this.reset}
                    className='button'
                ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        )
    }

    /**重置事件*/
    reset() {
        this.setState({
            start: '',
            end: '',
        })
    }

    /**date时间范围变化监控*/
    onChange(date, dateString) {
        console.log(date, dateString)
        this.setState({
            start: dateString[0],
            end: dateString[1]
        })
    }

    /**搜索时间*/
    search() {
        let {start, end} = this.state;
        let params = {
            start: start,
            end: end,
        };
        console.log(params)
    }
}

export default Search;
