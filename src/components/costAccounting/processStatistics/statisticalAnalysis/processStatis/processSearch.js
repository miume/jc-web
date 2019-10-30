import React,{Component} from 'react'
import {Select,DatePicker,Spin,Table} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const {Option}=Select;
class Search extends Component{
    constructor(props){
        super(props)
        this.search=this.search.bind(this);
    }
    search(){

    }
    render(){
        return(
            <div className={this.props.flag?'searchCell':'hide'}>
                <Select defaultValue='周' style={{width:'120px',marginRight:'10px'}}>
                    <Option value='1'>周</Option>
                    <Option value='2'>月</Option>
                    <Option value='3'>年</Option>
                </Select>
                <DatePicker placeholder='请选择周期开始时间' style={{width:'200px',marginRight:'10px'}}/>
                <NewButton name='确定' handleClick={this.search}/>
            </div>
        )
    }
}
export default Search;