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
            dataIndex:'periodName',
            key:'periodName'
        },{
            title:'期数',
            dataIndex:'head.lineName',
            key:'head.lineName'
        },{
            title:'开始时间',
            dataIndex:'head.startTime',
            key:'head.startTime'
        },{
            title:'结束时间',
            dataIndex:'head.endTime',
            key:'head.endTime'
        },{
            title:'产线',
            dataIndex:'lineName',
            key:'lineName'
        },{
            title:'小计值',
            dataIndex:'total',
            key:'total'
        },{
            title:'Ni金属量(T)',
            dataIndex:'totalNi',
            key:'totalNi'
        },{
            title:'Co金属量(T)',
            dataIndex:'totalCo',
            key:'totalCo'
        },{
            title:'Mn金属量(T)',
            dataIndex:'totalMn',
            key:'totalMn'
        }];
        this.getTableData=this.getTableData.bind(this);
        this.selectChange=this.selectChange.bind(this);
        this.onSearch=this.onSearch.bind(this);
        this.timeChange=this.timeChange.bind(this);
    }

    getTableData(){
        let {startTime}=this.state
        let periodId=this.state.periodId?this.state.periodId:this.props.periodCode
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
            let res=data.data.data
            if(res&&res.details){
                for(let i=0;i<res.details.length;i++){
                    res.details[i]['id']=(i+1)
                }
                this.setState({
                    data:res.details
                })
            }
        })
    }
    selectChange(value){
        this.setState({
            periodId:value,
        })
        this.props.getStartTime(value) //根据周期获取开始时间
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
                    <Search flag={true} periodCode={this.state.periodId?this.state.periodId:this.props.periodCode}  staticPeriod={this.props.staticPeriod} time={this.state.time?this.state.time:time} selectChange={this.selectChange}  confirm={this.getTableData} onSearch={this.onSearch} timeChange={this.timeChange}/>
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