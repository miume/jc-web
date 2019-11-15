import React,{Component} from 'react'
import {Select,DatePicker} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
const {Option}=Select
 class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='searchCell'>
                <Select value={1} style={{width:'120px',marginRight:'10px'}}>
                    <Option value={1}>日</Option>
                </Select>
                <Select 
                    style={{width:'120px',marginRight:'10px'}}
                    placeholder='请选择时间'
                    showSearch 
                    optionFilterProp="children"  
                    onChange={this.props.onChange}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    onSearch={this.props.onSearch}
                    filterOption={(input, option) =>
                        // console.log(input,option)
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value={1}>2019-09-08</Option>
                    <Option value={2}>2017-09-08</Option>
                    <Option value={3}>2016-09-08</Option>
                </Select>
                <span className={this.props.lineFlag?'':'hide'}>
                    <Select style={{width:'120px',marginRight:'10px'}} placeholder='请选择产线'>
                        
                    </Select>
                </span>
                <NewButton name='确定'/>
            </div>
        )
    }
 }
 export default Search