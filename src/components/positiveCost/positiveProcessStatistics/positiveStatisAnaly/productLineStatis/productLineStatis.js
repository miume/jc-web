import React,{Component} from 'react'
import {Table} from 'antd'
import Search from '../processStatistic/statisSearch'

const data=[{
    index:'1',
    period:'周',
    startTime:'2019-01-01  00:00',
    endTime:'2019-01-07  24:00',
    productLineName:'H#生产线',
    materialWeight:'1000',
    processWeight:'1000',
    productWeight:'1000'
    
 }
]
 class PositiveProductLine extends Component{
    constructor(props){
        super(props)
        this.state={
            data:data
        }
        this.columns=[{
            title:'序号',
            key:'index',
            dataIndex:'index'
        },{
            title:'周期类型',
            key:'period',
            dataIndex:'period'
        },{
            title:'开始时间',
            key:'startTime',
            dataIndex:'startTime'
        },{
            title:'结束时间',
            key:'endTime',
            dataIndex:'endTime'
        },{
            title:'产线名称',
            key:'productLineName',
            dataIndex:'productLineName'
        },{
            title:'原料重量(kg)',
            key:'materialWeight',
            dataIndex:'materialWeight'
        },{
            title:'在制品重量(kg)',
            key:'processWeight',
            dataIndex:'processWeight'
        },{
            title:'产品重量(kg)',
            key:'productWeight',
            dataIndex:'productWeight'
        },]
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
                <Search lineFlag={true} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} onSearch={this.onSearch}/>
                <div className='clear'></div>
                <Table 
                dataSource={this.state.data}
                rowKey={record=>record.index}
                columns={this.columns}
                footer={()=>{
                    return(
                        <div>
                            合计 : 
                            <span style={{float:'right'}}>
                                原料重量 : 6000kg &nbsp;&nbsp;&nbsp; 在制品重量 : 6000kg &nbsp;&nbsp;&nbsp;产品重量 : 6000kg &nbsp;&nbsp;&nbsp;
                            </span>
                        </div>
                    )}}
                size='small'
                bordered/>
            </div>
        )
    }
 }
 export default PositiveProductLine 