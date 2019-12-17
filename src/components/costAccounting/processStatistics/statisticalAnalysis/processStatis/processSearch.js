import React,{Component} from 'react'
import {Select,DatePicker,Spin,Table} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const {Option}=Select;
class Search extends Component{
    constructor(props){
        super(props); 
    }
    
    render(){
        let time=this.props.time?[...new Set(JSON.parse(JSON.stringify(this.props.time)))]:null //es6数组去重
        return(
            <div className={this.props.flag?'searchCell':'hide'}>
                <Select defaultValue={this.props.periodCode} style={{width:'120px',marginRight:'10px'}} onChange={this.props.selectChange}>
                        {
                            this.props.staticPeriod?this.props.staticPeriod.map(e=>{
                                return(
                                    <Option key={e.code}  value={e.code}>{e.name}</Option>
                                )
                            }):null
                        }
                </Select>
                
                <Select
                    showSearch
                    style={{ width: 200 ,marginRight:'10px'}}
                    placeholder="请选择周期开始时间"
                    // optionFilterProp="children"
                    onChange={this.props.timeChange}
                    onSearch={this.props.onSearch}
                    // filterOption={(input, option) =>
                    // option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                >
                    {
                        time?time.map((data,index)=>{
                            return(
                                <Option key={index} value={data}>{data}</Option>
                            )
                        }):null
                    }
                </Select>
                <NewButton name='确定' handleClick={this.props.confirm}/>
            </div>
        )
    }
}
export default Search;