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
            key:'costObject',
            dataIndex:'costObject',
            width:'6%'
        },{
            title:'周期名称',
            key:'periodName',
            dataIndex:'periodName',
            width:'6%'
        },{
            title:'期数',
            key:'periods',
            dataIndex:'periods',
            width:'4%'
        },{
            title:'开始时间',
            key:'startTime',
            dataIndex:'startTime',
            width:'6%'
        },{
            title:'结束时间',
            key:'endTime',
            dataIndex:'endTime',
            width:'6%'
        },{
            title:'原料领用(T)',
            key:'rawMaterialFeedStock',
            dataIndex:'rawMaterialFeedStock',
            width:'11%',
            render:(text)=>{
                let da=text?text.split(' '):undefined
                return(
                    da?da.map((item,index)=>{
                        return(
                            <span style={{display:'block'}} key={index}>{item}</span>
                        )
                    }):null
                )
            }
        },{
            title:'原料结存(T)',
            key:'rawMaterialBalance',
            dataIndex:'rawMaterialBalance',
            width:'11%',
            render:(text)=>{
                let da=text?text.split(' '):undefined
                return(
                    da?da.map((item,index)=>{
                        return(
                            <span style={{display:'block'}} key={index}>{item}</span>
                        )
                    }):null
                )
            }
        },{
            title:'上期前段在制品(T)',
            key:'lastGoodsInProcessFirst',
            dataIndex:'lastGoodsInProcessFirst',
            width:'6%'
        },{
            title:'本期前段在制品(T)',
            key:'currentGoodsInProcessFirst',
            dataIndex:'currentGoodsInProcessFirst',
            width:'6%'
        },{
            title:'上期后段在制品(T)',
            key:'lastGoodsInProcessSecond',
            dataIndex:'lastGoodsInProcessSecond',
            width:'6%'
        },{
            title:'本期后段在制品(T)',
            key:'currentGoodsInProcessSecond',
            dataIndex:'currentGoodsInProcessSecond',
            width:'6%'
        },{
            title:'成品入库(T)',
            key:'productStorage',
            dataIndex:'productStorage',
            width:'5%'
        },{
            title:'单耗(T)',
            key:'unitConsumption',
            dataIndex:'unitConsumption',
            width:'11.5%',
            render:(text)=>{
                let da=text?text.split(' '):undefined
                return(
                    da?da.map((item,index)=>{
                        return(
                            <span style={{display:'block'}} key={index}>{item}</span>
                        )
                    }):null
                )
            }
        }]
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
               else if(res[0]===2){
                    message.error('不存在上期的产线统计数据，基础数据不全!');
                }
                else{
                    for(let i=0;i<res.length;i++){
                        res[i]['index']=i+1
                    }
                    this.setState({
                        data:res
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

    render(){
        const current=JSON.parse(localStorage.getItem('current'))
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
                        rowKey={record=>record.index}
                        columns={this.columns} 
                        pagination={false}
                        size='small'
                        bordered/>
                </Spin>
            </div>
        );
    }
}
export default PositiveCostAccount