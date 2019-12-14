import React,{Component} from 'react'
import {Table,Button,Spin,message} from 'antd'
import Search from './search'
import axios from 'axios'
class MainMaterial extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            time:undefined,
            periodCode:undefined,
            flag:true,
            lineCode:undefined
        }
        this.columns=[{
            title:'核算对象',
            key:'elementType',
            dataIndex:'elementType',
            render:(text,record)=>{
                if(record.ElementCode===0){
                    return 'Ni'
                }
                if(record.ElementCode===1){
                    return 'Co'
                }
                if(record.ElementCode===2){
                    return 'Mn'
                }
                if(record.ElementCode===3){
                    return '氨'
                }
                if(record.ElementCode===4){
                    return '碱'
                }
            }
        },{
            title:'名称',
            key:'name',
            dataIndex:'name',
        },{
            title:'周期类型',
            key:'period',
            dataIndex:'period',
        },{
            title:'期数',
            key:'periods',
            dataIndex:'periods',
            align:'center'
        },{
            title:'开始时间',
            key:'startTime',
            dataIndex:'startTime',
        },{
            title:'结束时间',
            key:'endTime',
            dataIndex:'endTime',
        },{
            title:'领用(T)',
            key:'materialRequisitions',
            dataIndex:'materialRequisitions',
        },{
            title:'本期在制(T)',
            key:'currentGoodsInProcess',
            dataIndex:'currentGoodsInProcess',
        },{
            title:'上期在制(T)',
            key:'lastGoodsInProcess',
            dataIndex:'lastGoodsInProcess',
        },{
            title:'入库(T)',
            key:'productStorage',
            dataIndex:'productStorage',
        },{
            title:'单耗(T)',
            key:'unitConsumption',
            dataIndex:'unitConsumption',
        }]
        this.judgeOpertion=this.judgeOpertion.bind(this);
        this.timeChange=this.timeChange.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.confirm=this.confirm.bind(this);
        this.lineChange=this.lineChange.bind(this);
    }
    judgeOpertion(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[]
        return flag.length?true:false
    }
  
    timeChange(value){
        this.setState({
            time:value
        })
    }
    selectChange(value){
        this.setState({
            periodCode:value,
            flag:false
        })
        this.props.getDate(value)
    }
    lineChange(value){
        this.setState({
            lineCode:value
        })
    }
    confirm(){
        this.setState({
            loading:true
        })
        let {lineCode,periodCode,time,flag}=this.state
        
        axios({
            url:this.props.url.costAccount.mainMatConfirm,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                lineCode:lineCode,
                periodCode:this.props.periodCode&&flag?this.props.periodCode:periodCode,
                startTime:time
            }
        }).then(data=>{
            this.setState({
                loading:false
            })
        }).catch(()=>{
            message.error('操作失败，请联系管理员!')
        })
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return(
            <div >
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'> 
                    <Search flag={true} timeChange={this.timeChange} confirm={this.confirm} date={this.props.date}
                    selectChange={this.selectChange} staticPeriod={this.props.staticPeriod}  lineChange={this.lineChange}
                    periodCode={this.props.periodCode&&this.state.flag?this.props.periodCode:this.state.periodCode}
                    line={this.props.line}
                    />
                    <div className='clear'></div> 
                    <Table
                        rowKey={record=>record.id}
                        columns={this.columns} 
                        size='small'
                        bordered/>
                 </Spin>
            </div>
        );
    }
}
export default MainMaterial