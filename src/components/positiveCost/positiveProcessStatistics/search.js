import React,{component, Component} from 'react'
import {DatePicker,Select,Button} from 'antd'
import NewButton from '../../BlockQuote/newButton'

const {Option}=Select;
const {RangePicker}=DatePicker;
 class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            beginTime:'',
            endTime:'',
            periodCode:1,//记录下拉框周期类型的value值
        }
        this.reset=this.reset.bind(this);
        this.dateChange=this.dateChange.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.search=this.search.bind(this);
    }
    dateChange(date,dateString){
       // console.log(date,dateString)
        this.setState({
            beginTime:dateString[0],
            endTime:dateString[1]
        })
    }
    selectChange(value){
        //console.log(value)
        this.setState({
            periodCode:value
        })
    }
    search(){
        let {beginTime,endTime,periodCode}=this.state;//es6新语法，解构赋值
        let params={//点击搜索传给后台的值
            beginTime:beginTime,
            endTime:endTime,
            periodCode:periodCode
        }
    }
    reset(){//重置清空搜索框的值
        this.setState({
            beginTime:'',
            endTime:'',
            periodCode:1
        })
    }
    render(){
        return(
            <span className={this.props.flag?'searchCell':'hide'} >
                <RangePicker onChange={this.dateChange} style={{width:'230px',marginRight:'10px'}} placeholder={['开始日期','结束日期']}/>
                    <Select defaultValue='周' style={{width:120,marginRight:'10px'}} onChange={this.selectChange}>
                        <Option key={1} value={1}>周</Option>
                        <Option key={2} value={2}>月</Option>
                        <Option key={3} value={3}>年</Option>
                    </Select>
                    <NewButton name='搜索' className='fa fa-search' handleClick={this.search}/>
                    <Button type='primary'  onClick={this.reset}><i className="fa fa-repeat" aria-hidden="true"></i> 重置</Button>
            </span>
        );
    }
 }
 export default Search