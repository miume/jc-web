import React,{Component} from 'react'
import {Table,Spin} from 'antd'
import Search from './statisSearch'
import axios from 'axios'
class PositiveProcess extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
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
        this.getTableData=this.getTableData.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.getStartTime=this.getStartTime.bind(this);
    }
    componentDidMount(){
        let {periodCode,lineCode}=this.props
        this.setState({
            periodCode:periodCode,
            lineCode:lineCode
        })
        this.getStartTime(periodCode)
    }
      /**根据统计周期code查询所有开始时间*/
      getStartTime(periodCode) {
        axios({
            url: `${this.props.url.positiveProcessStatis.getDateByPeriodId}?periodId=${periodCode}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res){
                this.setState({
                    timeData:res
                })
            }
        })
    }
    /**按工序统计*/
    getTableData(){
        let {periodId,periods,lineId}=this.state
         axios({
             url:`${this.props.url. positiveProcessStatis.processLine}`,
             method:'get',
             headers:{
                 'Authorization':this.props.url.Authorization
             },
             params:{
                 periodId:periodId,
                 periods:periods,
                 lineId:lineId
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
     /**周期类型,产线变化*/
     selectChange(value,name){
         name=name.props.name
         console.log(name)
        this.setState({
            [name]:value
        })
    }
    onChange(value,name) {
        let {periodCode}=this.state
        name=name.props.name
        console.log(name)
        this.setState({
            periods:name
        })
        this.getStartTime(periodCode)
      }

  
    render(){
        let {line,staticPeriod}=this.props,{periodCode,lineCode,loading,timeData}=this.state
        return(
            <Spin spinning={loading}>
                <Search lineFlag={true} staticPeriod={staticPeriod} selectChange={this.selectChange} 
                        line={line} onChange={this.onChange} 
                        periodCode={periodCode} lineCode={lineCode} timeData={timeData}
                />
                <div className='clear'></div>
                <Table 
                rowKey={record=>record.index}
                columns={this.columns}
                size='small'
                bordered/>
            </Spin>
        )
    }
}
export default PositiveProcess