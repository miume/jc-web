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
            key:'periodName',
            dataIndex:'periodName',
            width:"7%"
        },{
            title:'开始时间',
            key:'head.beginTime',
            dataIndex:'head.beginTime',
            width:"12%"
        },{
            title:'结束时间',
            key:'head.endTime',
            dataIndex:'head.endTime',
            width:"12%"
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
            key:'values.feedstockTotals',
            dataIndex:'values.feedstockTotals',
            width:"12%",
            render:(text,record)=>{
                if(record.values.processCode===1){//只有在线原料才显示
                    var data=record.in, res = [];
                    for(let key in data){
                     res.push(<span key={key} style={{display:'block'}}>
                         {`${key} : ${data[key]}`}
                     </span>)
                    }
                    return(
                        <span>
                            {res.length ? res.map(e => e) : '无'}
                        </span>
                    )
                }
                else{
                    return(
                        <span>
                            {record.values.feedstockTotals}
                        </span>
                    )
                }
            }
        },{
            title:'消耗(kg)',
            key:'values.consumeTotals',
            dataIndex:'values.consumeTotals',
            width:"12%",
            render:(text,record)=>{
                if(record.values.processCode===1){//只有在线原料才显示
                    let data=record.con,res=[]
                    for(let key in data){
                        res.push(
                            <span key={key} style={{display:'block'}}>
                                {`${key} : ${data[key]}`}
                            </span>
                        )
                    }
                    return(
                        <span>
                            {res.length?res.map(e=>e):'无'}
                        </span>
                    )
                }
                else{
                    return(
                        <span>
                            {record.values.consumeTotals}
                        </span>
                    )
                }
            }
        },{
            title:'结存(kg)',
            key:'values.balanceTotals',
            dataIndex:'values.balanceTotals',
            width:"12%",
            render:(text,record)=>{
                if(record.values.processCode===1){//只有在线原料才显示
                    let data=record.bal,res=[]
                    for(let key in data){
                        res.push(
                            <span key={key} style={{display:'block'}}>
                                {`${key} : ${data[key]}`}
                            </span>
                        )
                    }
                    return(
                        <span>
                            {res.length?res.map(e=>e):'无'}
                        </span>
                    )
                }
                else{
                    return(
                        <span>
                            {record.values.balanceTotals}
                        </span>
                    )
                }
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
                    lineNameData:res
                })
            }
        })
    }
    /**按工序统计*/
    getTableData(){
        this.setState({
            loading:true
        })
        let {periodCode,periods,lineCode}=this.state
         axios({
             url:`${this.props.url. positiveProcessStatis.statisticProcess}`,
             method:'get',
             headers:{
                 'Authorization':this.props.url.Authorization
             },
             params:{
                 periodId:periodCode,
                 periods:periods,
                 lineId:lineCode
             }
         }).then((data)=>{
             let res=data.data.data
             if(res){
                 for(let i=0;i<res.length;i++){
                     res[i]['index']=(i+1)
                 }
                 this.setState({
                     data:res
                 })
             }
             this.setState({
                loading:false
            })
         })
     }
     /**周期类型,产线变化*/
     selectChange(value,name){
         name=name.props.name
        this.setState({
            [name]:value
        })
        if(name==='periodCode'){
            this.getStartTime(value)
        }
    }
    onChange(value) {
        value=value.split('/')[0]
        this.setState({
            periods:value
        })   
      }

  
    render(){
        let {line,staticPeriod}=this.props,{periodCode,lineCode,loading,lineNameData,data,periods}=this.state
        return(
            <Spin spinning={loading}>
                <Search lineFlag={true} staticPeriod={staticPeriod} selectChange={this.selectChange} 
                        line={line} onChange={this.onChange}  periods={periods}
                        periodCode={periodCode} lineCode={lineCode} lineNameData={lineNameData} getTableData={this.getTableData}
                />
                <div className='clear'></div>
                <Table 
                dataSource={data}
                rowKey={record=>record.index}
                columns={this.columns}
                pagination={false}
                size='small'
                bordered/>
            </Spin>
        )
    }
}
export default PositiveProcess