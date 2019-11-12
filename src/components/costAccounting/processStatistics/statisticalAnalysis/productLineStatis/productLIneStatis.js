import React,{Component} from 'react'
import {Spin,Table} from 'antd'
import axios from 'axios'
import Search from '../processStatis/processSearch'
class ProductLineStatis extends Component{//产品线统计
    constructor(props){
        super(props);
        this.state={
            loading:false,
            date:'',
            data:[],
            time:this.props.startTime,
            periodCode:this.props.periodCode?this.props.periodCode:1,
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
        this.dateChange=this.dateChange.bind(this);
    }
    
    getTableData(){
        let {date,time,periodCode}=this.state
        let startTime=`${date} ${time}`
        axios({
            url:`${this.props.url.precursorGoodIn.getAnalysisLine}`,
            method:'get',
            headers:{
                'Authorizaition':this.props.url.Authorization
            },
            params:{
                periodId:periodCode,
                startTime:startTime
            }
        }).then((data)=>{
            let res=data.data
            console.log(res)
        })
    }
    selectChange(value,name){
        let time=name.props.name
        this.setState({
            periodCode:value,
            time:time
        })
    }
    dateChange(date,dateString){
        this.setState({
            date:dateString
        })
    }

    render(){
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightContent-Div'>
                    <Search flag={true} periodCode={this.state.periodCode} staticPeriod={this.props.staticPeriod} selectChange={this.selectChange} dateChange={this.dateChange} search={this.getTableData}/>
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