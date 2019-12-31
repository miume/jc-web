import React,{Component} from 'react'
import {Table,Button,Select,Spin,message} from 'antd'
import Search from './search'
import Blockquote from '../../BlockQuote/blockquote'
import axios from 'axios'
const {Option}=Select;
class PositiveCostAccount extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            periodCode:undefined
        }
        this.columns=[{
            title:'核算对象',
            key:'id',
            dataIndex:'id',
        },{
            title:'周期名称',
            key:'periodName',
            dataIndex:'periodName',
        },{
            title:'期数',
            key:'periods',
            dataIndex:'periods',
        },{
            title:'开始时间',
            key:'startTime',
            dataIndex:'startTime',
        },{
            title:'结束时间',
            key:'endTime',
            dataIndex:'endTime',
        },{
            title:'原料领用(T)',
            key:'materialRequisition',
            dataIndex:'materialRequisition',
        },{
            title:'原料结存(T)',
            key:'materialBalance',
            dataIndex:'materialBalance',
        },{
            title:'上期前段在制品(T)',
            key:'lastMaterialInProcessFirst',
            dataIndex:'lastMaterialInProcessFirst',
        },{
            title:'本期前段在制品(T)',
            key:'currentGoodsInProcessFirst',
            dataIndex:'currentGoodsInProcessFirst',
        },{
            title:'上期后段在制品(T)',
            key:'lastGoodsInProcessSecond',
            dataIndex:'lastGoodsInProcessSecond',
        },{
            title:'本期后段在制品(T)',
            key:'currentGoodsInProcessSecond',
            dataIndex:'currentGoodsInProcessSecond',
        },{
            title:'成品入库(T)',
            key:'productStorage',
            dataIndex:'productStorage',
        },{
            title:'单耗(T)',
            key:'unitConsumption',
            dataIndex:'unitConsumption',
        }]
        this.judgeOpertion=this.judgeOpertion.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.getPeriod=this.getPeriod.bind(this);
        this.getTimeByPeriod=this.getTimeByPeriod.bind(this);
        this.confirm=this.confirm.bind(this);
        this.timeChange=this.timeChange.bind(this);
    }
    componentDidMount(){
        this.getPeriod()
    }
    componentWillUnmount(){
        this.setState=()=>{
            return
        }
    }
    getPeriod(){
        axios({
            url:this.url.positiveStatic.all,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    staticPeriod:res,
                    periodCode:res[0].code
                })
                this.getTimeByPeriod(res[0].code)
            }
        })
        
    }
    getTimeByPeriod(value){
        axios({
            url:this.url.anodeCostAccount.getDate,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                periodId:value
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    lineNameData:res
                })
            }
        })
    }
    selectChange(value,name){
        name=name.props.name
        this.setState({
            [name]:value
        })
        if(name==='periodCode'){
            this.getTimeByPeriod(value)
        }
    }
    timeChange(value){
        value=value.split('/')[0]
        this.setState({
            periods:value
        })
    }
    confirm(){
        this.setState({
            loading:true
        })
        let {lineCode,periodCode,periods}=this.state

        axios({
            url:this.url.anodeCostAccount.confirm,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                lineCode:lineCode,
                periodId:periodCode,
                periods:periods
            }
        }).then(data=>{
            let res=data.data.data;
            if(res){
                if(res[0]===1){
                    message.error('不存在本期的产线统计数据，基础数据不全!');
                }
                if(res[0]===2){
                    message.error('不存在上期的产线统计数据，基础数据不全!');
                }
                if(res&&res.list){
                    this.setState({
                        data:res.list
                    })
                }
            }
            else{
                message.error('操作失败，请联系管理员!');
            }
            this.setState({
                loading:false
            })
        }).catch(()=>{
            this.setState({
                loading:false,
                data: []
            })
            message.error('操作失败，请联系管理员!')
        })
    }
    judgeOpertion(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[]
        return flag.length?true:false
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        this.url=JSON.parse(localStorage.getItem('url'))
        let {lineNameData,data,periods,periodCode,staticPeriod}=this.state
        return(
            <div >
                <Blockquote name={current.menuName} menu={current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Search  staticPeriod={staticPeriod} periodCode={periodCode} selectChange={this.selectChange}
                            lineNameData={lineNameData} periods={periods} timeChange={this.timeChange} flag={true}
                            confirm={this.confirm}
                     />
                    <div className='clear'></div> 
                    <Table
                        dataSource={data}
                        rowKey={record=>record.id}
                        columns={this.columns} 
                        size='small'
                        bordered/>
                </Spin>
            </div>
        );
    }
}
export default PositiveCostAccount