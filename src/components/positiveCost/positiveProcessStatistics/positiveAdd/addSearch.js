import React,{Component} from 'react'
import {Select,DatePicker,Button,Tabs} from 'antd'
import NewButton from '../../../BlockQuote/newButton'

const {Option}=Select;

class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Select placeholder='请选择产线' style={{width:'220px',marginRight:'20px'}}>
                    <Option value={1}>H#产线</Option>
                </Select>
                <Select placeholder='请选择周期' style={{width:'220px',marginRight:'20px'}}> 
                    <Option value={1}>周</Option>
                    <Option value={2}>月</Option>
                    <Option value={3}>年</Option>
                </Select>
                <DatePicker placeholder='周期开始时间' style={{width:'220px',marginRight:'20px'}}/>
                <DatePicker placeholder='周期结束时间' style={{width:'220px',marginRight:'20px'}}/>
                <NewButton name='确定' className='fa fa-search'/>
                <Button
                type='primary'><i className='fa fa-repeat'></i> 重置</Button>
            
            </div>
        )
    }
}
export default Search