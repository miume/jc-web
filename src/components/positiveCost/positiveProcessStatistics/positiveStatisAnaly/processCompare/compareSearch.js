import React,{Component} from 'react'
import {Select,DatePicker} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'
import locale from 'antd/es/date-picker/locale/zh_CN';
const {Option}=Select
const {RangePicker}=DatePicker
 class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {line}=this.props
        return(
            <div style={{textAlign:'center',marginTop:'20px'}}>
                <Select  onChange={this.props.selectChange} style={{width:'180px',marginRight:'10px'}} placeholder='请选择周期类型'>
                    {
                        this.props.staticPeriod?this.props.staticPeriod.map(item=>{
                            return(
                                <Option key={item.code} name='periodCode' value={item.code}>{item.name}</Option>
                            )
                        }):null
                    }
                </Select>
                <RangePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" locale={locale}
                     placeholder={['开始时间','结束时间']} style={{width:350,marginRight:'10px'}} onChange={this.props.timeChange}></RangePicker>
                
                <span  className={this.props.flag?'':'hide'}>
                    <Select  onChange={this.props.selectChange} style={{width:'180px',marginRight:'10px'}} placeholder='请选择产线'>
                        {
                            this.props.line?this.props.line.map(item=>{
                                return(
                                    <Option key={item.code} name='lineCode' value={item.code}>{item.name}</Option>
                                )
                            }):null
                        }
                    </Select>
                </span>
               <span> 
                    {
                        !this.props.flag?
                            <Select  placeholder={'请选择数据类型'}  style={{width:180,marginRight:'10px'}}  onChange={this.props.selectChange}> 
                                <Option value={0} name='dataFlag'>原料重量</Option>
                                <Option value={1} name='dataFlag'>原料结存</Option>
                                <Option value={2} name='dataFlag'>前端在制品</Option>
                                <Option value={3} name='dataFlag'>后端在制品</Option>
                                <Option value={4} name='dataFlag'>产品重量</Option>
                            </Select>
                            : 
                            <Select  placeholder={'请选择分析类型'}  style={{width:180,marginRight:'10px'}}  onChange={this.props.selectChange}>
                                
                                    <Option value={0} name='flag'>进料量</Option>
                                    <Option value={1} name='flag'>消耗量</Option>
                                    <Option value={2} name='flag'>结存量</Option>
                            
                            </Select>
                    }
                   
               </span>
               <span className={this.props.dataFlag===0||this.props.dataFlag===1?'':'hide'}> 
                   <Select style={{width:180,marginRight:'10px'}} placeholder={'请选择物料类型'} onChange={this.props.selectChange}>
                        <Option value={1} name='materialFlag'>前驱体</Option>
                        <Option value={2} name='materialFlag'>碳酸锂</Option>
                   </Select>
                </span>
                <NewButton name='确定' handleClick={this.props.handleConfirm}/>
            </div>
        )
    }
 }
 export default Search