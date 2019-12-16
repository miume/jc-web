import React,{Component} from 'react'
import {Table,Button,Spin,Select} from 'antd'
import Search from '../../costAccounting/costAccount/search'
const {Option}=Select;

class PositiveAuxiliaryMaterial extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.columns=[{
            title:'序号',
            key:'id',
            dataIndex:'id',
            align:'center'
        },{
            title:'周期名称',
            key:'periodName',
            dataIndex:'periodName',
            align:'center'
        },{
            title:'期数',
            key:'periods',
            dataIndex:'periods',
            align:'center'
        },{
            title:'开始时间',
            key:'beginTime',
            dataIndex:'beginTime',
            align:'center'
        },{
            title:'结束时间',
            key:'endTime',
            dataIndex:'endTime',
            align:'center'
        },{
            title:'入库量(领用,T)',
            key:'use',
            dataIndex:'use',
            align:'center'
        },{
            title:'本期在制(T)',
            key:'currentSystem',
            dataIndex:'currentSystem',
            align:'center'
        },{
            title:'上期在制(T)',
            key:'lastSystem',
            dataIndex:'lastSystem',
            align:'center'
        },{
            title:'产品入库量(T)',
            key:'productStorage',
            dataIndex:'productStorage',
            align:'center'
        },{
            title:'中间品变化量(T)',
            key:'intermediateProductChange',
            dataIndex:'intermediateProductChange',
            align:'center'
        }]
        this.judgeOperation=this.judgeOperation.bind(this);
    }
    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length?true:false
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Search staticPeriod={this.props.period} flag={true} periodCode={this.props.periodCode?this.props.periodCode:this.state.periodCode}/>
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
export default PositiveAuxiliaryMaterial