import React,{Component} from 'react'
import {Spin,Table} from 'antd'
import axios from 'axios'
import Search from '../processStatis/processSearch'
class ProductLineStatis extends Component{//产品线统计
    constructor(props){
        super(props);
        this.state={
            loading:false,
            data:[],
            startTime:'',
            periodId:'',
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'周期类型',
            dataIndex:'periodType',
            key:'periodType'
        },{
            title:'期数',
            dataIndex:'period',
            key:'period'
        },{
            title:'开始时间',
            dataIndex:'beginTime',
            key:'beginTime'
        },{
            title:'结束时间',
            dataIndex:'endTime',
            key:'endTime'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine'
        },{
            title:'Ni金属量(T)',
            dataIndex:'Nimetal',
            key:'Nimetal'
        },{
            title:'Co金属量(T)',
            dataIndex:'Cometal',
            key:'Cometal'
        },{
            title:'Mn金属量(T)',
            dataIndex:'Mnmetal',
            key:'Mnmetal'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation'
        }];
        this.getTableData=this.getTableData.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.onSearch=this.onSearch.bind(this);
        this.timeChange=this.timeChange.bind(this);
    }
    
    getTableData(){
        let {startTime,periodId}=this.state
        axios({
            url:`${this.props.url.precursorGoodIn.getAnalysisLine}`,
            method:'get',
            headers:{
                'Authorizaition':this.props.url.Authorization
            },
            params:{
                periodId:periodId,
                startTime:startTime
            }
        }).then((data)=>{
            let res=data.data
            console.log(res)
        })
    }
    selectChange(value){
        this.setState({
            periodId:value,
        })
        this.props.getStartTime(value)
    }

    onSearch(value){

    }
    timeChange(value){
        console.log(value)
        this.setState({
            startTime:value
        })
    }
    render(){
        let time=this.props.time?this.props.time:null
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Search flag={true} periodCode={this.props.periodCode?this.props.periodCode:''}  staticPeriod={this.props.staticPeriod} time={this.state.time?this.state.time:time} selectChange={this.selectChange}  confirm={this.getTableData} onSearch={this.onSearch} timeChange={this.timeChange}/>
                    <div className='clear'></div>
                    <Table
                    dataSource={this.state.data}
                    rowKey={record=>record.id}
                    columns={this.columns}
                    size='small'
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default ProductLineStatis;