import React,{Component} from 'react'
import {Select,DatePicker,Spin,Table} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const {Option}=Select;
class Search extends Component{
    constructor(props){
        super(props); 
    }
    
    render(){
        return(
            <div className={this.props.flag?'searchCell':'hide'}>
                <Select value={this.props.periodCode} style={{width:'120px',marginRight:'10px'}} onChange={this.props.selectChange}>
                        {
                            this.props.staticPeriod?this.props.staticPeriod.map(e=>{
                                return(
                                    <Option key={e.code} name={e.startTime} value={e.code}>{e.name}</Option>
                                )
                            }):null
                        }
                </Select>
                
                <Select
                    showSearch
                    style={{ width: 200 ,marginRight:'10px'}}
                    placeholder="请选择周期开始时间"
                    optionFilterProp="children"
                    onChange={this.props.onChange}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    onSearch={this.props.onSearch}
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value={1}>2017-09-10</Option>
                    <Option value={2}>2011-09-09</Option>
                    <Option value={3}>2013-09-08</Option>
                </Select>
                <NewButton name='确定' handleClick={this.props.search}/>
            </div>
        )
    }
}
export default Search;