import React from 'react';
import {Button, Input,DatePicker} from 'antd';
import moment from 'moment';
const Search = Input.Search;

class NewSearchCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: undefined,
            start: undefined,
            end: undefined
        };
        this.reset = this.reset.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
    }
    render(){
        let {searchContent,start, end} = this.state, {flag,placeholder} = this.props;
        const {  RangePicker } = DatePicker, dateFormat = 'YYYY-MM-DD';
        const value = start === undefined || end === undefined ? null : [moment(start,dateFormat), moment(end,dateFormat)];
        return (
            <span className={flag?'searchCell':'hide'}>
                <RangePicker onChange={this.dateChange}  placeholder={['开始时间','结束时间']} value={value}/>
                <Search
                     placeholder={placeholder}
                     value={searchContent}
                     onSearch={this.searchEvent}
                     onChange={this.searchContentChange}
                     enterButton
                     style={{ width: 250 , marginLeft: 10}}
                />
                <Button
                    type="primary"
                    style={{marginLeft:10}}
                    onClick={this.reset}
                    className='button'
                ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        );
    }

    /**时间组件RangePicker时间变化*/
    dateChange(date, dateString) {
        this.setState({
            start: dateString[0],
            end: dateString[1],
        })
    }

    /**监控搜索内容变化*/
    searchContentChange(e) {
        let searchContent = e.target.value;
        this.setState({
            searchContent
        })
    }

    /**搜索事件*/
    searchEvent() {
        let {searchContent,start,end} = this.state;
        this.props.searchEvent({
            condition: searchContent,
            start: start ? start +' 00:00:00': undefined,
            end: end ? end +' 23:59:59': undefined
        });
    }

    reset() {
        this.setState({
            searchContent: undefined,
            start: undefined,
            end: undefined
        });
        this.props.reset();
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}
export default NewSearchCell;
