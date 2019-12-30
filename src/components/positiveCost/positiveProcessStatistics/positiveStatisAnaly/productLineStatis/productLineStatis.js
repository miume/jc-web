import React,{Component} from 'react'
import {Table,Spin,message} from 'antd'
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
            data:data,
            loading:false
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
            key:'materialWeight1',
            dataIndex:'materialWeight1',
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
            key:'processFWeight',
            dataIndex:'processFWeight',
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
        this.selectChange=this.selectChange.bind(this);
        this.onChange=this.onChange.bind(this)
        this.getTableData=this.getTableData.bind(this);
        this.getStartTime=this.getStartTime.bind(this);
    }
    componentDidMount(){
        let {periodCode,lineCode}=this.props
        this.setState({
            periodCode:periodCode,
            lineCode:lineCode
        })
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
                    timeData:res,
                    startTime:res[0]&&res[0].beginTime?res[0].beginTime:undefined,
                    periods:res[0]&&res[0].periods?res[0].periods:undefined
                })
            }
        })
    }
    getTableData(){
        let {periodCode,periods}=this.state

        axios({
            url:`${this.props.url.positiveProcessStatis.statisticLine}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                periodId:periodCode,
                periods:periods
            }
        }).then((data)=>{
            let res=data.data.data
            if(data.data.code===0){
                message.info('操作成功!')
                // if(res&&res.details){
            //     for(let i=0;i<res.details.length;i++){
            //         res.details[i]['id']=(i+1)
            //     }
            //     this.setState({
            //         data:res.details
            //     })
            // }
            }
            else{
                message.error(data.data.message)
            }
        })
    }
       /**周期类型变化*/
    selectChange(value){
        this.setState({
            periodCode:value
        })
    }
    onChange(value,name) {
        let {periodCode}=this.state
        name=name.props.name
        console.log(name)
        this.setState({
            periods:name,
            startTime:value
        })
        this.getStartTime(periodCode)
      }

   
      /**监控父组件periodCode的变化*/
    componentWillReceiveProps(nextProps){
        let {periodCode}=this.props
        if(nextProps.periodCode!==periodCode){
            this.setState({
                periodCode:nextProps.periodCode
            })
        }
        this.setState({
            periodCode:nextProps.periodCode
        })
        this.getStartTime(nextProps.periodCode)
    }
    render(){
        let {staticPeriod}=this.props,{periodCode,loading,timeData,startTime}=this.state
        return(
            <Spin spinning={loading}>
                <Search onChange={this.onChange} timeData={timeData} selectChange={this.selectChange}
                        staticPeriod={staticPeriod} periodCode={periodCode} getTableData={this.getTableData}
                        startTime={startTime}
                />
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
            </Spin>
        )
    }
 }
 export default PositiveProductLine 