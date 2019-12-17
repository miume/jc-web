import React,{Component} from 'react'
import {Table,Button,Select,Spin} from 'antd'
import Search from '../../costAccounting/costAccount/search'

const {Option}=Select;
class PositiveMainMaterial extends Component{
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
    }
    selectChange(value){
        this.setState({
            periodCode:value
        })
    }
    judgeOpertion(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[]
        return flag.length?true:false
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return(
            <div >
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Search  staticPeriod={this.props.period} flag={true} periodCode={this.props.periodCode?this.props.periodCode:this.state.periodCode}/>
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
export default PositiveMainMaterial