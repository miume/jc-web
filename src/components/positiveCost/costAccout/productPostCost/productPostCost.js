import React,{Component} from 'react'
import {Spin,Table,Popconfirm,Divider,message} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import Search from '../positiveCostAccount/search'
import axios from 'axios'
import {judgeOperation,getOperations} from '../../../commom/getOperations'
class ProductPostCost extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            dataSource:[]
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
        this.returnFireCost=this.returnFireCost.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.getPeriod=this.getPeriod.bind(this);
        this.getTimeByPeriod=this.getTimeByPeriod.bind(this);
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
    //返回火法成本
    returnFireCost(){
        this.props.history.push({pathname:'/positiveProductAccount'});
    }
    render(){
        this.current=JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        let {lineNameData,data,periods,periodCode,staticPeriod}=this.state
        return(
            <div>
                <Blockquote menu={this.current.menuParent} name={this.current.menuName} menu2='返回' returnDataEntry={this.returnFireCost} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Search  staticPeriod={staticPeriod} periodCode={periodCode} selectChange={this.selectChange}
                            lineNameData={lineNameData} periods={periods} timeChange={this.timeChange} flag={true}
                            confirm={this.confirm}
                     />
                     <div className='clear'></div> 
                    <Table
                    rowKey={record=>record.code}
                    dataSource={this.state.dataSource}
                    size='small'
                    columns={this.columns}
                    pagination={false}
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default ProductPostCost;