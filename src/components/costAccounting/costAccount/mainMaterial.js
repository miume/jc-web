import React,{Component} from 'react'
import {Table,Button,Select,Spin} from 'antd'
import SearchCell from '../../BlockQuote/search'

const {Option}=Select;
class MainMaterial extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
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
            title:'领用(T)',
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
            title:'入库(T)',
            key:'storage',
            dataIndex:'storage',
            align:'center'
        },{
            title:'单耗(T)',
            key:'unitConsumption',
            dataIndex:'unitConsumption',
            align:'center'
        }]
        this.judgeOpertion=this.judgeOpertion.bind(this);
    }
    judgeOpertion(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[]
        return flag.length?true:false
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        //console.log(JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations)
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return(
            <div >
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    
                    <SearchCell flag={this.judgeOpertion(this.operation,'QUERY')} timeFlag={true}/>
                    
                    <Select  defaultValue='周' style={{width:120,float:'right',paddingRight:'10px'}}>
                        <Option key='week' value='周'>周</Option>
                        <Option key='month' value='月'>月</Option>
                        <Option key='year' value='年'>年</Option>
                    </Select>
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