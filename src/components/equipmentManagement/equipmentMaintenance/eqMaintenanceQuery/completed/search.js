import React from 'react';
import {Button, DatePicker, Input} from 'antd';
import moment from "moment";

class SearchCell extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchInput: '',
            startDate: '',
            endDate: '',
            clickFlag: 1,
            dateFormat: 'YYYY-MM-DD'
        };

        this.getFetch = this.getFetch.bind(this);
        this.handleClickMonth=this.handleClickMonth.bind(this);
        this.handleClickThreeMonth=this.handleClickThreeMonth.bind(this);
        this.handleClickYear=this.handleClickYear.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.searchContentChange=this.searchContentChange.bind(this);
    }

    /**点击最近一月*/
    handleClickMonth() {
        this.props.getTableData({}, 1)
        this.setState({
            clickFlag: 1
        })
    }

    /**点击最近三月*/
    handleClickThreeMonth() {
        this.props.getTableData({}, 3)
        this.setState({
            clickFlag: 3
        })
    }

    /**点击最近一年*/
    handleClickYear() {
        this.props.getTableData({}, 12)
        this.setState({
            clickFlag: 12
        })
    }

    /**时间组件RangePicker时间变化*/
    dateChange(date, dateString) {
        this.setState({
            startDate:dateString[0],
            endDate:dateString[1],
        })
    }

    /**搜索事件*/
    handleSearch() {
        let {startDate, endDate, searchInput} = this.state;
        let params = {};
        if((startDate && endDate) || searchInput){
            params ={
                deptId:parseInt(this.props.deptId),
                condition: searchInput,
                startDate: startDate,
                endDate: endDate,
            };
            this.props.getTableData(params)
        }
}
    searchContentChange(e) {
        this.setState({
            searchInput: e.target.value,
        })
    }

    render(){
        const Search = Input.Search;
        const {  RangePicker } = DatePicker;
        const {startDate, endDate, dateFormat} = this.state;
        const value = startDate === '' || endDate === '' ? null : [moment(startDate,dateFormat), moment(endDate,dateFormat)];
        return(
            <div style={{paddingBottom: '5px'}}>
                <span style={{paddingTop: '7px'}}>&nbsp;&nbsp;默认：&nbsp;&nbsp;&nbsp;</span>

                <Button
                    className={this.state.clickFlag === 1?"bd-blue":"bd-grey"}
                    style={{height:30,marginRight: 5}}
                    onClick={this.handleClickMonth}
                    type="default"
                >最近1月</Button>

                <Button
                    className={this.state.clickFlag === 3?"bd-blue":"bd-grey"}
                    style={{height:30,marginRight: 5}}
                    onClick={this.handleClickThreeMonth}
                    type="default"
                >最近3月</Button>

                <Button
                    className={this.state.clickFlag === 12?"bd-blue":"bd-grey"}
                    style={{height:30,marginRight: 80}}
                    onClick={this.handleClickYear}
                    type="default"
                >最近1年</Button>


                保养时段：<RangePicker style={{width:230}} onChange={this.dateChange} placeholder={['开始时间','结束时间']} value={value}/>&nbsp;&nbsp;

                <Search
                    value={this.state.searchInput}
                    placeholder={this.props.name}
                    onSearch={this.handleSearch}
                    onChange={this.searchContentChange}
                    enterButton
                    style={{ width: 200 }}
                    name='单号/设备名称/编号...'
                />
                <Button
                    type="primary"
                    style={{marginLeft:5,float: 'right'}}
                    onClick={this.getFetch}
                    className='button'
                ><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </div>
        );
    }

    /**重置*/
    getFetch() {
        this.setState({
            searchInput:'',
            startDate:'',
            endDate:''
        });
        this.props.fetch({}, this.state.clickFlag);
    }
}
export default SearchCell;
