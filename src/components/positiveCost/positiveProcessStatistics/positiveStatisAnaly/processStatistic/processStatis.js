import React,{Component} from 'react'
import {Table} from 'antd'
import Search from './statisSearch'
import axios from 'axios'
class PositiveProcess extends Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.columns=[{
            title:'序号',
            key:'index',
            dataIndex:'index',
            width:"5%"
        },{
            title:'周期类型',
            key:'period',
            dataIndex:'period',
            width:"10%"
        },{
            title:'开始时间',
            key:'beginTime',
            dataIndex:'beginTime',
            width:"13%"
        },{
            title:'结束时间',
            key:'endTime',
            dataIndex:'',
            width:"13%"
        },{
            title:'工序名称',
            key:'processName',
            dataIndex:'processName',
            width:"10%"
        },{
            title:'产线名称',
            key:'lineName',
            dataIndex:'lineName',
            width:"10%"
        },{
            title:'投入(kg)',
            key:'materialWeight',
            dataIndex:'materialWeight',
            width:"10%",
            render:(text,record)=>{
                return(
                    <span>
                        前驱体(kg)：200
                        碳酸锂(kg)：200
                        预混料(kg)：200
                        烧结料(kg)：20
                    </span>
                )
            }
        },{
            title:'消耗(kg)',
            key:'processWeight',
            dataIndex:'processWeight',
            width:"10%",
            render:(text,record)=>{
                return(
                    <span>
                        前驱体(kg)：200
                        碳酸锂(kg)：200
                    </span>
                )
            }
        },{
            title:'结存(kg)',
            key:'productWeight',
            dataIndex:'productWeight',
            width:"10%",
            render:(text,record)=>{
                return(
                    <span>
                        前驱体(kg)：200
                        碳酸锂(kg)：200
                    </span>
                )
            }
        }]
        this.onChange=this.onChange.bind(this)
        this.onSearch=this.onSearch.bind(this)
        this.getTableData=this.getTableData.bind(this);
        this.selectChange=this.selectChange.bind(this);
    }
    /**按工序统计*/
    getTableData(){
        let {startTime}=this.state
        let periodId=this.state.periodId?this.state.periodId:this.props.periodCode
         axios({
             url:`${this.props.url. positiveProcessStatis.processLine}`,
             method:'get',
             headers:{
                 'Authorization':this.props.url.Authorization
             },
             params:{
                 // ...params,
                 periodId:periodId,
                 periods:startTime,
                //  lineId:
             }
         }).then((data)=>{
             let res=data.data.data
             if(res&&res.details){
                 for(let i=0;i<res.details.length;i++){
                     res.details[i]['id']=(i+1)
                 }
                 this.setState({
                     data:res.details
                 })
             }
         })
     }
     selectChange(value){
        this.setState({
            periodId:value,
        })
    }
    onChange(value) {
        console.log(`selected ${value}`);
      }
      
    onSearch(val) {
        console.log('search:', val);
      }
    render(){
        return(
            <div>
                <Search lineFlag={true} staticPeriod={this.props.staticPeriod} selectChange={this.selectChange}
                        onChange={this.onChange} onSearch={this.onSearch}
                />
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