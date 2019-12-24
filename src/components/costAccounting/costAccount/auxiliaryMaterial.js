import React,{Component} from 'react'
import {Table,Button,Spin,message} from 'antd'
import Search from './search'
import axios from 'axios'
class AuxiliaryMaterial extends Component{
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
            key:'elementName',
            dataIndex:'elementName',
        },{
            title:'名称',
            key:'materialType',
            dataIndex:'materialType'
        },{
            title:'周期类型',
            key:'period',
            dataIndex:'period',
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
            title:'入库量(领用,T)',
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
            title:'产品入库量(T)',
            key:'productStorage',
            dataIndex:'productStorage',
        },{
            title:'中间品变化量(T)',
            key:'intermediateProductsVariation',
            dataIndex:'intermediateProductsVariation',
        },{
            title:'单耗(T)',
            key:'unitConsumption',
            dataIndex:'unitConsumption',
        }]
        this.judgeOperation=this.judgeOperation.bind(this);
        this.timeChange=this.timeChange.bind(this)
        this.selectChange=this.selectChange.bind(this);
        this.confirm=this.confirm.bind(this);
        this.lineChange=this.lineChange.bind(this);
    }
    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
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
            lineCode:value,
        })
    }
    confirm(){
        this.setState({
            loading:true
        })
        let {lineCode,periodCode,time,flag}=this.state
        axios({
            url:this.props.url.costAccount.auxMatConfirm,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                lineCode:lineCode,
                periodCode:this.props.periodCode&&flag?this.props.periodCode:periodCode,
                startTime:time
            }
        }).then((data)=>{
            message.info(data.data.message);
            let res = data.data.data;
            if(res){
                this.setState({
                    data:res
                })
            }
            this.setState({
                loading:false
            })
        }).catch(()=>{
            this.setState({
                loading:false,
                data: []
            });
            message.error('操作失败，请联系管理员!')
        })
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
       // flag={this.judgeOperation(this.operation,'QUERY')}
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                   <Search flag={true} timeChange={this.timeChange} confirm={this.confirm} lineChange={this.lineChange}
                   selectChange={this.selectChange} staticPeriod={this.props.staticPeriod} line={this.props.line}
                   periodCode={this.props.periodCode&&this.state.flag?this.props.periodCode:this.state.periodCode}
                   date={this.props.date} />
                   <div className='clear'></div>
                    <Table
                        dataSource={this.state.data}
                    rowKey={record=>record.materialType}
                    columns={this.columns}
                    size='small'
                    pagination={false}
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default AuxiliaryMaterial
