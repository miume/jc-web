import React from 'react';
import {Button, DatePicker, Select} from 'antd';
import moment from "moment";
const {Option} = Select;

class SearchCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null
        };
        this.reset = this.reset.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }
    render() {
        let {date,departmentId,productionLine,product} = this.state, {flag,departmentData,productionData,productData} = this.props;
        return (
            <span className={flag?'searchCell':'hide'}>
                送检部门：
                <Select value={departmentId} style={{ width: 150,marginRight: '10px'}} placeholder={'请选择送检部门'} onChange={this.selectChange}>
                    {
                        departmentData ? departmentData.map(e => <Option key={e.code} value={e.code} name={'departmentId'}>{e.name}</Option>) : null
                    }
                </Select>
                工序：
                <Select value={productionLine} style={{ width: 150,marginRight: '10px'}} placeholder={'请选择工序'} onChange={this.selectChange}>
                    {
                        productionData ? productionData.map(e => <Option key={e.code} value={e.code} name={'productionLine'}>{e.name}</Option>) : null
                    }
                </Select>
                产品：
                <Select value={product} style={{ width: 150,marginRight: '10px'}} placeholder={'请选择产品'} onChange={this.selectChange}>
                    {
                        productData ? productData.map(e => <Option key={e.code} value={e.code} name={'product'}>{e.name}</Option>) : null
                    }
                </Select>
                 <DatePicker placeholder={'请选择时间'} style={{width:200}} value={date ? moment(date) : null} onChange={this.dateChange}/>
                 <Button type="primary" icon="search" className='time-search' onClick={this.searchEvent}></Button>

                <Button type="primary" style={{marginLeft:10}} onClick={this.reset} className='button'><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        );
    }

    /**监控搜索内容变化*/
    dateChange(date,dateString) {
        this.setState({
            date: dateString
        })
    }

    /**统一监控下拉框的变化*/
    selectChange(value,option) {
        let name = option.props.name;
        this.setState({
            [name]: value
        })
    }

    /**搜索事件*/
    searchEvent() {
        let {departmentId, productionLine, product, date} = this.state,
            params = {
                date,
                product,
                departmentId,
                productionLine,
            };
        this.props.searchEvent(params);
    }

    reset() {
        this.setState({
            date: null,
            product: undefined,
            departmentId: undefined,
            productionLine: undefined
        });
        this.props.reset();
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}
export default SearchCell;
