import React,{Component} from 'react'
import {Table} from 'antd'
import Search from './statisSearch'
class PositiveProcess extends Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.columns=[{
            title:'序号',
            key:'index',
            dataIndex:'index'
        },{
            title:'周期类型',
            key:'period',
            dataIndex:''
        },{
            title:'开始时间',
            key:'startTime',
            dataIndex:''
        },{
            title:'结束时间',
            key:'endTime',
            dataIndex:''
        },{
            title:'工序名称',
            key:'processName',
            dataIndex:'processName'
        },{
            title:'投入(kg)',
            key:'materialWeight',
            dataIndex:'materialWeight'
        },{
            title:'消耗(kg)',
            key:'processWeight',
            dataIndex:'processWeight'
        },{
            title:'结存(kg)',
            key:'productWeight',
            dataIndex:'productWeight'
        }]
        this.onBlur=this.onBlur.bind(this)
        this.onChange=this.onChange.bind(this)
        this.onFocus=this.onFocus.bind(this)
        this.onSearch=this.onSearch.bind(this)
    }
    onChange(value) {
        console.log(`selected ${value}`);
      }
      
    onBlur() {
        console.log('blur');
      }
      
    onFocus() {
        console.log('focus');
      }
      
    onSearch(val) {
        console.log('search:', val);
      }
    render(){
        return(
            <div>
                <Search onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} onSearch={this.onSearch}/>
                <div className='clear'></div>
                <Table 
                rowKey={record=>record.index}
                columns={this.columns}
                size='small'
                bordered/>
            </div>
        )
    }
}
export default PositiveProcess