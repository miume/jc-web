import React,{component, Component} from 'react'
import {DatePicker,Select,Button} from 'antd'
import NewButton from '../../BlockQuote/newButton'

const {Option}=Select;
const {RangePicker}=DatePicker;
 class Search extends Component{
    constructor(props){
        super(props)
        this.reset=this.reset.bind(this);
        this.dateChange=this.dateChange.bind(this);
    }
    dateChange(){
        
    }
    reset(){

    }
    render(){
        return(
            <span className={this.props.flag?'searchCell':'hide'} >
                <RangePicker onChange={this.dateChange} style={{width:'230px',marginRight:'10px'}} placeholder={['开始日期','结束日期']}/>
                    <Select defaultValue='周' style={{width:120,marginRight:'10px'}}>
                        <Option key='周' value='周'>周</Option>
                        <Option key='月' value='月'>月</Option>
                        <Option key='年' value='年'>年</Option>
                    </Select>
                    <NewButton name='搜索' className='fa fa-search' />
                    <Button type='primary'  onClick={this.reset}><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        );
    }
 }
 export default Search