import React,{Component} from 'react'
import {Select} from 'antd'

const {Option}=Select;
class Search extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let {staticPeriod,periodsChange,periodCode,dateRange,startTime,startTimeChange} = this.props;
        return (
            <div className={this.props.flag?'searchCell':'hide'}>
                <Select value={periodCode} style={{width:'200px',marginRight:'10px'}} onChange={periodsChange}>
                    {
                        staticPeriod ? staticPeriod.map(e => <Option key={e.code} value={e.code}>{e.name}</Option>) : null
                    }
                </Select>

                <Select value={startTime} style={{width:'200px',marginRight:'10px'}} onChange={startTimeChange}>
                    {
                        dateRange ? dateRange.map(e => <Option key={e} value={e}>{e}</Option>) : null
                    }
                </Select>
            </div>
        )
    }
}
export default Search;
