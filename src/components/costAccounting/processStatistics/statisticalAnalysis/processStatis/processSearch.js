import React,{Component} from 'react'
import {Select,DatePicker,Spin,Table} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const {Option}=Select;
class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            periodCode:1, //选择的周月年默认值
            dateTime:''
        }
        this.search=this.search.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.dateChange=this.dateChange.bind(this);
    }
    selectChange(value){
        this.setState({
            periodCode:value
        })
    }
    dateChange(date,dateString){
        this.setState({
            dateTime:dateString
        })
    }
    search(){
        let {periodCode,dateTime}=this.state
        let params={//将params传给后台
            periodCode:periodCode,
            dateTime:dateTime
        }
    }
    render(){
        return(
            <div className={this.props.flag?'searchCell':'hide'}>
                <Select defaultValue='周' style={{width:'120px',marginRight:'10px'}} onChange={this.selectChange}>
                    <Option value={1}>周</Option>
                    <Option value={2}>月</Option>
                    <Option value={3}>年</Option>
                </Select>
                <DatePicker placeholder='请选择周期开始时间' style={{width:'200px',marginRight:'10px'}} onChange={this.dateChange}/>
                <NewButton name='确定' handleClick={this.search}/>
            </div>
        )
    }
}
export default Search;