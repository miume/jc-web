import React,{Component} from 'react'
import {Table} from 'antd'
import Search from '../processStatistic/statisSearch'
import axios from 'axios'
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
            dataIndex:'index',
            width:'5%'
        },{
            title:'周期类型',
            key:'period',
            dataIndex:'period',
            width:'7%'
        },{
            title:'开始时间',
            key:'startTime',
            dataIndex:'startTime',
            width:'13%'
        },{
            title:'结束时间',
            key:'endTime',
            dataIndex:'endTime',
            width:'13%'
        },{
            title:'产线名称',
            key:'productLineName',
            dataIndex:'productLineName',
            width:'10%'
        },{
            title:'原料重量(kg)',
            key:'materialWeight',
            dataIndex:'materialWeight',
            width:'10%',
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
            title:'原料结存(kg)',
            key:'materialWeight',
            dataIndex:'materialWeight',
            width:'10%',
            render:(text,record)=>{
                return(
                    <span>
                        前驱体(kg)：200
                        碳酸锂(kg)：200
                    </span>
                )
            }
        },{
            title:'前段在制品(kg)',
            key:'processWeight',
            dataIndex:'processWeight',
            width:'10%'
        },{
            title:'后段在制品(kg)',
            key:'processWeight',
            dataIndex:'processWeight',
            width:'10%'
        },{
            title:'产品重量(kg)',
            key:'productWeight',
            dataIndex:'productWeight',
            width:'10%'
        },]
        this.onChange=this.onChange.bind(this)
        this.onSearch=this.onSearch.bind(this)
        this.getTableData=this.getTableData.bind(this);
    }
    getTableData(){
        let {startTime}=this.state
        let periodId=this.state.periodId?this.state.periodId:this.props.periodCode
        axios({
            url:`${this.props.url.precursorGoodIn.getAnalysisLine}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                periodId:periodId,
                startTime:startTime
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
    onChange(value) {
        console.log(`selected ${value}`);
      }
    onSearch(val) {
        console.log('search:', val);
      }
    render(){
        return(
            <div>
                <Search onChange={this.onChange} onSearch={this.onSearch} staticPeriod={this.props.staticPeriod}/>
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