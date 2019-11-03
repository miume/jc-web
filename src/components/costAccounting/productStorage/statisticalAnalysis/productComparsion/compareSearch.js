import React,{Component} from 'react'
import {Select,DatePicker} from 'antd'
import NewButton from '../../../../BlockQuote/newButton'

const {Option}=Select;
class Search extends Component{//工序对比分析
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={this.props.flag?'statis-processCompare-search':'hide'}>
                
                <Select placeholder='请选择周期类型' style={{width:'150px',marginRight:'10px'}}>
                        <Option value='1'>周</Option>
                        <Option value='2'>月</Option>
                        <Option value='3'>年</Option>
                    </Select>
                    <Select placeholder={this.props.lineFlag?'请选择产线':'请选择过程工序'} style={{width:'150px',marginRight:'10px'}}>
                        <Option value='1'>单晶体配置</Option>
                        <Option value='2'>混合盐配置</Option>
                        <Option value='3'>合成工序</Option>
                        <Option value='4'>陈化工序</Option>
                        <Option value='5'>烘干工序</Option>
                        <Option value='6'>其他</Option>
                    </Select>
                    <DatePicker placeholder='统计时段' style={{width:'150px',marginRight:'10px'}}/>
                    <NewButton name='确定'/>
                
            </div>
        );
    }
}
export default Search