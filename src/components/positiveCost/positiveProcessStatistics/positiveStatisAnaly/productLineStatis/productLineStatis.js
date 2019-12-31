import React,{Component} from 'react'
import {Table,Spin,message} from 'antd'
import Search from '../processStatistic/statisSearch'
import axios from 'axios'

 class PositiveProductLine extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            loading:false
        }
        this.columns=[{
            title:'序号',
            key:'index',
            dataIndex:'index',
            width:'4%'
        },{
            title:'周期类型',
            key:'periodName',
            dataIndex:'periodName',
            width:'7%'
        },{
            title:'开始时间',
            key:'head.beginTime',
            dataIndex:'head.beginTime',
            width:'13%'
        },{
            title:'结束时间',
            key:'head.endTime',
            dataIndex:'head.endTime',
            width:'13%'
        },{
            title:'产线名称',
            key:'lineName',
            dataIndex:'lineName',
            width:'7%'
        },{
            title:'原料重量(kg)',
            key:'materialWeight',
            dataIndex:'materialWeight',
            width:'13%',
            render:(text,record)=>{
                let data=record.rawW,res=[]
                for(let key in data){
                    res.push(
                        <span key={key} style={{display:'block'}}>{`${key} : ${data[key]}`}</span>
                    )
                }
                return(
                    <span>
                        {
                            res.length?res.map(e=>e):'无'
                        }
                    </span>
                )
            }
        },{
            title:'原料结存(kg)',
            key:'materialWeight1',
            dataIndex:'materialWeight1',
            width:'13%',
            render:(text,record)=>{
                let data=record.rawB,res=[]
                for(let key in data){
                    res.push(
                        <span key={key} style={{display:'block'}}>{`${key} : ${data[key]}`}</span>
                    )
                }
                return(
                    <span>
                        {
                            res.length?res.map(e=>e):'无'
                        }
                    </span>
                )
            }
        },{
            title:'前段在制品(kg)',
            key:'details.firstProcess',
            dataIndex:'details.firstProcess',
            width:'10%'
        },{
            title:'后段在制品(kg)',
            key:'details.secondProces',
            dataIndex:'details.secondProces',
            width:'10%'
        },{
            title:'产品重量(kg)',
            key:'details.product',
            dataIndex:'details.product',
            width:'8.5%'
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
        this.setState({
            loading:true
        })
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
                if(res&&res.list){
                    for(let i=0;i<res.list.length;i++){
                        res.list[i]['index']=i+1
                    }
                    this.setState({
                        res:res,
                        data:res.list
                    })
                }
                
            }
            else{
                message.error(data.data.message)
            }
            this.setState({
                loading:false
            })
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
        let {staticPeriod}=this.props,{periodCode,loading,timeData,startTime,res,data}=this.state
        return(
            <Spin spinning={loading}>
                <Search onChange={this.onChange} timeData={timeData} selectChange={this.selectChange}
                        staticPeriod={staticPeriod} periodCode={periodCode} getTableData={this.getTableData}
                        startTime={startTime}
                />
                <div className='clear'></div>
                <Table 
                dataSource={data}
                rowKey={record=>record.head.code}
                columns={this.columns}
                footer={()=>{
                    return(
                        <div className={data.length===0?'hide':''}>
                            合计 : &nbsp;&nbsp;&nbsp;
                            <span >
                            前驱体原料重量 : {res&&res['前驱体']['feedstock']?res['前驱体']['feedstock']:''} &nbsp;&nbsp;&nbsp; 碳酸锂原料重量 : {res&&res['碳酸锂']['feedstock']?res['碳酸锂']['feedstock']:''} &nbsp;&nbsp;&nbsp;预混料原料重量 : {res&&res['预混料']['feedstock']?res['预混料']['feedstock']:''} &nbsp;&nbsp;&nbsp;
                            烧结料原料重量 : {res&&res['烧结料']['feedstock']?res['烧结料']['feedstock']:''} &nbsp;&nbsp;&nbsp; 前驱体原料结存 : {res&&res['前驱体']['balance']?res['前驱体']['balance']:''} &nbsp;&nbsp;&nbsp;碳酸锂原料结存 : {res&&res['碳酸锂']['balance']?res['碳酸锂']['balance']:''} &nbsp;&nbsp;&nbsp;
                            前段在制品重量 : {res&&res['前段在制品重量']?res['前段在制品重量']:''} &nbsp;&nbsp;&nbsp; 后段在制品重量 : {res&&res['后段在制品重量']?res['后段在制品重量']:''} &nbsp;&nbsp;&nbsp;产品重量 : {res&&res['产品重量']?res['产品重量']:''} &nbsp;&nbsp;&nbsp;
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